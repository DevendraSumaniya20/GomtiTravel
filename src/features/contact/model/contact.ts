export type ContactDetails = {
  /** Who to ask for. */
  owner: string
  /** Mobile numbers, ten digits each. */
  phones: readonly string[]
  email: string
  address: string
}

// From the shop's signboard. The email and the address are not on it: they stay empty until the
// owner enters them in the admin. Never fill these with made-up values.
export const CONTACT: ContactDetails = {
  owner: 'Jayrajsinh Jadeja',
  phones: ['8320491320', '9726514657'],
  email: '',
  address: '',
}

/** Ten digits as they are read out: 83204 91320. */
export function spacedPhone(phone: string): string {
  return phone.replace(/^(\d{5})(\d{5})$/, '$1 $2')
}

/** Splits what was typed in the admin, one number per line or comma, into bare digits. */
export function parsePhones(text: string): string[] {
  return text
    .split(/[\n,]/)
    .map((phone) => phone.replace(/\D/g, ''))
    .filter(Boolean)
}

/** A question about one of the services, left from the public page. */
export type Enquiry = {
  id: string
  name: string
  phone: string
  /** The service's title, as the visitor saw it. */
  service: string
  date: string
  message: string
  createdAt: string
}
