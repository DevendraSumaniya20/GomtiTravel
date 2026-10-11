import type { Service } from '../model/services.ts'
import './ServiceList.css'

type ServiceListProps = {
  services: readonly Service[]
  /** A `tel:` link to the desk. Without one the button opens the enquiry form instead. */
  callHref?: string
  onEnquire: (serviceId: string) => void
}

/** One card per service: a photo, what it is, and a button that calls the desk about it. The photos are credited underneath. */
export function ServiceList({ services, callHref, onEnquire }: ServiceListProps) {
  return (
    <>
      <ul className="service-list">
        {services.map((service) => (
          <li key={service.id} className="service-list__card sheet">
            {/* relative, so it resolves under whatever path the site is served from */}
            <img src={`services/${service.photo.file}`} alt={service.photo.alt} width="960" height="600" loading="lazy" />
            <div className="service-list__body pane">
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
            </div>
          </li>
        ))}
      </ul>
      <details className="service-list__credits">
        <summary>Photos are for illustration, not our own vehicles. Photo credits</summary>
        <ul>
          {services.map(({ id, title, photo }) => (
            <li key={id}>
              {title}:{' '}
              <a className="link" href={photo.source}>
                photo by {photo.author}
              </a>
              ,{' '}
              <a className="link" href={photo.licenceUrl}>
                {photo.licence}
              </a>
              , cropped.
            </li>
          ))}
        </ul>
      </details>
    </>
  )
}
