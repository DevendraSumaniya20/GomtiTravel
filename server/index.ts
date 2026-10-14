import { randomUUID } from 'node:crypto'
import { setTimeout as wait } from 'node:timers/promises'
import { fileURLToPath } from 'node:url'
import express, { type NextFunction, type Request, type Response } from 'express'
import { CONTACT } from '../src/features/contact/model/contact.ts'
import { connect } from './db.ts'
import { readCookie, sameSecret, signSession, verifySession } from './session.ts'
import { validateContact, validateEnquiry } from './validate.ts'

const { DATABASE_URL, ADMIN_PASSWORD, SESSION_SECRET, PORT = '3001', NODE_ENV } = process.env
if (!DATABASE_URL || !ADMIN_PASSWORD || !SESSION_SECRET || SESSION_SECRET.length < 32) {
  throw new Error('Set DATABASE_URL, ADMIN_PASSWORD and SESSION_SECRET (32 characters or more) in .env; see .env.example')
}

const db = await connect(DATABASE_URL)
const app = express()
const COOKIE = 'admin'
const cookieOptions = { httpOnly: true, sameSite: 'strict', secure: NODE_ENV === 'production', path: '/api' } as const

app.use(express.json({ limit: '10kb' }))

const signedIn = (request: Request) => verifySession(readCookie(request.headers.cookie, COOKIE), SESSION_SECRET)

function adminOnly(request: Request, response: Response, next: NextFunction) {
  if (signedIn(request)) next()
  else response.sendStatus(401)
}

app.post('/api/session', async (request, response) => {
  const password: unknown = request.body?.password
  if (typeof password !== 'string' || !sameSecret(password, ADMIN_PASSWORD)) {
    // shortcut: a one second delay slows guessing from one client only; add a rate limiter before going public
    await wait(1000)
    response.sendStatus(401)
    return
  }
  response.cookie(COOKIE, signSession(SESSION_SECRET), { ...cookieOptions, maxAge: 24 * 60 * 60 * 1000 }).sendStatus(204)
})

app.get('/api/session', (request, response) => {
  response.sendStatus(signedIn(request) ? 204 : 401)
})

app.delete('/api/session', (_request, response) => {
  response.clearCookie(COOKIE, cookieOptions).sendStatus(204)
})

// Until the owner saves, the site shows the signboard's details.
app.get('/api/contact', async (_request, response) => {
  response.json((await db.contact()) ?? CONTACT)
})

app.put('/api/contact', adminOnly, async (request, response) => {
  const contact = validateContact(request.body)
  if (!contact) {
    response.sendStatus(400)
    return
  }
  await db.saveContact(contact)
  response.json(contact)
})

// shortcut: anyone can post enquiries without a limit; add a rate limit or captcha before going public
app.post('/api/enquiries', async (request, response) => {
  const enquiry = validateEnquiry(request.body)
  if (!enquiry) {
    response.sendStatus(400)
    return
  }
  const id = randomUUID()
  const createdAt = new Date()
  await db.addEnquiry(enquiry, id, createdAt)
  response.status(201).json({ ...enquiry, id, createdAt: createdAt.toISOString() })
})

app.get('/api/enquiries', adminOnly, async (_request, response) => {
  response.json(await db.enquiries())
})

app.delete('/api/enquiries/:id', adminOnly, async (request, response) => {
  await db.removeEnquiry(String(request.params.id))
  response.sendStatus(204)
})

// The built site, so the pages and the API share one origin and the admin cookie stays first-party.
app.use(express.static(fileURLToPath(new URL('../dist', import.meta.url))))

app.use((error: unknown, _request: Request, response: Response, _next: NextFunction) => {
  console.error(error)
  response.sendStatus(500)
})

app.listen(Number(PORT), () => console.log(`API on http://localhost:${PORT}`))
