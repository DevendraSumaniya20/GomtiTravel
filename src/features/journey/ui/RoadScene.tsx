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
/** The same for the road surface, which is nearest and so slides furthest. RoadScene.css widens the centre line by this much. */
const ROAD_PAN = 0.3
/** And for the far layers, which barely move. */
const STARS_PAN = 0.03
const ORB_PAN = 0.05
/** The sun is fully up by this share of the scene's crossing. */
const SUNRISE_END = 0.5
/** The most the body squats on its rear springs, in degrees, at this scroll speed in px per second. */
const MAX_PITCH = 0.8
const PITCH_SPEED = 3000

type RoadSceneProps = {
  /** Dusk has the moon, stars and headlights; dawn has the sun. */
  time: 'dusk' | 'dawn'
  /** Plays the coach driving in once, when the page loads. */
  arrive?: boolean
}

/**
 * The coast road out of Dwarka with the coach on it. It fills its parent, which sets the height.
 * Scrolling drives the coach, and it only ever drives forward: scrolled down or back up, it crosses
 * the scene left to right and leaves by the right edge, the wheels turning by the distance covered
 * and the body riding on its springs.
 */
export function RoadScene({ time, arrive = false }: RoadSceneProps) {
  const scene = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(scene)
      const root = scene.current
      const bus = q<HTMLElement>('.road-scene__bus')[0]
      const orb = q<HTMLElement>('.road-scene__orb')[0]
      if (!root || !bus || !orb) return
      const chassis = q('.bus__chassis')
      const wheels = q('.bus__wheel')
      const setX = gsap.quickSetter(bus, 'x', 'px')
      const setSpin = gsap.quickSetter(wheels, 'rotation', 'deg')
      const setBounce = gsap.quickSetter(chassis, 'y', 'px')
      const setRoadside = gsap.quickSetter(q('.roadside'), 'x', 'px')
      const setDashes = gsap.quickSetter(q('.road-scene__dashes'), 'x', 'px')
      const setStars = gsap.quickSetter(q('.road-scene__stars'), 'x', 'px')
      const setOrbX = gsap.quickSetter(orb, 'x', 'px')
      const setOrbY = gsap.quickSetter(orb, 'y', 'px')
      gsap.set(wheels, { transformOrigin: '50% 50%' })
      gsap.set(chassis, { transformOrigin: '50% 100%' })
      const pitch = gsap.quickTo(chassis, 'rotation', { duration: 0.6, ease: 'power2.out' })
      // The lean follows scroll speed, not position, so it is left out under reduced motion.
      let lean = false
      withMotion(() => {
        lean = true
      })

      let from = 0
      let to = 0
      let wheelTurn = 1
      let sunrise = 0
      // Crossings of the scene driven so far: scrolling either way adds to it, and the fraction is where the coach is now.
      const journey = { laps: 0 }
      let lastProgress = 0
      let scrolledDown = true
      let settling: gsap.core.Tween | undefined

      const drawCoach = () => {
        // Both ends of a crossing are off screen, so starting the next one from the left is not seen.
        const driven = (to - from) * journey.laps
        setX(from + (to - from) * (journey.laps % 1))
        setSpin((driven / wheelTurn) * 360)
        setBounce(Math.sin(driven / 34) * 1.6)
      }

      const place = (self: ScrollTrigger) => {
        const width = root.clientWidth
        settling?.kill()
        if (self.progress !== lastProgress) scrolledDown = self.progress > lastProgress
        journey.laps += Math.abs(self.progress - lastProgress)
        lastProgress = self.progress
        drawCoach()
        setRoadside(-width * PARALLAX * self.progress)
        setDashes(-width * ROAD_PAN * self.progress)
        setStars(-width * STARS_PAN * self.progress)
        setOrbX(-width * ORB_PAN * self.progress)
        setOrbY(sunrise * Math.max(0, 1 - self.progress / SUNRISE_END))
      }

      // Coming into view from above or from below, the coach starts at the left edge and is centred when the scene is.
      const enter = (self: ScrollTrigger, back = false) => {
        lastProgress = self.progress
        scrolledDown = !back
        journey.laps = back ? 1 - self.progress : self.progress
        place(self)
      }

      // The coach starts just off the left edge, and halfway through its body is centred in the scene.
      const measure = (self: ScrollTrigger) => {
        const centred = root.clientWidth / 2 - bus.offsetWidth * BODY_CENTRE
        from = -bus.offsetWidth
        to = 2 * centred - from
        wheelTurn = 2 * Math.PI * bus.offsetWidth * WHEEL_RATIO
        sunrise = time === 'dawn' ? orb.offsetHeight : 0
        enter(self)
      }

      // It drives forward whichever way the page is scrolled, so it squats on its rear springs by speed alone.
      const drive = (self: ScrollTrigger) => {
        place(self)
        if (lean) pitch(-Math.min(1, Math.abs(self.getVelocity()) / PITCH_SPEED) * MAX_PITCH)
      }

      const trigger = ScrollTrigger.create({
        trigger: root,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: drive,
        onRefresh: measure,
        onEnter: (self) => enter(self),
        onEnterBack: (self) => enter(self, true),
      })

      // Changing direction part way leaves the coach away from where this scroll position puts it.
      // Once the scrolling stops it drives on, round by the right edge if it must, to that place.
      const settle = () => {
        pitch(0)
        if (!lean || !trigger.isActive) return
        const place = scrolledDown ? lastProgress : 1 - lastProgress
        const ahead = (((place - journey.laps) % 1) + 1) % 1
        if (ahead < 0.01 || ahead > 0.99) return
        settling = gsap.to(journey, { laps: journey.laps + ahead, duration: 0.6 + 1.2 * ahead, ease: 'power2.inOut', onUpdate: drawCoach })
      }
      ScrollTrigger.addEventListener('scrollEnd', settle)

      if (arrive) {
        withMotion(() => {
          gsap.from(q('.road-scene__arrival'), { x: () => -root.clientWidth, duration: 2.4, ease: 'power3.out' })
          gsap.from(wheels, { rotation: '-=1400', duration: 2.4, ease: 'power3.out' })
        })
      }

      return () => ScrollTrigger.removeEventListener('scrollEnd', settle)
    },
    { scope: scene, dependencies: [time, arrive] },
  )

  return (
    <div ref={scene} className={`road-scene road-scene--${time}`} aria-hidden="true">
      <div className="road-scene__stars" />
      <div className="road-scene__orb" />
      <div className="road-scene__sea" />
      <Roadside />
      <div className="road-scene__road">
        <div className="road-scene__dashes" />
      </div>
      <div className="road-scene__bus">
        <div className="road-scene__arrival">
          <Bus />
        </div>
      </div>
    </div>
  )
}
