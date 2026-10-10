import { useState, type FormEvent } from 'react'
import { moveUp, upsert, type Field } from '../lib/records.ts'
import './RecordEditor.css'

const NEW = 'new'

type RecordEditorProps<T extends { id: string }, V extends Record<string, string>> = {
  /** Singular and lower case, e.g. "route". */
  noun: string
  items: readonly T[]
  fields: readonly Field[]
  /** One line that names the item in the list. */
  describe: (item: T) => string
  toValues: (item: T) => V
  fromValues: (values: V, id: string) => T
  onChange: (items: readonly T[]) => void
}

function control(field: Field, value: string) {
  const { name, type = 'text', options = [], min, max } = field
  if (type === 'checkbox') return <input name={name} type="checkbox" defaultChecked={value === 'on'} />
  if (type === 'textarea') return <textarea name={name} rows={4} defaultValue={value} required />
  if (type === 'select') {
    // A value that is no longer offered stays selectable, so saving does not change it silently.
    const choices = !value || options.includes(value) ? options : [value, ...options]
    return (
      <select name={name} defaultValue={value} required>
        {choices.map((choice) => (
          <option key={choice}>{choice}</option>
        ))}
      </select>
    )
  }
  return <input name={name} type={type} min={min} max={max} defaultValue={value} required />
}

/** A list of records with a form to add, edit, reorder and delete them. */
export function RecordEditor<T extends { id: string }, V extends Record<string, string>>({
  noun,
  items,
  fields,
  describe,
  toValues,
  fromValues,
  onChange,
}: RecordEditorProps<T, V>) {
  // The id being edited, NEW for a blank form, or null when the form is closed.
  const [editing, setEditing] = useState<string | null>(null)
  const current = items.find((item) => item.id === editing)
  const values: Record<string, string> = current ? toValues(current) : {}

  const save = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const submitted = Object.fromEntries(new FormData(event.currentTarget)) as V
    onChange(upsert(items, fromValues(submitted, current?.id ?? crypto.randomUUID())))
    setEditing(null)
  }

  const remove = (item: T) => {
    if (window.confirm(`Delete ${describe(item)}?`)) onChange(items.filter((other) => other.id !== item.id))
  }

  return (
    <div className="record-editor">
      {items.length === 0 && <p>Nothing here yet.</p>}
      <ul>
        {items.map((item, index) => (
          <li key={item.id} className="record-editor__row">
            <span>{describe(item)}</span>
            <span className="record-editor__actions">
              {index > 0 && (
                <button className="link" onClick={() => onChange(moveUp(items, item.id))} aria-label={`Move ${describe(item)} up`}>
                  Move up
                </button>
              )}
              <button className="link" onClick={() => setEditing(item.id)} aria-label={`Edit ${describe(item)}`}>
                Edit
              </button>
              <button className="link" onClick={() => remove(item)} aria-label={`Delete ${describe(item)}`}>
                Delete
              </button>
            </span>
          </li>
        ))}
      </ul>
      {editing === NEW || current ? (
        <form key={editing} className="record-editor__form" onSubmit={save}>
          {fields.map((field) => (
            <label key={field.name} className={field.type === 'checkbox' ? 'record-editor__check' : undefined}>
              {field.label}
              {control(field, values[field.name] ?? '')}
            </label>
          ))}
          <div className="record-editor__actions">
            <button className="btn">Save {noun}</button>
            <button type="button" className="link" onClick={() => setEditing(null)}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button className="btn" onClick={() => setEditing(NEW)}>
          Add {noun}
        </button>
      )}
    </div>
  )
}
