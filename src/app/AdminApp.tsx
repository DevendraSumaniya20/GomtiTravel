import { ContactDetailsForm } from '../features/contact/ui/ContactDetailsForm.tsx'
import { EnquiryInbox } from '../features/contact/ui/EnquiryInbox.tsx'
import './AdminApp.css'

const SECTIONS = [
  { id: 'enquiries', label: 'Enquiries' },
  { id: 'contact', label: 'Contact details' },
] as const

/** The owner's back office: the enquiries the public page collects, and the contact details it shows. */
export function AdminApp() {
  const [enquiries, contact] = SECTIONS

  return (
    <div className="admin">
      <header className="admin__header">
        <h1>Gomtiji Tours &amp; Travels admin</h1>
        <p className="admin__notice">
          There is no sign-in and no server yet. Changes are saved in this browser only, so do not enter real passenger data.
        </p>
        <nav className="admin__nav" aria-label="Admin sections">
          {SECTIONS.map((section) => (
            <a key={section.id} href={`#${section.id}`}>
              {section.label}
            </a>
          ))}
          <a href="/">View the site</a>
        </nav>
      </header>

      <main className="admin__main">
        <section id={enquiries.id} className="sheet pane">
          <h2>{enquiries.label}</h2>
          <EnquiryInbox />
        </section>

        <section id={contact.id} className="sheet pane">
          <h2>{contact.label}</h2>
          <ContactDetailsForm />
        </section>
      </main>
    </div>
  )
}
