import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { test } from 'node:test'
import { statements } from './db.ts'

test('statements drops comments, even ones holding a semicolon', () => {
  assert.deepEqual(statements('-- a; b\nSELECT 1;\n-- c\nSELECT 2; '), ['SELECT 1', 'SELECT 2'])
})

test('the schema splits into its two CREATE TABLE statements', async () => {
  const sql = await readFile(new URL('./schema.sql', import.meta.url), 'utf8')
  assert.deepEqual(statements(sql).map((statement) => statement.split('(')[0]?.trim()), [
    'CREATE TABLE IF NOT EXISTS contact',
    'CREATE TABLE IF NOT EXISTS enquiries',
  ])
})
