export type Stop = {
  /** Also the id of the page section. */
  id: string
  label: string
}

export const STOPS = [
  { id: 'start', label: 'Start' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
] as const satisfies readonly Stop[]

export type StopId = (typeof STOPS)[number]['id']
