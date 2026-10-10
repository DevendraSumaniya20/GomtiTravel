import { coachesStore, useCoaches } from '../features/coaches/api/coachesGateway.ts'
import { COACH_FIELDS, coachFromValues, coachToValues } from '../features/coaches/model/coachForm.ts'
import { ContactDetailsForm } from '../features/contact/ui/ContactDetailsForm.tsx'
import { EnquiryInbox } from '../features/contact/ui/EnquiryInbox.tsx'
import { amenitiesStore, boardingStore, useAmenities, useBoardingPoints } from '../features/service/api/serviceGateway.ts'
import { AMENITY_FIELDS, BOARDING_FIELDS } from '../features/service/model/service.ts'
import { routesStore, useRoutes } from '../features/trips/api/tripsGateway.ts'
import { routeFields, routeFromValues, routeToValues } from '../features/trips/model/routeForm.ts'
import { ORIGIN } from '../features/trips/model/routes.ts'
import { BookingInbox } from '../features/trips/ui/BookingInbox.tsx'
import { formatInr } from '../shared/lib/formatInr.ts'
import { RecordEditor } from '../shared/ui/RecordEditor.tsx'
import './AdminApp.css'

const SECTIONS = [
  { id: 'requests', label: 'Seat requests' },
  { id: 'enquiries', label: 'Charter enquiries' },
  { id: 'routes', label: 'Routes and timetable' },
  { id: 'coaches', label: 'Coaches' },
  { id: 'amenities', label: 'On board' },
  { id: 'boarding', label: 'Boarding points' },
  { id: 'contact', label: 'Contact details' },
] as const

/** The operator's back office: every list the public page shows, plus the requests it collects. */
export function AdminApp() {
  const routes = useRoutes()
  const coaches = useCoaches()
  const amenities = useAmenities()
  const points = useBoardingPoints()
  const [requests, enquiries, routesTitle, coachesTitle, amenitiesTitle, boardingTitle, contact] = SECTIONS

  return (
    <div className="admin">
      <header className="admin__header">
        <h1>Gomti Travels admin</h1>
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
        <section id={requests.id} className="sheet pane">
          <h2>{requests.label}</h2>
          <BookingInbox />
        </section>

        <section id={enquiries.id} className="sheet pane">
          <h2>{enquiries.label}</h2>
          <EnquiryInbox />
        </section>

        <section id={routesTitle.id} className="sheet pane">
          <h2>{routesTitle.label}</h2>
          <RecordEditor
            noun="route"
            items={routes}
            fields={routeFields(coaches.map((coach) => coach.name))}
            describe={(route) =>
              `${ORIGIN} to ${route.to}, ${route.departs} to ${route.arrives}, ${route.coach}, ${formatInr(route.fare)}${route.featured ? ', featured' : ''}`
            }
            toValues={routeToValues}
            fromValues={routeFromValues}
            onChange={routesStore.write}
          />
        </section>

        <section id={coachesTitle.id} className="sheet pane">
          <h2>{coachesTitle.label}</h2>
          <RecordEditor
            noun="coach"
            items={coaches}
            fields={COACH_FIELDS}
            describe={(coach) => `${coach.name}, ${coach.layout.join(' + ')}, ${coach.capacity}`}
            toValues={coachToValues}
            fromValues={coachFromValues}
            onChange={coachesStore.write}
          />
        </section>

        <section id={amenitiesTitle.id} className="sheet pane">
          <h2>{amenitiesTitle.label}</h2>
          <RecordEditor
            noun="amenity"
            items={amenities}
            fields={AMENITY_FIELDS}
            describe={(amenity) => amenity.title}
            toValues={({ title, text }) => ({ title, text })}
            fromValues={(values, id) => ({ id, ...values })}
            onChange={amenitiesStore.write}
          />
        </section>

        <section id={boardingTitle.id} className="sheet pane">
          <h2>{boardingTitle.label}</h2>
          <RecordEditor
            noun="boarding point"
            items={points}
            fields={BOARDING_FIELDS}
            describe={(point) => `${point.place}, ${point.pickup}`}
            toValues={({ place, pickup }) => ({ place, pickup })}
            fromValues={(values, id) => ({ id, ...values })}
            onChange={boardingStore.write}
          />
        </section>

        <section id={contact.id} className="sheet pane">
          <h2>{contact.label}</h2>
          <ContactDetailsForm />
        </section>
      </main>
    </div>
  )
}
