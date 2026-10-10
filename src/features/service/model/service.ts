import type { Field } from '../../../shared/lib/records.ts'

export type Amenity = {
  id: string
  title: string
  text: string
}

export type BoardingPoint = {
  id: string
  place: string
  /** When the bus reaches this point, relative to the first pickup. */
  pickup: string
}

// Sample service details; replace with what the operator really provides.
export const AMENITIES: readonly Amenity[] = [
  { id: 'water', title: 'A water bottle at your seat', text: 'One sealed bottle per passenger on every departure.' },
  { id: 'drivers', title: 'Two drivers on overnight runs', text: 'Drivers swap at the halfway halt on any route longer than six hours.' },
  { id: 'meal', title: 'One meal halt, announced', text: 'A 25 minute stop at a highway restaurant with clean toilets. The conductor tells you before the bus leaves.' },
  { id: 'luggage', title: 'Luggage tagged to your ticket', text: 'Two bags per passenger in the hold, tagged at boarding and matched when you get down.' },
  { id: 'women', title: 'Seats kept for women', text: 'On request, single women travellers are seated next to women.' },
]

// Real places in Dwarka. The order and the gaps are illustrative; confirm them with the operator.
export const BOARDING_POINTS: readonly BoardingPoint[] = [
  { id: 'st-stand', place: 'Dwarka ST Bus Stand', pickup: 'First pickup' },
  { id: 'teen-batti', place: 'Teen Batti Chowk', pickup: '10 min later' },
  { id: 'iskcon-gate', place: 'ISKCON Gate', pickup: '20 min later' },
  { id: 'railway-station', place: 'Dwarka Railway Station', pickup: '30 min later' },
]

export const BOOKING_STEPS: readonly string[] = [
  'Pick a route and a date, and send the seat request.',
  'We call you back to confirm the seat numbers and the fare.',
  'Reach your boarding point 15 minutes early and show the SMS.',
]

export const AMENITY_FIELDS: readonly Field[] = [
  { name: 'title', label: 'Title' },
  { name: 'text', label: 'Details', type: 'textarea' },
]

export const BOARDING_FIELDS: readonly Field[] = [
  { name: 'place', label: 'Place' },
  { name: 'pickup', label: 'Pickup time, relative to the first stop' },
]
