import { useState, type FormEvent } from 'react'
import { PhoneField } from '../../../shared/ui/PhoneField.tsx'
import { enquiriesStore } from '../api/contactGateway.ts'
import './CharterForm.css'

type CharterFormProps = {
  /** Earliest date a coach can be hired for, `YYYY-MM-DD`. */
  today: string
}

/** Asks for a whole coach for a group: a wedding party, a school trip, a pilgrimage. */
export function CharterForm({ today }: CharterFormProps) {
  const [sentFor, setSentFor] = useState('')

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name')).trim()
    enquiriesStore.write([
      ...enquiriesStore.read(),
      {
        id: crypto.randomUUID(),
        name,
        phone: String(form.get('phone')),
        date: String(form.get('date')),
        destination: String(form.get('destination')).trim(),
        passengers: Number(form.get('passengers')),
        createdAt: new Date().toISOString(),
      },
    ])
    setSentFor(name)
    event.currentTarget.reset()
  }

  return (
    <form className="charter-form sheet pane" onSubmit={submit}>
      <h3>Hire a whole coach</h3>
      <label>
        Your name
        <input name="name" autoComplete="name" required />
      </label>
      <PhoneField />
      <label>
        Where to
        <input name="destination" required />
      </label>
      <label>
        Travel date
        <input name="date" type="date" min={today} required />
      </label>
      <label>
        Passengers
        <input name="passengers" type="number" min="1" max="500" required />
      </label>
      <button className="btn">Send enquiry</button>
      <p className="charter-form__result" role="status">
        {sentFor && `Thank you, ${sentFor}. This preview stores the enquiry in this browser only; nothing reaches the operator yet.`}
      </p>
    </form>
  )
}
