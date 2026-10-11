export const ORIGIN = 'Dwarka'

export type Service = {
  id: string
  icon: 'bus' | 'temple' | 'car' | 'train' | 'plane'
  title: string
  text: string
  /** Destinations, stops or vehicles, shown as tags. */
  items: readonly string[]
}

// What the shop's signboard offers, plus bike rental and Gandhinagar, which the owner added.
// It names no fares or timings, so none are given here: do not add any that the owner has not supplied.
export const SERVICES: readonly Service[] = [
  {
    id: 'bus',
    icon: 'bus',
    title: 'Daily sleeper bus',
    text: `A/C and non-A/C sleeper buses leave ${ORIGIN} every day. We book your berth.`,
    items: ['Ahmedabad', 'Vadodara', 'Gandhinagar', 'Surat'],
  },
  {
    id: 'dwarka-darshan',
    icon: 'temple',
    title: 'Dwarka Darshan',
    text: `A day around the temples of ${ORIGIN} and the places near it, by daily service bus or by taxi.`,
    items: ['Dwarkadhish Temple', 'Nageshwar', 'Bet Dwarka'],
  },
  {
    id: 'somnath-darshan',
    icon: 'temple',
    title: 'Somnath Darshan',
    text: `The coast road from ${ORIGIN} to Somnath, with darshan on the way.`,
    items: ['Harshad Mata', 'Somnath'],
  },
  {
    id: 'rental',
    icon: 'car',
    title: 'Car and bike on rent',
    text: 'A taxi with a driver for the day or the trip, or a car or bike to take yourself.',
    items: ['Taxi', 'Car', 'Bike'],
  },
  {
    id: 'train',
    icon: 'train',
    title: 'Train booking',
    text: 'Tell us the journey and the date and we book the train tickets for you.',
    items: [],
  },
  {
    id: 'flight',
    icon: 'plane',
    title: 'Flight booking',
    text: 'Flight tickets booked at the desk, for you or the whole family.',
    items: [],
  },
]
