import { useRef, useState, type MouseEvent } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../shared/motion/gsap.ts'
import { scrollToElement } from '../shared/motion/smoothScroll.ts'
import './SiteNav.css'

type SiteNavProps = {
  brand: string
  /** The section the name links back to. */
  homeId: string
  links: readonly { id: string; label: string }[]
  /** The link drawn as a button. */
  actionId: string
}

/**
 * The bar along the top: the name and the section links. Each link keeps its `href`, so it works without JavaScript;
 * with it the page scrolls smoothly, the link of the section being read is marked, and a hairline shows how far down the page is.
 */
export function SiteNav({ brand, homeId, links, actionId }: SiteNavProps) {
  const nav = useRef<HTMLElement>(null)
  const [current, setCurrent] = useState('')

  useGSAP(
    () => {
      for (const { id } of links) {
        ScrollTrigger.create({
          // by element: a selector here would be looked up inside the nav, which is this hook's scope
          trigger: document.getElementById(id),
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => setCurrent((was) => (self.isActive ? id : was === id ? '' : was)),
        })
      }
      gsap.to('.site-nav__progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: true } })
    },
    { scope: nav, dependencies: [links] },
  )

  const go = (id: string) => (event: MouseEvent) => {
    event.preventDefault()
    scrollToElement(id)
  }

  return (
    <header ref={nav} className="site-nav">
      <span className="site-nav__progress" aria-hidden="true" />
      <a className="site-nav__brand" href={`#${homeId}`} onClick={go(homeId)}>
        {brand}
      </a>
      <nav aria-label="Sections">
        {links.map((link) => (
          <a
            key={link.id}
            className={link.id === actionId ? 'btn' : undefined}
            href={`#${link.id}`}
            aria-current={current === link.id ? 'location' : undefined}
            onClick={go(link.id)}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
