import { useState, type FormEvent } from 'react'
import { contactStore, useContact } from '../api/contactGateway.ts'
import './ContactDetailsForm.css'

/** Admin form for the details shown in the public contact card. Blank fields stay hidden on the site. */
export function ContactDetailsForm() {
  const contact = useContact()
  const [saved, setSaved] = useState(false)

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    contactStore.write({
      phone: String(form.get('phone')).trim(),
      email: String(form.get('email')).trim(),
      address: String(form.get('address')).trim(),
    })
    setSaved(true)
  }

  return (
    <form className="contact-details-form" onSubmit={submit} onChange={() => setSaved(false)}>
      <label>
        Phone
        <input name="phone" type="tel" autoComplete="off" defaultValue={contact.phone} />
      </label>
      <label>
        Email
        <input name="email" type="email" autoComplete="off" defaultValue={contact.email} />
      </label>
      <label>
        Office address
        <input name="address" autoComplete="off" defaultValue={contact.address} />
      </label>
      <button className="btn">Save contact details</button>
      <span role="status">{saved && 'Saved.'}</span>
    </form>
  )
}
