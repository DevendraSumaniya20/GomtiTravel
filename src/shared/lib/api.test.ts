import assert from 'node:assert/strict'
import { afterEach, test } from 'node:test'
import { api, ApiError } from './api.ts'

const realFetch = globalThis.fetch
afterEach(() => {
  globalThis.fetch = realFetch
})

test('sends JSON to /api/ and returns the parsed answer', async () => {
  let seen: { url: string; init?: RequestInit } | undefined
  globalThis.fetch = async (url, init) => {
    seen = { url: String(url), init }
    return Response.json({ ok: true })
  }
  assert.deepEqual(await api('contact', 'PUT', { a: 1 }), { ok: true })
  assert.equal(seen?.url, '/api/contact')
  assert.equal(seen?.init?.method, 'PUT')
  assert.equal(seen?.init?.body, '{"a":1}')
})

test('returns nothing for 204 and throws the status for an error', async () => {
  globalThis.fetch = async () => new Response(null, { status: 204 })
  assert.equal(await api('session'), undefined)
  globalThis.fetch = async () => new Response(null, { status: 401 })
  await assert.rejects(api('session'), (error) => error instanceof ApiError && error.status === 401)
})

test('reports an unreachable server as status 0', async () => {
  globalThis.fetch = async () => {
    throw new TypeError('Failed to fetch')
  }
  await assert.rejects(api('contact'), (error) => error instanceof ApiError && error.status === 0)
})
