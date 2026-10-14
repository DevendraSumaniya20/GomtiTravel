import { readFile } from 'node:fs/promises'
import mysql, { type RowDataPacket } from 'mysql2/promise'
import type { ContactDetails, Enquiry } from '../src/features/contact/model/contact.ts'
import type { NewEnquiry } from './validate.ts'

/** The statements of a SQL file, without `--` comments, which may themselves contain `;`. */
export function statements(sql: string): string[] {
  return sql
    .replace(/--.*$/gm, '')
    .split(';')
    .map((statement) => statement.trim())
    .filter(Boolean)
}

/** Opens a connection pool from DATABASE_URL and creates the tables if they are missing. */
export async function connect(url: string) {
  // timezone Z: DATETIME values are written and read as UTC
  const pool = mysql.createPool({ uri: url, connectionLimit: 5, timezone: 'Z' })
  const schema = await readFile(new URL('./schema.sql', import.meta.url), 'utf8')
  for (const statement of statements(schema)) await pool.query(statement)

  return {
    pool,

    async contact(): Promise<ContactDetails | null> {
      const [rows] = await pool.query<RowDataPacket[]>('SELECT owner, phones, email, address FROM contact WHERE id = 1')
      return (rows[0] as ContactDetails | undefined) ?? null
    },

    async saveContact({ owner, phones, email, address }: ContactDetails) {
      await pool.execute(
        `INSERT INTO contact (id, owner, phones, email, address) VALUES (1, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE owner = VALUES(owner), phones = VALUES(phones), email = VALUES(email), address = VALUES(address)`,
        [owner, JSON.stringify(phones), email, address],
      )
    },

    // shortcut: the newest 200 only, no paging; add a cursor on created_at when the inbox outgrows it
    async enquiries(): Promise<Enquiry[]> {
      const [rows] = await pool.query<RowDataPacket[]>(
        `SELECT id, name, phone, service, DATE_FORMAT(travel_date, '%Y-%m-%d') AS date, message, created_at AS createdAt
         FROM enquiries ORDER BY created_at DESC LIMIT 200`,
      )
      return rows.map((row) => ({ ...(row as Enquiry), createdAt: (row.createdAt as Date).toISOString() }))
    },

    async addEnquiry(enquiry: NewEnquiry, id: string, createdAt: Date) {
      await pool.execute(
        'INSERT INTO enquiries (id, name, phone, service, travel_date, message, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [id, enquiry.name, enquiry.phone, enquiry.service, enquiry.date, enquiry.message, createdAt],
      )
    },

    async removeEnquiry(id: string) {
      await pool.execute('DELETE FROM enquiries WHERE id = ?', [id])
    },
  }
}
