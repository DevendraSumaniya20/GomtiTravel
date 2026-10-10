export type ContactDetails = {
  phone: string
  email: string
  address: string
}

// Empty until the operator supplies real details in the admin. Never fill these with made-up values.
export const NO_CONTACT: ContactDetails = { phone: '', email: '', address: '' }

/** A request to hire a whole coach. */
export type CharterEnquiry = {
  id: string
  name: string
  phone: string
  date: string
  destination: string
  passengers: number
  createdAt: string
}
