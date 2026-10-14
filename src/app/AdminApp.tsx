import { useCallback, useEffect, useState } from 'react'
import { ContactDetailsForm } from '../features/contact/ui/ContactDetailsForm.tsx'
import { EnquiryInbox } from '../features/contact/ui/EnquiryInbox.tsx'
import { api, ApiError } from '../shared/lib/api.ts'
import { AdminSignIn } from './AdminSignIn.tsx'
import { useEnquiryAlerts } from './useEnquiryAlerts.ts'
import './AdminApp.css'

type Session = 'checking' | 'signed-out' | 'signed-in' | 'offline'

const sessionAfter = (failure: unknown): Session =>
  failure instanceof ApiError && failure.status === 401 ? 'signed-out' : 'offline'

const SECTIONS = [
  { id: 'enquiries', label: 'Enquiries' },
  { id: 'contact', label: 'Contact details' },
] as const

/** The owner's back office: the enquiries the public page collects, and the contact details it shows. */
export function AdminApp() {
  const [enquiries, contact] = SECTIONS
  const [session, setSession] = useState<Session>('checking')

  useEffect(() => {
    api('session').then(() => setSession('signed-in'), (failure: unknown) => setSession(sessionAfter(failure)))
  }, [])

  const lost = useCallback((failure: unknown) => setSession(sessionAfter(failure)), [])
  // An expired cookie shows up as a 401, which returns the owner to the sign-in form.
  const { newIds, alerts, turnOnAlerts } = useEnquiryAlerts(session === 'signed-in', lost)

  const signOut = () => api('session', 'DELETE').finally(() => setSession('signed-out'))

  return (
    <div className="admin">
      <header className="admin__header">
        <h1>Gomtiji Tours &amp; Travels admin</h1>
        {session === 'signed-in' && alerts === 'denied' && (
          <p className="admin__notice">Alerts are blocked. To get them, allow notifications for this site in the browser's settings.</p>
        )}
        {session === 'offline' && (
          <p className="admin__notice">The server could not be reached. Start it with npm run server, then reload this page.</p>
        )}
        <nav className="admin__nav" aria-label="Admin sections">
          {SECTIONS.map((section) => (
            <a key={section.id} href={`#${section.id}`}>
              {section.label}
            </a>
          ))}
          <a href="./">View the site</a>
          {session === 'signed-in' && alerts === 'default' && (
            <button className="link" onClick={turnOnAlerts}>
              Turn on alerts
            </button>
          )}
          {session === 'signed-in' && (
            <button className="link" onClick={signOut}>
              Sign out
            </button>
          )}
        </nav>
      </header>

      <main className="admin__main">
        {session === 'signed-out' && <AdminSignIn onSignedIn={() => setSession('signed-in')} />}
        {session === 'signed-in' && (
          <>
            <section id={enquiries.id} className="sheet pane">
              <h2>{enquiries.label}</h2>
              <EnquiryInbox newIds={newIds} />
            </section>

            <section id={contact.id} className="sheet pane">
              <h2>{contact.label}</h2>
              <ContactDetailsForm />
            </section>
          </>
        )}
      </main>
    </div>
  )
}
