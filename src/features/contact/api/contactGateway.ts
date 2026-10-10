import { localStore } from '../../../shared/lib/localStore.ts'
import { useStore } from '../../../shared/lib/useStore.ts'
import { NO_CONTACT, type CharterEnquiry, type ContactDetails } from '../model/contact.ts'

export const contactStore = localStore<ContactDetails>('gomti.v2.contact', NO_CONTACT)
export const enquiriesStore = localStore<readonly CharterEnquiry[]>('gomti.v2.enquiries', [])

export const useContact = () => useStore(contactStore)
export const useEnquiries = () => useStore(enquiriesStore)
