import { useContact } from '../api/contactGateway.ts'
import './ContactCard.css'

/** The operator's phone, email and office address, once they have been entered in the admin. */
export function ContactCard() {
  const { phone, email, address } = useContact()

  return (
    <div className="contact-card sheet pane">
      <h3>Reach the office</h3>
      {phone || email || address ? (
        <dl>
          {phone && (
            <div>
              <dt>Phone</dt>
              <dd>
                <a className="link" href={`tel:${phone.replaceAll(' ', '')}`}>
                  {phone}
                </a>
              </dd>
            </div>
          )}
          {email && (
            <div>
              <dt>Email</dt>
              <dd>
                <a className="link" href={`mailto:${email}`}>
                  {email}
                </a>
              </dd>
            </div>
          )}
          {address && (
            <div>
              <dt>Office</dt>
              <dd>{address}</dd>
            </div>
          )}
        </dl>
      ) : (
        <p>The phone number, email and office address will appear here once the operator adds them.</p>
      )}
    </div>
  )
}
