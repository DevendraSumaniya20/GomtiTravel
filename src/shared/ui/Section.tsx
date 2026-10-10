import type { ReactNode } from 'react'
import './Section.css'

type SectionProps = {
  id: string
  title: string
  children: ReactNode
}

/** A full-height page section whose title sits on a green highway signboard so it reads on every sky. */
export function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className="section">
      <h2 className="section__board">{title}</h2>
      {children}
    </section>
  )
}
