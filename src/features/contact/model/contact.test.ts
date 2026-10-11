import assert from 'node:assert/strict'
import { test } from 'node:test'
import { parsePhones, spacedPhone } from './contact.ts'

test('spacedPhone splits ten digits in two and leaves anything else alone', () => {
  assert.equal(spacedPhone('8320491320'), '83204 91320')
  assert.equal(spacedPhone('02892234567'), '02892234567')
})

test('parsePhones takes one number per line or comma and keeps only digits', () => {
  assert.deepEqual(parsePhones('83204 91320\n+91 97265-14657, '), ['8320491320', '919726514657'])
  assert.deepEqual(parsePhones('  '), [])
})
