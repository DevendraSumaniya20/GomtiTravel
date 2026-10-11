import type { Service } from '../model/services.ts'
import { ServiceIcon } from './ServiceIcon.tsx'
import './ServiceList.css'

type ServiceListProps = {
  services: readonly Service[]
  onEnquire: (serviceId: string) => void
}

/** One card per service, each with a button that starts an enquiry about it. */
export function ServiceList({ services, onEnquire }: ServiceListProps) {
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
          <button className="btn" onClick={() => onEnquire(service.id)} aria-label={`Enquire about ${service.title}`}>
            Enquire
          </button>
        </li>
      ))}
    </ul>
  )
}
