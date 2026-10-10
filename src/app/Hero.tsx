import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP, withMotion } from '../shared/motion/gsap.ts'
import './Hero.css'

type HeroProps = {
  id: string
  /** One entry per line of the headline. */
  headline: readonly string[]
  lede: string
  children: ReactNode
}

/** First screen: the headline rises line by line as the bus pulls in. */
export function Hero({ id, headline, lede, children }: HeroProps) {
  const hero = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      withMotion(() => {
        gsap.from('.hero__line > span', { yPercent: 110, duration: 1, stagger: 0.09, ease: 'power4.out' })
      })
    },
    { scope: hero },
  )

  return (
    <section ref={hero} id={id} className="hero">
      <h1 className="hero__headline">
        {headline.map((line) => (
          <span key={line} className="hero__line">
            <span>{line}</span>
          </span>
        ))}
      </h1>
      <p className="hero__lede">{lede}</p>
      {children}
    </section>
  )
}
