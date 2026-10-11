import { useState, type FormEvent } from 'react'
import { PhoneField } from '../../../shared/ui/PhoneField.tsx'
import { enquiriesStore } from '../api/contactGateway.ts'
import './EnquiryForm.css'

type EnquiryFormProps = {
  services: readonly { id: string; title: string }[]
  serviceId: string
  onServiceChange: (serviceId: string) => void
  /** Earliest travel date, `YYYY-MM-DD`. */
  today: string
}

/** Asks about one of the services: which one, who is asking, when, and anything else worth saying. */
export function EnquiryForm({ services, serviceId, onServiceChange, today }: EnquiryFormProps) {
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
        service: services.find((service) => service.id === serviceId)?.title ?? '',
        date: String(form.get('date')),
        message: String(form.get('message')).trim(),
        createdAt: new Date().toISOString(),
      },
    ])
    setSentFor(name)
    event.currentTarget.reset()
  }

  return (
    <form className="enquiry-form sheet pane" onSubmit={submit}>
      <h3>Send an enquiry</h3>
      <label className="enquiry-form__wide">
        Service
        <select value={serviceId} onChange={(event) => onServiceChange(event.target.value)} required>
          <option value="">Choose a service</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.title}
            </option>
          ))}
        </select>
      </label>
      <label>
        Your name
        <input name="name" autoComplete="name" required />
      </label>
      <PhoneField />
      <label>
        Travel date
        <input name="date" type="date" min={today} required />
      </label>
      <label className="enquiry-form__wide">
        Details (where to, how many people)
        <textarea name="message" rows={3} />
      </label>
      <button className="btn">Send enquiry</button>
      <p className="enquiry-form__result" role="status">
        {sentFor && `Thank you, ${sentFor}. This preview stores the enquiry in this browser only; to book now, please call.`}
      </p>
    </form>
  )
}
