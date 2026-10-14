import { useSyncExternalStore } from 'react'
import type { Store } from './store.ts'

/** The store's current value, re-rendering when it changes. */
export function useStore<T>(store: Store<T>): T {
  return useSyncExternalStore(store.subscribe, store.read, store.read)
}
