import assert from 'node:assert/strict'
import { test } from 'node:test'
import type { Enquiry } from '../model/contact.ts'

const enquiry = (id: string): Enquiry => ({ id, name: id, phone: '9876543210', service: 'Bus', date: '2026-11-02', message: '', createdAt: '' })

let inbox: Enquiry[] = []
// The gateway loads the contact details when imported, so fetch is stubbed before the import.
globalThis.fetch = async (url) => Response.json(String(url).endsWith('/enquiries') ? inbox : { owner: '', phones: [], email: '', address: '' })
const { loadEnquiries, removeEnquiry } = await import('./contactGateway.ts')

test('loadEnquiries reports only enquiries that arrived since the last load', async () => {
  inbox = [enquiry('a')]
  assert.deepEqual(await loadEnquiries(), [], 'the first load is what was already there')
  inbox = [enquiry('b'), enquiry('a')]
  assert.deepEqual((await loadEnquiries()).map((e) => e.id), ['b'])
  assert.deepEqual(await loadEnquiries(), [])
})

test('an enquiry removed as handled is not reported as new when another arrives', async () => {
  await removeEnquiry('a')
  inbox = [enquiry('c'), enquiry('b')]
  assert.deepEqual((await loadEnquiries()).map((e) => e.id), ['c'])
})
