import { useEffect, useState } from 'react'
import { loadEnquiries } from '../features/contact/api/contactGateway.ts'
import { chime, unlockChime } from '../shared/lib/chime.ts'
import { alertsPermission, askForAlerts, notify } from '../shared/lib/notify.ts'

const TITLE = document.title

/**
 * Keeps the admin inbox fresh while signed in and announces new enquiries: a chime, a system
 * notification when the tab is in the background, and a count in the tab title until it is opened.
 */
export function useEnquiryAlerts(signedIn: boolean, onFailure: (failure: unknown) => void) {
  const [newIds, setNewIds] = useState<ReadonlySet<string>>(new Set())
  const [unseen, setUnseen] = useState(0)
  const [alerts, setAlerts] = useState(alertsPermission)

  useEffect(() => {
    if (!signedIn) return
    const load = () =>
      loadEnquiries().then((arrived) => {
        if (arrived.length === 0) return
        chime()
        setNewIds((ids) => new Set([...ids, ...arrived.map((enquiry) => enquiry.id)]))
        if (document.hasFocus()) return
        setUnseen((count) => count + arrived.length)
        const [first] = arrived
        notify(
          arrived.length === 1 ? 'New enquiry' : `${arrived.length} new enquiries`,
          arrived.length === 1 && first ? `${first.name}, ${first.service}, ${first.date}` : arrived.map((enquiry) => enquiry.name).join(', '),
        )
      }, onFailure)
    const onFocus = () => {
      setUnseen(0)
      load()
    }
    load()
    // shortcut: polls every 20 seconds; push from the server (SSE) if many admins keep the page open
    const poll = window.setInterval(load, 20_000)
    window.addEventListener('focus', onFocus)
    window.addEventListener('pointerdown', unlockChime, { once: true })
    return () => {
      window.clearInterval(poll)
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('pointerdown', unlockChime)
    }
  }, [signedIn, onFailure])

  useEffect(() => {
    document.title = (unseen > 0 ? `(${unseen} new) ` : '') + TITLE
  }, [unseen])

  const turnOnAlerts = () => askForAlerts().then(setAlerts)

  return { newIds, alerts, turnOnAlerts }
}
