/**
 * bulk-update.js
 *
 * Reads emails.txt (one email per line) and sends a PATCH request to the
 * local clerk-backend for each email to set publicMetadata.roles = ["premium"].
 *
 * Usage:
 *   node bulk-update.js
 *
 * Optionally override the server URL:
 *   BASE_URL=http://localhost:3001 node bulk-update.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3001'
const EMAILS_FILE = path.join(path.dirname(fileURLToPath(import.meta.url)), 'emails.txt')

const PUBLIC_METADATA = { roles: ['premium'] }

async function updateEmail(email) {
  const res = await fetch(`${BASE_URL}/users/by-email/metadata`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, publicMetadata: PUBLIC_METADATA }),
  })

  const json = await res.json()

  if (!res.ok) {
    console.error(`✗ ${email} — ${res.status}: ${json.error ?? JSON.stringify(json)}`)
  } else {
    console.log(`✓ ${email} — updated (id: ${json.id})`)
  }
}

const emails = fs
  .readFileSync(EMAILS_FILE, 'utf8')
  .split('\n')
  .map(line => line.trim())
  .filter(Boolean)   // skip empty lines

if (emails.length === 0) {
  console.error('No emails found in emails.txt')
  process.exit(1)
}

console.log(`Processing ${emails.length} email(s)…\n`)

for (const email of emails) {
  await updateEmail(email)
}
