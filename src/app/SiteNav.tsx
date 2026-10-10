import type { MouseEvent } from 'react'
import { scrollToElement } from '../shared/motion/smoothScroll.ts'
import './SiteNav.css'

type SiteNavProps = {
  links: readonly { id: string; label: string }[]
}

/** Section links along the top. Each keeps its `href`, so it works without JavaScript; with it the page scrolls smoothly. */
export function SiteNav({ links }: SiteNavProps) {
  const go = (id: string) => (event: MouseEvent) => {
    event.preventDefault()
    scrollToElement(id)
  }

  return (
    <nav className="site-nav" aria-label="Sections">
      {links.map((link) => (
        <a key={link.id} href={`#${link.id}`} onClick={go(link.id)}>
          {link.label}
        </a>
      ))}
    </nav>
  )
}
