import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP, withMotion } from '../../../shared/motion/gsap.ts'
import { Bus } from './Bus.tsx'
import { Roadside } from './Roadside.tsx'
import './RoadScene.css'

/** Wheel radius as a share of the Bus drawing's width (31 of 1000), to turn the wheels by road covered. */
const WHEEL_RATIO = 31 / 1000
/** Where the middle of the coach body sits in the Bus drawing, as a share of its width. */
const BODY_CENTRE = 0.408
/** How far the roadside slides while the scene crosses the screen, as a share of the scene's width. */
const PARALLAX = 0.18

type RoadSceneProps = {
  /** Dusk has the moon, stars and headlights; dawn has the sun. */
  time: 'dusk' | 'dawn'
  /** Plays the coach driving in once, when the page loads. */
  arrive?: boolean
}

/**
 * The coast road out of Dwarka with the coach on it. It fills its parent, which sets the height.
 * Scrolling drives the coach: it crosses the scene as the scene crosses the screen, the wheels
 * turning by the distance covered and the body riding on its springs.
 */
export function RoadScene({ time, arrive = false }: RoadSceneProps) {
  const scene = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(scene)
      const root = scene.current
      const bus = q<HTMLElement>('.road-scene__bus')[0]
      if (!root || !bus) return
      const wheels = q('.bus__wheel')
      const setX = gsap.quickSetter(bus, 'x', 'px')
      const setSpin = gsap.quickSetter(wheels, 'rotation', 'deg')
      const setBounce = gsap.quickSetter(q('.bus__chassis'), 'y', 'px')
      const setRoadside = gsap.quickSetter(q('.roadside'), 'x', 'px')
      gsap.set(wheels, { transformOrigin: '50% 50%' })

      let from = 0
      let to = 0
      let wheelTurn = 1

      const place = (self: ScrollTrigger) => {
        const x = from + (to - from) * self.progress
        setX(x)
        setSpin((x / wheelTurn) * 360)
        setBounce(Math.sin(x / 34) * 1.6)
        setRoadside(-root.clientWidth * PARALLAX * self.progress)
      }

      // The coach starts just off the left edge, and halfway through its body is centred in the scene.
      const measure = (self: ScrollTrigger) => {
        const centred = root.clientWidth / 2 - bus.offsetWidth * BODY_CENTRE
        from = -bus.offsetWidth
        to = 2 * centred - from
        wheelTurn = 2 * Math.PI * bus.offsetWidth * WHEEL_RATIO
        place(self)
      }

      ScrollTrigger.create({ trigger: root, start: 'top bottom', end: 'bottom top', onUpdate: place, onRefresh: measure })

      if (arrive) {
        withMotion(() => {
          gsap.from(q('.road-scene__arrival'), { x: () => -root.clientWidth, duration: 2.4, ease: 'power3.out' })
          gsap.from(wheels, { rotation: '-=1400', duration: 2.4, ease: 'power3.out' })
        })
      }
    },
    { scope: scene },
  )

  return (
    <div ref={scene} className={`road-scene road-scene--${time}`} aria-hidden="true">
      <div className="road-scene__stars" />
      <div className="road-scene__orb" />
      <div className="road-scene__sea" />
      <Roadside />
      <div className="road-scene__road" />
      <div className="road-scene__bus">
        <div className="road-scene__arrival">
          <Bus />
        </div>
      </div>
    </div>
  )
}
