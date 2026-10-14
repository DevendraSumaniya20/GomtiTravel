export type Alerts = NotificationPermission | 'unsupported'

/** Whether this browser may show system notifications: 'default' means not asked yet. */
export const alertsPermission = (): Alerts => (typeof Notification === 'undefined' ? 'unsupported' : Notification.permission)

/** Asks the browser for permission; it must be called from a click. */
export const askForAlerts = (): Promise<Alerts> =>
  typeof Notification === 'undefined' ? Promise.resolve('unsupported') : Notification.requestPermission()

/** A system notification that brings this tab forward when clicked. Does nothing without permission. */
export function notify(title: string, body: string) {
  if (alertsPermission() !== 'granted') return
  // one tag, so a burst of enquiries replaces the last notification instead of stacking
  const notification = new Notification(title, { body, tag: 'gomti-enquiry' })
  notification.onclick = () => {
    window.focus()
    notification.close()
  }
}
