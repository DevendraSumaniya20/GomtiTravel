import { useState, type FormEvent } from 'react'
import { saveContact, useContact } from '../api/contactGateway.ts'
import { parsePhones } from '../model/contact.ts'
import './ContactDetailsForm.css'

/** Admin form for the details shown in the public contact card. Blank fields stay hidden on the site. */
export function ContactDetailsForm() {
  const contact = useContact()
  const [status, setStatus] = useState('')

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    saveContact({
      owner: String(form.get('owner')).trim(),
      phones: parsePhones(String(form.get('phones'))),
      email: String(form.get('email')).trim(),
      address: String(form.get('address')).trim(),
    }).then(
      () => setStatus('Saved.'),
      () => setStatus('Not saved. Check each mobile number has 10 digits, then try again.'),
    )
  }

  return (
    // keyed by the details, so the fields refill when the server's copy arrives
    <form key={JSON.stringify(contact)} className="contact-details-form" onSubmit={submit} onChange={() => setStatus('')}>
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
      <span role="status">{status}</span>
    </form>
  )
}
