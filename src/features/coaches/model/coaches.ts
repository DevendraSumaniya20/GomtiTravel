export type Coach = {
  id: string
  name: string
  /** Seats on each side of the aisle, e.g. [2, 1]. */
  layout: readonly [left: number, right: number]
  /** Rows drawn in the seat map. */
  rows: number
  capacity: string
  notes: readonly string[]
}

// Sample fleet; replace with the operator's real coaches.
export const COACHES: readonly Coach[] = [
  {
    id: 'ac-sleeper',
    name: 'AC Sleeper',
    layout: [2, 1],
    rows: 5,
    capacity: '30 berths, upper and lower',
    notes: ['Flat berth with curtain', 'Blanket and pillow', 'Reading light and charging point at every berth'],
  },
  {
    id: 'ac-seater',
    name: 'AC Seater',
    layout: [2, 2],
    rows: 7,
    capacity: '45 pushback seats',
    notes: ['Reclining seat with calf rest', 'Charging point for every pair', 'Overhead luggage rack'],
  },
  {
    id: 'seater',
    name: 'Seater',
    layout: [2, 2],
    rows: 7,
    capacity: '49 seats, non-AC',
    notes: ['Sliding windows', 'Lowest fare on short day routes', 'Luggage hold below'],
  },
]

export type SeatRow = {
  number: number
  left: readonly string[]
  right: readonly string[]
}

/** Seat labels row by row, lettered across the coach: row 1 of a 2+1 layout is 1A 1B | 1C. */
export function seatRows(layout: Coach['layout'], rows: number): SeatRow[] {
  const [left, right] = layout
  const label = (row: number, seat: number) => `${row}${String.fromCharCode(65 + seat)}`
  return Array.from({ length: rows }, (_, index) => {
    const number = index + 1
    return {
      number,
      left: Array.from({ length: left }, (_, seat) => label(number, seat)),
      right: Array.from({ length: right }, (_, seat) => label(number, left + seat)),
    }
  })
}
