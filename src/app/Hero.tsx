import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP, withMotion } from '../shared/motion/gsap.ts'
import './Hero.css'

type HeroProps = {
  id: string
  /** The operator's name, set across the full width. */
  brand: string
  /** One entry per line of the headline. */
  headline: readonly string[]
  lede: string
  /** The picture behind the words; it fills the hero. */
  scene: ReactNode
}

/** First screen: the name across the top, the road scene behind, and the headline rising line by line. The words drift up and fade as it scrolls out. */
export function Hero({ id, brand, headline, lede, scene }: HeroProps) {
  const hero = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      withMotion(() => {
        gsap.from('.hero__line > span', { yPercent: 110, duration: 1, stagger: 0.09, ease: 'power4.out' })
        // The words leave ahead of the scene as the hero scrolls out, the name slower than the headline.
        const scrollTrigger = { trigger: hero.current, start: 'top top', end: 'bottom top', scrub: true }
        gsap.to('.hero__brand', { yPercent: -35, opacity: 0, ease: 'power1.in', scrollTrigger })
        gsap.to('.hero__words', { yPercent: -70, opacity: 0, ease: 'power1.in', scrollTrigger })
      })
    },
    { scope: hero },
  )

  return (
    <section ref={hero} id={id} className="hero">
      {scene}
      <p className="hero__brand">{brand}</p>
      <div className="hero__words">
        <h1 className="hero__headline">
          {headline.map((line) => (
            <span key={line} className="hero__line">
              <span>{line}</span>
            </span>
          ))}
        </h1>
        <p className="hero__lede">{lede}</p>
      </div>
    </section>
  )
}
