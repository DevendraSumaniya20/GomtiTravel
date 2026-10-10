import type { ReactNode } from 'react'
import './Section.css'

type SectionProps = {
  id: string
  title: string
  /** One or two sentences under the title. */
  lede?: string
  /** A dark band flips paper and ink for everything inside it. */
  tone?: 'light' | 'dark'
  children: ReactNode
}

/** A page section: a large serif title, an indented lede, then the content. */
export function Section({ id, title, lede, tone = 'light', children }: SectionProps) {
  return (
    <section id={id} className={tone === 'dark' ? 'section section--dark' : 'section'}>
      <div className="section__inner">
        <h2 className="section__title">{title}</h2>
        {lede && <p className="section__lede">{lede}</p>}
        {children}
      </div>
    </section>
  )
}
