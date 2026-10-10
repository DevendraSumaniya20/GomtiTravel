import { useState } from 'react'
import { CoachList } from '../features/coaches/ui/CoachList.tsx'
import { CharterForm } from '../features/contact/ui/CharterForm.tsx'
import { ContactCard } from '../features/contact/ui/ContactCard.tsx'
import { STOPS, type StopId } from '../features/journey/model/stops.ts'
import { RoadScene } from '../features/journey/ui/RoadScene.tsx'
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
import { SiteFooter } from './SiteFooter.tsx'
import { SiteNav } from './SiteNav.tsx'
import './App.css'

const BRAND = 'Gomti Travels'
const HEADLINE = [`Leave ${ORIGIN} at night.`, 'Wake up where you are going.']
/** Every section but the first; the hero needs no link to itself. */
const LINKS = STOPS.slice(1)

export function App() {
  useSmoothScroll()
  const routes = useRoutes()
  // Shared by the trip search, the timetable and the booking form.
  const [destinationId, setDestinationId] = useState('')
  const [date, setDate] = useState('')
  const [routeId, setRouteId] = useState('')
  const [today] = useState(() => isoDate(new Date()))

  const destinations = routes.map((route) => route.to).join(', ')
  const lede = destinations ? `Daily from ${ORIGIN} to ${destinations}` : `Coaches from ${ORIGIN}, Gujarat`

  const requestSeat = (id: string) => {
    setRouteId(id)
    scrollToElement('book' satisfies StopId)
  }

  return (
    <div>
      <SiteNav links={LINKS} />

      <main>
        <Hero id="start" brand={BRAND} headline={HEADLINE} lede={lede} scene={<RoadScene time="dusk" arrive />} />

        <div className="app__search">
          <TripSearch
            destinationId={destinationId}
            date={date}
            today={today}
            onDestinationChange={setDestinationId}
            onDateChange={setDate}
            onSearch={() => scrollToElement('routes' satisfies StopId)}
          />
        </div>

        <Section
          id="routes"
          title="Departures"
          lede="Day coaches along the Saurashtra coast and overnight sleepers inland. Pick a route to request a seat."
        >
          <QuickRoutes onPick={requestSeat} />
          <Timetable destinationId={destinationId} onShowAll={() => setDestinationId('')} onRequestSeat={requestSeat} />
        </Section>

        <Section id="fleet" title="The coaches" lede="Flat berths for the long night runs, pushback seats for the day.">
          <CoachList />
        </Section>

        <Section id="onboard" title="On board" lede="What every passenger gets, on every departure.">
          <AmenityList />
        </Section>

        <Section
          id="boarding"
          title="Boarding"
          lede={`The coach collects passengers across ${ORIGIN} before it takes the highway. Be at your point fifteen minutes early.`}
        >
          <BoardingGuide />
        </Section>

        <div className="app__arrival">
          <RoadScene time="dawn" />
        </div>

        <Section id="book" title="Request a seat" lede="Send the request and we call you back to confirm the seats and the fare." tone="dark">
          <div className="app__stack">
            <BookingForm routeId={routeId} date={date} today={today} onRouteChange={setRouteId} />
            <BookingLookup />
          </div>
        </Section>

        <Section
          id="contact"
          title="Contact"
          lede="Hire a whole coach for a wedding party, a school trip or a yatra, or reach the office directly."
        >
          <div className="app__pair">
            <ContactCard />
            <CharterForm today={today} />
          </div>
        </Section>
      </main>

      <SiteFooter brand={BRAND} place={`${ORIGIN}, Gujarat`} year={today.slice(0, 4)} links={LINKS} />
    </div>
  )
}
