import { useState, type FormEvent } from 'react'
import { PhoneField } from '../../../shared/ui/PhoneField.tsx'
import { sendEnquiry } from '../api/contactGateway.ts'
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
  const [result, setResult] = useState('')
  const [sending, setSending] = useState(false)

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formElement = event.currentTarget
    const form = new FormData(formElement)
    const name = String(form.get('name')).trim()
    setSending(true)
    try {
      await sendEnquiry({
        name,
        phone: String(form.get('phone')),
        service: services.find((service) => service.id === serviceId)?.title ?? '',
        date: String(form.get('date')),
        message: String(form.get('message')).trim(),
      })
      setResult(`Thank you, ${name}. Your enquiry has been sent.`)
      formElement.reset()
    } catch {
      setResult('Sorry, the enquiry could not be sent. Please call instead.')
    } finally {
      setSending(false)
    }
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
      <button className="btn" disabled={sending}>
        {sending ? 'Sending…' : 'Send enquiry'}
      </button>
      <p className="enquiry-form__result" role="status">
        {result}
      </p>
    </form>
  )
}
