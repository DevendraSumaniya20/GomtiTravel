export type Store<T> = {
  read: () => T
  write: (value: T) => void
  subscribe: (listener: () => void) => () => void
}

type KeyValue = Pick<Storage, 'getItem' | 'setItem'>

function parse<T>(raw: string | null, seed: T): T {
  if (raw === null) return seed
  try {
    const value: unknown = JSON.parse(raw)
    // A list must stay a list and a record a record; anything else is treated as damaged.
    const sameShape = typeof value === 'object' && value !== null && Array.isArray(value) === Array.isArray(seed)
    return sameShape ? (value as T) : seed
  } catch {
    return seed
  }
}

/**
 * A value kept in the browser under `key`, starting as `seed`. Other tabs see writes.
 * shortcut: one browser only, no server; point each feature gateway at the API when the backend exists.
 */
export function localStore<T>(key: string, seed: T, storage?: KeyValue): Store<T> {
  const listeners = new Set<() => void>()
  let cache: { raw: string | null; value: T } | null = null

  const stored = () => {
    try {
      return (storage ?? localStorage).getItem(key)
    } catch {
      return null
    }
  }

  const read = () => {
    const raw = stored()
    // The same reference comes back until the stored text changes, as useSyncExternalStore requires.
    if (cache?.raw !== raw) cache = { raw, value: parse(raw, seed) }
    return cache.value
  }

  const write = (value: T) => {
    try {
      ;(storage ?? localStorage).setItem(key, JSON.stringify(value))
    } catch {
      // Storage is full or blocked: the value still lasts for this visit.
    }
    cache = { raw: stored(), value }
    listeners.forEach((listener) => listener())
  }

  const subscribe = (listener: () => void) => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === key || event.key === null) listener()
    }
    listeners.add(listener)
    globalThis.addEventListener?.('storage', onStorage)
    return () => {
      listeners.delete(listener)
      globalThis.removeEventListener?.('storage', onStorage)
    }
  }

  return { read, write, subscribe }
}
