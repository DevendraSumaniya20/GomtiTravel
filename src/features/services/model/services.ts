export const ORIGIN = 'Dwarka'

/** A free-licence stock photo. The licences ask for the author, the licence and the source to be named. */
export type Photo = {
  /** File name under `public/services/`. */
  file: string
  alt: string
  author: string
  licence: string
  licenceUrl: string
  /** The photo's page on Wikimedia Commons. */
  source: string
}

export type Service = {
  id: string
  title: string
  text: string
  /** Destinations, stops or vehicles, shown as tags. */
  items: readonly string[]
  photo: Photo
}

const BY_SA_4 = { licence: 'CC BY-SA 4.0', licenceUrl: 'https://creativecommons.org/licenses/by-sa/4.0' }
const commons = (id: number) => `https://commons.wikimedia.org/w/index.php?curid=${id}`

// What the shop's signboard offers, plus bike rental and Gandhinagar, which the owner added.
// It names no fares or timings, so none are given here: do not add any that the owner has not supplied.
// The photos are stock pictures from Wikimedia Commons, not the shop's own vehicles.
export const SERVICES: readonly Service[] = [
  {
    id: 'bus',
    title: 'Daily sleeper bus',
    text: `A/C and non-A/C sleeper buses leave ${ORIGIN} every day. We book your berth.`,
    items: ['Ahmedabad', 'Vadodara', 'Gandhinagar', 'Surat'],
    photo: { file: 'bus.jpg', alt: 'A white multi-axle coach', author: 'Rsrikanth05', ...BY_SA_4, source: commons(46945764) },
  },
  {
    id: 'dwarka-darshan',
    title: 'Dwarka Darshan',
    text: `A day around the temples of ${ORIGIN} and the places near it, by daily service bus or by taxi.`,
    items: ['Dwarkadhish Temple', 'Nageshwar', 'Bet Dwarka'],
    photo: {
      file: 'dwarka-darshan.jpg',
      alt: 'The spire of the Dwarkadhish Temple above the waterfront',
      author: 'Kridha20',
      ...BY_SA_4,
      source: commons(104990495),
    },
  },
  {
    id: 'somnath-darshan',
    title: 'Somnath Darshan',
    text: `The coast road from ${ORIGIN} to Somnath, with darshan on the way.`,
    items: ['Harshad Mata', 'Somnath'],
    photo: { file: 'somnath-darshan.jpg', alt: 'The Somnath temple', author: 'B. SurajPatro1997', ...BY_SA_4, source: commons(139899998) },
  },
  {
    id: 'rental',
    title: 'Car and bike on rent',
    text: 'A taxi with a driver for the day or the trip, or a car or bike to take yourself.',
    items: ['Taxi', 'Car', 'Bike'],
    photo: {
      file: 'rental.jpg',
      alt: 'A silver saloon car',
      author: 'Biswarup Ganguly',
      licence: 'CC BY 3.0',
      licenceUrl: 'https://creativecommons.org/licenses/by/3.0',
      source: commons(65637650),
    },
  },
  {
    id: 'train',
    title: 'Train booking',
    text: 'Tell us the journey and the date and we book the train tickets for you.',
    items: [],
    photo: { file: 'train.jpg', alt: 'An express train at a station platform', author: 'Harshul12345', ...BY_SA_4, source: commons(131350456) },
  },
  {
    id: 'flight',
    title: 'Flight booking',
    text: 'Flight tickets booked at the desk, for you or the whole family.',
    items: [],
    photo: {
      file: 'flight.jpg',
      alt: 'An airliner climbing into a blue sky',
      author: 'Julian Herzog',
      licence: 'CC BY 4.0',
      licenceUrl: 'https://creativecommons.org/licenses/by/4.0',
      source: commons(39235791),
    },
  },
]
