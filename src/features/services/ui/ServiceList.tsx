import type { Service } from '../model/services.ts'
import { ServiceIcon } from './ServiceIcon.tsx'
import './ServiceList.css'

type ServiceListProps = {
  services: readonly Service[]
  /** A `tel:` link to the desk. Without one the button opens the enquiry form instead. */
  callHref?: string
  onEnquire: (serviceId: string) => void
}

/** One card per service, each with a button that calls the desk about it. */
export function ServiceList({ services, callHref, onEnquire }: ServiceListProps) {
  return (
    <ul className="service-list">
      {services.map((service) => (
        <li key={service.id} className="service-list__card sheet pane">
          <span className="service-list__tile">
            <ServiceIcon icon={service.icon} />
          </span>
          <h3>{service.title}</h3>
          <p>{service.text}</p>
          {service.items.length > 0 && (
            <ul className="service-list__items">
              {service.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
          {callHref ? (
            <a className="btn" href={callHref} aria-label={`Call to enquire about ${service.title}`}>
              Call to enquire
            </a>
          ) : (
            <button className="btn" onClick={() => onEnquire(service.id)} aria-label={`Enquire about ${service.title}`}>
              Enquire
            </button>
          )}
        </li>
      ))}
    </ul>
  )
}
