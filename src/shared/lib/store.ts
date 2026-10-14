export type Store<T> = {
  read: () => T
  write: (value: T) => void
  subscribe: (listener: () => void) => () => void
}

/** A value held for this visit, starting as `seed`; subscribers hear every write. */
export function store<T>(seed: T): Store<T> {
  const listeners = new Set<() => void>()
  let value = seed
  return {
    read: () => value,
    write: (next) => {
      value = next
      listeners.forEach((listener) => listener())
    },
    subscribe: (listener) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
  }
}
