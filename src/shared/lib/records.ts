/** One input of an admin form. Values travel as the strings a form submits; a ticked checkbox is `'on'`. */
export type Field = {
  name: string
  label: string
  type?: 'text' | 'number' | 'time' | 'checkbox' | 'textarea' | 'select'
  /** Choices for a `select`. */
  options?: readonly string[]
  min?: number
  max?: number
}

type Identified = { id: string }

/** Replaces the item with the same id, or appends it. */
export function upsert<T extends Identified>(items: readonly T[], item: T): T[] {
  return items.some((existing) => existing.id === item.id)
    ? items.map((existing) => (existing.id === item.id ? item : existing))
    : [...items, item]
}

/** Swaps the item with the one before it; the first item stays put. */
export function moveUp<T extends Identified>(items: readonly T[], id: string): T[] {
  const next = [...items]
  const index = next.findIndex((item) => item.id === id)
  if (index > 0) [next[index - 1], next[index]] = [next[index]!, next[index - 1]!]
  return next
}
