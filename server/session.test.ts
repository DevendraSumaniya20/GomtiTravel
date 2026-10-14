import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readCookie, sameSecret, signSession, verifySession } from './session.ts'

test('a signed session verifies until it expires', () => {
  const token = signSession('s', 1000)
  assert.equal(verifySession(token, 's', 1000), true)
  assert.equal(verifySession(token, 's', 1000 + 24 * 60 * 60 * 1000), false)
})

test('a session signed with another secret, edited or missing does not verify', () => {
  const token = signSession('s', 1000)
  assert.equal(verifySession(token, 'other', 1000), false)
  assert.equal(verifySession(token.replace(/^\d/, '9'), 's', 1000), false)
  assert.equal(verifySession(undefined, 's', 1000), false)
  assert.equal(verifySession('', 's', 1000), false)
})

test('sameSecret matches only identical text', () => {
  assert.equal(sameSecret('pass', 'pass'), true)
  assert.equal(sameSecret('pass', 'pass1'), false)
})

test('readCookie finds one cookie among several', () => {
  assert.equal(readCookie('a=1; admin=x.y; b=2', 'admin'), 'x.y')
  assert.equal(readCookie('a=1', 'admin'), undefined)
  assert.equal(readCookie(undefined, 'admin'), undefined)
})
