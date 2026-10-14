import { useState, type FormEvent } from 'react'
import { api, ApiError } from '../shared/lib/api.ts'
import './AdminSignIn.css'

type AdminSignInProps = {
  onSignedIn: () => void
}

/** The admin password form. The server answers with a session cookie. */
export function AdminSignIn({ onSignedIn }: AdminSignInProps) {
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const password = String(new FormData(event.currentTarget).get('password'))
    setSending(true)
    setError('')
    api('session', 'POST', { password })
      .then(onSignedIn, (failure: unknown) =>
        setError(failure instanceof ApiError && failure.status === 401 ? 'Wrong password.' : 'The server could not be reached.'),
      )
      .finally(() => setSending(false))
  }

  return (
    <form className="admin-sign-in sheet pane" onSubmit={submit}>
      <h2>Sign in</h2>
      <label>
        Admin password
        <input name="password" type="password" autoComplete="current-password" required />
      </label>
      <button className="btn" disabled={sending}>
        Sign in
      </button>
      <p role="status">{error}</p>
    </form>
  )
}
