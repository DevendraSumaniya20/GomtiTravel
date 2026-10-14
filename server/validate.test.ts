import assert from 'node:assert/strict'
import { test } from 'node:test'
import { validateContact, validateEnquiry } from './validate.ts'

const enquiry = { name: ' Asha ', phone: '9876543210', service: 'Sleeper bus', date: '2026-11-02', message: '' }

test('validateEnquiry trims and keeps a complete enquiry', () => {
  assert.deepEqual(validateEnquiry(enquiry), { ...enquiry, name: 'Asha' })
  assert.deepEqual(validateEnquiry({ ...enquiry, message: undefined }), { ...enquiry, name: 'Asha', message: '' })
})

test('validateEnquiry rejects missing, malformed or oversized fields', () => {
  assert.equal(validateEnquiry(null), null)
  assert.equal(validateEnquiry([]), null)
  assert.equal(validateEnquiry({ ...enquiry, name: '  ' }), null)
  assert.equal(validateEnquiry({ ...enquiry, phone: '1234567890' }), null)
  assert.equal(validateEnquiry({ ...enquiry, date: '2026-13-40' }), null)
  assert.equal(validateEnquiry({ ...enquiry, message: 'x'.repeat(1001) }), null)
})

const contact = { owner: 'Owner', phones: ['8320491320'], email: '', address: '' }

test('validateContact keeps blank email and address and rejects bad phones', () => {
  assert.deepEqual(validateContact(contact), contact)
  assert.equal(validateContact({ ...contact, phones: ['123'] }), null)
  assert.equal(validateContact({ ...contact, phones: '8320491320' }), null)
  assert.equal(validateContact({ ...contact, owner: 5 }), null)
})
