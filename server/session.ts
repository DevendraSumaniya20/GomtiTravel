import { createHash, createHmac, timingSafeEqual } from 'node:crypto'

const DAY = 24 * 60 * 60 * 1000

const sign = (secret: string, value: string) => createHmac('sha256', secret).update(value).digest('base64url')
const digest = (value: string) => createHash('sha256').update(value).digest()

/** Compares two secrets in constant time, whatever their lengths. */
export function sameSecret(given: string, expected: string): boolean {
  return timingSafeEqual(digest(given), digest(expected))
}

/** The admin's cookie value: when it expires, and a signature over that. */
export function signSession(secret: string, now = Date.now()): string {
  const expires = String(now + DAY)
  return `${expires}.${sign(secret, expires)}`
}

export function verifySession(token: string | undefined, secret: string, now = Date.now()): boolean {
  const [expires = '', signature = ''] = (token ?? '').split('.')
  return Number(expires) > now && sameSecret(signature, sign(secret, expires))
}

/** One cookie's value from a `Cookie` header. */
export function readCookie(header: string | undefined, name: string): string | undefined {
  const pair = (header ?? '').split(/;\s*/).find((part) => part.startsWith(`${name}=`))
  return pair?.slice(name.length + 1)
}
