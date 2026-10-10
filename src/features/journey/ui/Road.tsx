import { useRef, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP, withMotion } from '../../../shared/motion/gsap.ts'
import { scrollToElement } from '../../../shared/motion/smoothScroll.ts'
import { busProgress, nearestStop } from '../model/busProgress.ts'
import type { Stop } from '../model/stops.ts'
import { Bus } from './Bus.tsx'
import './Road.css'

/** Wheel radius as a share of the Bus drawing's width (13 of 320), to turn the wheels by road covered. */
const WHEEL_RATIO = 13 / 320
/** Length of one centre-line dash and its gap, in rem. Matches `.road__dashes`. */
const DASH_REM = 3

type RoadProps = {
  stops: readonly Stop[]
}

/**
 * The road along the foot of the screen, with a milestone for each section. Scrolling drives the bus:
 * it runs to the milestone of the section on screen while the wheels turn and the centre line streams past.
 */
export function Road({ stops }: RoadProps) {
  const road = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)

  useGSAP(
    () => {
      const q = gsap.utils.selector(road)
      const track = q<HTMLElement>('.road__track')[0]
      const bus = q<HTMLElement>('.road__bus')[0]
      if (!track || !bus) return
      const wheels = q('.bus__wheel')
      const setX = gsap.quickSetter(bus, 'x', 'px')
      const setSpin = gsap.quickSetter(wheels, 'rotation', 'deg')
      const setBounce = gsap.quickSetter(q('.bus__chassis'), 'y', 'px')
      const setDashes = gsap.quickSetter(q('.road__dashes'), 'x', 'rem')
      gsap.set(wheels, { transformOrigin: '50% 50%' })

      let tops: number[] = []
      let span = 0
      let wheelTurn = 1
      let rem = 16
      let facing = 1
      let current = 0

      const place = (self: ScrollTrigger) => {
        const scroll = self.scroll()
        const progress = busProgress(scroll, tops)
        setX(progress * span)
        setSpin((scroll / wheelTurn) * 360)
        // the body rides on its springs while the wheels stay on the road
        setBounce(Math.sin(scroll / 26) * 1.3)
        setDashes(-((scroll / rem) % DASH_REM))

        const direction = self.direction || 1
        if (direction !== facing) {
          facing = direction
          gsap.to(q('.bus'), { scaleX: direction, duration: 0.25, overwrite: true })
        }

        const stop = nearestStop(progress, tops.length)
        if (stop !== current) {
          current = stop
          setActive(stop)
        }
      }

      const measure = (self: ScrollTrigger) => {
        const max = ScrollTrigger.maxScroll(window)
        tops = stops.map(({ id }) => {
          const section = document.getElementById(id)
          return section ? Math.min(max, section.getBoundingClientRect().top + window.scrollY) : max
        })
        span = track.clientWidth
        wheelTurn = 2 * Math.PI * bus.offsetWidth * WHEEL_RATIO
        rem = parseFloat(getComputedStyle(document.documentElement).fontSize)
        place(self)
      }

      ScrollTrigger.create({ start: 0, end: 'max', onUpdate: place, onRefresh: measure })

      // Headlights are on through the night and go off as dawn breaks over the last stretch.
      gsap.to(q('.bus__beam'), {
        opacity: 0,
        ease: 'none',
        scrollTrigger: { start: () => ScrollTrigger.maxScroll(window) * 0.72, end: 'max', scrub: true },
      })

      withMotion(() => {
        gsap.from(q('.road__arrival'), { x: () => -bus.offsetWidth * 1.4, duration: 1.8, ease: 'power3.out' })
        gsap.from(wheels, { rotation: -900, duration: 1.8, ease: 'power3.out' })
      })
    },
    { scope: road },
  )

  return (
    <nav ref={road} className="road" aria-label="Sections">
      <div className="road__lane">
        <div className="road__dashes" />
      </div>
      <div className="road__track">
        {stops.map((stop, index) => (
          <a
            key={stop.id}
            className="road__stop"
            href={`#${stop.id}`}
            style={{ left: `${(index / (stops.length - 1)) * 100}%` }}
            aria-current={index === active ? 'location' : undefined}
            onClick={(event) => {
              event.preventDefault()
              scrollToElement(stop.id)
            }}
          >
            <span className="road__stone">{stop.label}</span>
          </a>
        ))}
        <div className="road__bus">
          <div className="road__arrival">
            <Bus />
          </div>
        </div>
      </div>
    </nav>
  )
}
