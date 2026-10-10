import assert from 'node:assert/strict'
import test from 'node:test'
import { localStore } from './localStore.ts'

function fakeStorage(initial: Record<string, string> = {}) {
  const data = new Map(Object.entries(initial))
  return { getItem: (key: string) => data.get(key) ?? null, setItem: (key: string, value: string) => void data.set(key, value) }
}

test('starts as the seed and keeps one reference between writes', () => {
  const seed = [1, 2]
  const store = localStore('k', seed, fakeStorage())
  assert.equal(store.read(), seed)
  store.write([3])
  assert.deepEqual(store.read(), [3])
  assert.equal(store.read(), store.read())
})

test('reads what an earlier visit stored', () => {
  assert.deepEqual(localStore('k', [] as number[], fakeStorage({ k: '[7]' })).read(), [7])
})

test('falls back to the seed when the stored text is damaged or the wrong shape', () => {
  assert.deepEqual(localStore('k', [1], fakeStorage({ k: '{oops' })).read(), [1])
  assert.deepEqual(localStore('k', [1], fakeStorage({ k: '{"a":1}' })).read(), [1])
  assert.deepEqual(localStore('k', [1], fakeStorage({ k: '5' })).read(), [1])
})

test('keeps a write for the visit when storage refuses it, and tells subscribers', () => {
  const store = localStore('k', 'seed', {
    getItem: () => null,
    setItem: () => {
      throw new Error('full')
    },
  })
  let calls = 0
  const stop = store.subscribe(() => calls++)
  store.write('next')
  assert.equal(store.read(), 'next')
  stop()
  store.write('later')
  assert.equal(calls, 1)
})
