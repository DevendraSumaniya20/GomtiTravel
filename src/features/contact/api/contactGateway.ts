import { api } from '../../../shared/lib/api.ts'
import { store } from '../../../shared/lib/store.ts'
import { useStore } from '../../../shared/lib/useStore.ts'
import { CONTACT, type ContactDetails, type Enquiry } from '../model/contact.ts'

const contactStore = store<ContactDetails>(CONTACT)
const enquiriesStore = store<readonly Enquiry[]>([])

// The signboard's details show until the server answers, and stay if it cannot be reached.
api<ContactDetails>('contact').then(contactStore.write, () => {})

export const useContact = () => useStore(contactStore)
/** Newest first. Empty until `loadEnquiries` runs, which needs the admin signed in. */
export const useEnquiries = () => useStore(enquiriesStore)

export async function saveContact(contact: ContactDetails) {
  contactStore.write(await api<ContactDetails>('contact', 'PUT', contact))
}

export async function sendEnquiry(enquiry: Omit<Enquiry, 'id' | 'createdAt'>) {
  await api<Enquiry>('enquiries', 'POST', enquiry)
}

let loaded = false

/** Refreshes the inbox and returns the enquiries that arrived since the last refresh (none on the first). */
export async function loadEnquiries(): Promise<Enquiry[]> {
  const seen = new Set(enquiriesStore.read().map((enquiry) => enquiry.id))
  const enquiries = await api<Enquiry[]>('enquiries')
  enquiriesStore.write(enquiries)
  const arrived = loaded ? enquiries.filter((enquiry) => !seen.has(enquiry.id)) : []
  loaded = true
  return arrived
}

export async function removeEnquiry(id: string) {
  await api('enquiries/' + encodeURIComponent(id), 'DELETE')
  enquiriesStore.write(enquiriesStore.read().filter((enquiry) => enquiry.id !== id))
}
