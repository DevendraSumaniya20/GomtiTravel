export type Stop = {
  /** Also the id of the page section. */
  id: string
  label: string
}

export const STOPS = [
  { id: 'start', label: 'Start' },
  { id: 'routes', label: 'Routes' },
  { id: 'fleet', label: 'Coaches' },
  { id: 'onboard', label: 'On board' },
  { id: 'boarding', label: 'Boarding' },
  { id: 'book', label: 'Book' },
  { id: 'contact', label: 'Contact' },
] as const satisfies readonly Stop[]

export type StopId = (typeof STOPS)[number]['id']
