import { useState, type MouseEvent } from 'react'
import { CoachList } from '../features/coaches/ui/CoachList.tsx'
import { CharterForm } from '../features/contact/ui/CharterForm.tsx'
import { ContactCard } from '../features/contact/ui/ContactCard.tsx'
import { STOPS, type StopId } from '../features/journey/model/stops.ts'
import { Road } from '../features/journey/ui/Road.tsx'
import { Scenery } from '../features/journey/ui/Scenery.tsx'
import { AmenityList } from '../features/service/ui/AmenityList.tsx'
import { BoardingGuide } from '../features/service/ui/BoardingGuide.tsx'
import { useRoutes } from '../features/trips/api/tripsGateway.ts'
import { isoDate } from '../features/trips/model/booking.ts'
import { ORIGIN } from '../features/trips/model/routes.ts'
import { BookingForm } from '../features/trips/ui/BookingForm.tsx'
import { BookingLookup } from '../features/trips/ui/BookingLookup.tsx'
import { QuickRoutes } from '../features/trips/ui/QuickRoutes.tsx'
import { Timetable } from '../features/trips/ui/Timetable.tsx'
import { TripSearch } from '../features/trips/ui/TripSearch.tsx'
import { scrollToElement, useSmoothScroll } from '../shared/motion/smoothScroll.ts'
import { Section } from '../shared/ui/Section.tsx'
import { Hero } from './Hero.tsx'
import './App.css'

const HEADLINE = [`Leave ${ORIGIN} at night.`, 'Wake up where', 'you are going.']

/** Links keep their `href` so they work without JavaScript; with it they scroll smoothly. */
function goTo(stop: StopId) {
  return (event: MouseEvent) => {
    event.preventDefault()
    scrollToElement(stop)
  }
}

export function App() {
  useSmoothScroll()
  const routes = useRoutes()
  // Shared by the trip search, the timetable and the booking form.
  const [destinationId, setDestinationId] = useState('')
  const [date, setDate] = useState('')
  const [routeId, setRouteId] = useState('')
  const [today] = useState(() => isoDate(new Date()))

  const destinations = routes.map((route) => route.to).join(', ')
  const lede = destinations ? `Daily sleeper and seater coaches from ${ORIGIN} to ${destinations}.` : `Coaches from ${ORIGIN}.`

  const requestSeat = (id: string) => {
    setRouteId(id)
    scrollToElement('book' satisfies StopId)
  }

  return (
    <div>
      <Scenery />

      <header className="app__header">
        <a className="app__brand" href="#start" onClick={goTo('start')}>
          Gomti Travels
        </a>
        <a className="btn" href="#book" onClick={goTo('book')}>
          Request a seat
        </a>
      </header>

      <main>
        <Hero id="start" headline={HEADLINE} lede={lede}>
          <TripSearch
            destinationId={destinationId}
            date={date}
            today={today}
            onDestinationChange={setDestinationId}
            onDateChange={setDate}
            onSearch={() => scrollToElement('routes' satisfies StopId)}
          />
        </Hero>

        <Section id="routes" title={`Departures from ${ORIGIN}`}>
          <QuickRoutes onPick={requestSeat} />
          <Timetable destinationId={destinationId} onShowAll={() => setDestinationId('')} onRequestSeat={requestSeat} />
        </Section>

        <Section id="fleet" title="Our coaches">
          <CoachList />
        </Section>

        <Section id="onboard" title="What you get on the bus">
          <AmenityList />
        </Section>

        <Section id="boarding" title={`Where to board in ${ORIGIN}`}>
          <BoardingGuide />
        </Section>

        <Section id="book" title="Request a seat">
          <div className="app__stack">
            <BookingForm routeId={routeId} date={date} today={today} onRouteChange={setRouteId} />
            <BookingLookup />
          </div>
        </Section>

        <Section id="contact" title="Contact and charter">
          <div className="app__pair">
            <ContactCard />
            <CharterForm today={today} />
          </div>
        </Section>
      </main>

      <footer className="app__footer">
        <p>Gomti Travels, {ORIGIN}.</p>
        <p>Timings, fares and coach details on this page are sample data.</p>
        <p>
          <a href="/admin.html">Admin</a>
        </p>
      </footer>

      <Road stops={STOPS} />
    </div>
  )
}
