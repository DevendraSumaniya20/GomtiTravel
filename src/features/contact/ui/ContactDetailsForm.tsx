import { useState, type FormEvent } from 'react'
import { contactStore, useContact } from '../api/contactGateway.ts'
import { parsePhones } from '../model/contact.ts'
import './ContactDetailsForm.css'

/** Admin form for the details shown in the public contact card. Blank fields stay hidden on the site. */
export function ContactDetailsForm() {
  const contact = useContact()
  const [saved, setSaved] = useState(false)

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    contactStore.write({
      owner: String(form.get('owner')).trim(),
      phones: parsePhones(String(form.get('phones'))),
      email: String(form.get('email')).trim(),
      address: String(form.get('address')).trim(),
    })
    setSaved(true)
  }

  return (
    <form className="contact-details-form" onSubmit={submit} onChange={() => setSaved(false)}>
      <label>
        Owner's name
        <input name="owner" autoComplete="off" defaultValue={contact.owner} />
      </label>
      <label>
        Mobile numbers, one per line
        <textarea name="phones" rows={2} autoComplete="off" defaultValue={contact.phones.join('\n')} />
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
