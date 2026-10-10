import { useRef } from 'react'
import { gsap, useGSAP } from '../../../shared/motion/gsap.ts'
import { Roadside } from './Roadside.tsx'
import './Scenery.css'

const LAND = 'M0 200V150Q150 110 300 140T600 130T900 150T1200 125V200Z'

/**
 * Fixed backdrop of the Dwarka coast. Scrolling is the overnight run: the sky goes from dusk
 * through night to dawn, the moon crosses, the sun comes up, and the roadside slides past.
 */
export function Scenery() {
  const scenery = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const roadside = scenery.current!.querySelector<SVGElement>('.roadside')!
      gsap
        .timeline({
          defaults: { ease: 'none', duration: 1 },
          scrollTrigger: { start: 0, end: 'max', scrub: true, invalidateOnRefresh: true },
        })
        .to('.scenery__sky--night', { opacity: 1 }, 0)
        .to('.scenery__sky--dawn', { opacity: 1 }, 2)
        .to('.scenery__stars', { opacity: 1, duration: 0.8 }, 0.3)
        .to('.scenery__stars, .scenery__moon', { opacity: 0, duration: 0.6 }, 2)
        .to('.scenery__moon', { x: '-58vw', duration: 2.6 }, 0)
        .to('.scenery__moon', { y: '-30vh', duration: 1.3, ease: 'sine.out' }, 0)
        .to('.scenery__moon', { y: 0, duration: 1.3, ease: 'sine.in' }, 1.3)
        .to('.scenery__sun', { y: '-34vh', duration: 0.9, ease: 'sine.out' }, 2.1)
        .to('.scenery__land', { xPercent: -40, duration: 3 }, 0)
        // the roadside is wider than the screen; by the last stop its far end has arrived
        .to(roadside, { x: () => Math.min(0, window.innerWidth - roadside.getBoundingClientRect().width), duration: 3 }, 0)
    },
    { scope: scenery },
  )

  return (
    <div ref={scenery} className="scenery" aria-hidden="true">
      <div className="scenery__sky scenery__sky--dusk" />
      <div className="scenery__sky scenery__sky--night" />
      <div className="scenery__sky scenery__sky--dawn" />
      <div className="scenery__stars" />
      <div className="scenery__moon" />
      <div className="scenery__sun" />
      <div className="scenery__sea" />
      <svg className="scenery__land" viewBox="0 0 1200 200" preserveAspectRatio="none">
        <path d={LAND} />
      </svg>
      <Roadside />
    </div>
  )
}
