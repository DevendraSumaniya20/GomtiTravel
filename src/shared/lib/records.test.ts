import assert from 'node:assert/strict'
import test from 'node:test'
import { moveUp, upsert } from './records.ts'

const items = [{ id: 'a' }, { id: 'b' }, { id: 'c' }]

test('upsert replaces by id and appends new items', () => {
  assert.deepEqual(upsert([{ id: 'a', n: 1 }], { id: 'a', n: 2 }), [{ id: 'a', n: 2 }])
  assert.deepEqual(upsert(items, { id: 'd' }), [...items, { id: 'd' }])
})

test('moveUp swaps with the previous item and leaves the first and unknown ids alone', () => {
  assert.deepEqual(moveUp(items, 'c'), [{ id: 'a' }, { id: 'c' }, { id: 'b' }])
  assert.deepEqual(moveUp(items, 'a'), items)
  assert.deepEqual(moveUp(items, 'zzz'), items)
})
