import { spacedPhone } from '../model/contact.ts'
import { useContact } from '../api/contactGateway.ts'
import './ContactCard.css'

/** Who to call and where the desk is. Each number is a button that dials it. */
export function ContactCard() {
  const { owner, phones, email, address } = useContact()

  return (
    <div className="contact-card sheet pane">
      <h3>Call the desk</h3>
      {owner && <p className="contact-card__owner">{owner}</p>}
      <ul className="contact-card__phones">
        {phones.map((phone) => (
          <li key={phone}>
            <a className="btn" href={`tel:+91${phone}`}>
              {spacedPhone(phone)}
            </a>
          </li>
        ))}
      </ul>
      {(email || address) && (
        <dl>
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
      )}
    </div>
  )
}
