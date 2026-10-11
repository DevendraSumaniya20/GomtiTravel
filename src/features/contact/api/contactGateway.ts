import { localStore } from '../../../shared/lib/localStore.ts'
import { useStore } from '../../../shared/lib/useStore.ts'
import { CONTACT, type ContactDetails, type Enquiry } from '../model/contact.ts'

export const contactStore = localStore<ContactDetails>('gomti.v3.contact', CONTACT)
export const enquiriesStore = localStore<readonly Enquiry[]>('gomti.v3.enquiries', [])

export const useContact = () => useStore(contactStore)
export const useEnquiries = () => useStore(enquiriesStore)
