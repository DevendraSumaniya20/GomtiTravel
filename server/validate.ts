import type { ContactDetails, Enquiry } from '../src/features/contact/model/contact.ts'

export type NewEnquiry = Omit<Enquiry, 'id' | 'createdAt'>

type Fields = Record<string, unknown>

const isFields = (body: unknown): body is Fields => typeof body === 'object' && body !== null && !Array.isArray(body)

/** Trimmed text of at most `max` characters, or null. */
function text(value: unknown, max: number, required = false): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  return trimmed.length <= max && (!required || trimmed.length > 0) ? trimmed : null
}

/** An enquiry from the public form, or null when any field is missing or out of bounds. */
export function validateEnquiry(body: unknown): NewEnquiry | null {
  if (!isFields(body)) return null
  const name = text(body.name, 120, true)
  const service = text(body.service, 120, true)
  const message = text(body.message ?? '', 1000)
  const phone = typeof body.phone === 'string' && /^[6-9]\d{9}$/.test(body.phone) ? body.phone : null
  const date = typeof body.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(body.date) && !Number.isNaN(Date.parse(body.date)) ? body.date : null
  if (name === null || service === null || message === null || phone === null || date === null) return null
  return { name, phone, service, date, message }
}

/** Contact details from the admin form, or null when any field is out of bounds. */
export function validateContact(body: unknown): ContactDetails | null {
  if (!isFields(body)) return null
  const owner = text(body.owner, 120)
  const email = text(body.email, 254)
  const address = text(body.address, 300)
  const phones = body.phones
  // parsePhones keeps any run of digits, so a number with a country code (13 digits) is allowed
  const phonesOk = Array.isArray(phones) && phones.length <= 5 && phones.every((phone) => typeof phone === 'string' && /^\d{10,13}$/.test(phone))
  if (owner === null || email === null || address === null || !phonesOk) return null
  return { owner, phones: phones as string[], email, address }
}
