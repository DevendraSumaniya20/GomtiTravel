import { useState } from 'react'
import { useContact } from '../features/contact/api/contactGateway.ts'
import { ContactCard } from '../features/contact/ui/ContactCard.tsx'
import { EnquiryForm } from '../features/contact/ui/EnquiryForm.tsx'
import { STOPS, type StopId } from '../features/journey/model/stops.ts'
import { RoadScene } from '../features/journey/ui/RoadScene.tsx'
import { ORIGIN, SERVICES } from '../features/services/model/services.ts'
import { ServiceList } from '../features/services/ui/ServiceList.tsx'
import { scrollToElement, useSmoothScroll } from '../shared/motion/smoothScroll.ts'
import { Section } from '../shared/ui/Section.tsx'
import { Hero } from './Hero.tsx'
import { SiteFooter } from './SiteFooter.tsx'
import { SiteNav } from './SiteNav.tsx'
import './App.css'

const BRAND = 'Gomtiji Tours & Travels'
const HEADLINE = ['Buses, darshan, taxis and tickets.', `One desk in ${ORIGIN}.`]
const LEDE = 'Daily sleeper buses, Dwarka and Somnath darshan, car and bike on rent, train and flight booking.'
/** Every section but the first; the hero needs no link to itself. */
const LINKS = STOPS.slice(1)

export function App() {
  useSmoothScroll()
  const [phone] = useContact().phones
  // Shared by the service cards, which choose it, and the enquiry form, which shows it.
  const [serviceId, setServiceId] = useState('')
  // local date as YYYY-MM-DD, which is how the Canadian locale writes it
  const [today] = useState(() => new Date().toLocaleDateString('en-CA'))

  const enquire = (id: string) => {
    setServiceId(id)
    scrollToElement('contact' satisfies StopId)
  }

  return (
    <div>
      <SiteNav brand={BRAND} homeId={STOPS[0].id} links={LINKS} actionId={'contact' satisfies StopId} />

      <main>
        <Hero id="start" brand={BRAND} headline={HEADLINE} lede={LEDE} scene={<RoadScene time="dusk" arrive />} />

        <Section id="services" title="What we do" lede={`Everything a traveller needs in ${ORIGIN}. Pick a service and call us about it.`}>
          <ServiceList services={SERVICES} callHref={phone && `tel:+91${phone}`} onEnquire={enquire} />
        </Section>

        <div className="app__arrival">
          <RoadScene time="dawn" />
        </div>

        <Section id="contact" title="Contact" lede="Call the desk to book, or leave your number and what you need." tone="dark">
          <div className="app__pair">
            <ContactCard />
            <EnquiryForm services={SERVICES} serviceId={serviceId} onServiceChange={setServiceId} today={today} />
          </div>
        </Section>
      </main>

      <SiteFooter brand={BRAND} place={`${ORIGIN}, Gujarat`} year={today.slice(0, 4)} links={LINKS} />
    </div>
  )
}
