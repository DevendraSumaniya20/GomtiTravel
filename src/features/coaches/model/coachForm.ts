import type { Field } from '../../../shared/lib/records.ts'
import type { Coach } from './coaches.ts'

export type CoachValues = Record<'name' | 'left' | 'right' | 'rows' | 'capacity' | 'notes', string>

export const COACH_FIELDS: readonly Field[] = [
  { name: 'name', label: 'Name' },
  { name: 'capacity', label: 'Capacity, in words' },
  { name: 'left', label: 'Seats left of the aisle', type: 'number', min: 1, max: 3 },
  { name: 'right', label: 'Seats right of the aisle', type: 'number', min: 1, max: 3 },
  { name: 'rows', label: 'Rows drawn in the seat map', type: 'number', min: 1, max: 12 },
  { name: 'notes', label: 'Notes, one per line', type: 'textarea' },
]

export function coachToValues(coach: Coach): CoachValues {
  const [left, right] = coach.layout
  return {
    name: coach.name,
    left: String(left),
    right: String(right),
    rows: String(coach.rows),
    capacity: coach.capacity,
    notes: coach.notes.join('\n'),
  }
}

export function coachFromValues(values: CoachValues, id: string): Coach {
  return {
    id,
    name: values.name.trim(),
    layout: [Number(values.left), Number(values.right)],
    rows: Number(values.rows),
    capacity: values.capacity.trim(),
    notes: values.notes
      .split('\n')
      .map((note) => note.trim())
      .filter(Boolean),
  }
}
