import 'dotenv/config'

import express from 'express'
import { createClerkClient } from '@clerk/backend'

const app = express()
app.use(express.json())

console.log(process.env.CLERK_SECRET_KEY,'hello')
const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
})

/**
 * Helper — resolve a Clerk userId from an email address.
 * Uses the emailAddress filter supported by getUserList().
 */
async function getUserIdByEmail(email) {
  const { data } = await clerkClient.users.getUserList({
    emailAddress: [email],
  })
  if (!data || data.length === 0) {
    const err = new Error(`No user found with email: ${email}`)
    err.statusCode = 404
    throw err
  }
  return data[0].id
}

/**
 * PATCH /users/by-email/metadata
 *
 * Look up a user by their email address and update their metadata.
 *
 * Body:
 * {
 *   "email": "user@example.com",          ← required
 *   "publicMetadata":  { ... },           ← optional
 *   "privateMetadata": { ... },           ← optional
 *   "unsafeMetadata":  { ... }            ← optional
 * }
 *
 * Example:
 *   curl -X PATCH http://localhost:3001/users/by-email/metadata \
 *        -H "Content-Type: application/json" \
 *        -d '{"email": "alice@example.com", "publicMetadata": {"role": "premium"}}'
 */
app.patch('/users/by-email/metadata', async (req, res) => {
  const { email, publicMetadata, privateMetadata, unsafeMetadata } = req.body

  if (!email) {
    return res.status(400).json({ error: '"email" is required in the request body' })
  }

  try {
    const userId = await getUserIdByEmail(email)

    const updatedUser = await clerkClient.users.updateUserMetadata(userId, {
      ...(publicMetadata  !== undefined && { publicMetadata }),
      ...(privateMetadata !== undefined && { privateMetadata }),
      ...(unsafeMetadata  !== undefined && { unsafeMetadata }),
    })

    return res.json({
      id: updatedUser.id,
      publicMetadata:  updatedUser.publicMetadata,
      privateMetadata: updatedUser.privateMetadata,
      unsafeMetadata:  updatedUser.unsafeMetadata,
    })
  } catch (err) {
    console.error(err)
    return res.status(err.statusCode ?? 400).json({ error: err.message })
  }
})

/**
 * PATCH /users/:userId/metadata
 *
 * Body (all fields optional — only the ones you send are merged):
 * {
 *   "publicMetadata":  { ... },
 *   "privateMetadata": { ... },
 *   "unsafeMetadata":  { ... }
 * }
 *
 * Example:
 *   curl -X PATCH http://localhost:3001/users/user_123/metadata \
 *        -H "Content-Type: application/json" \
 *        -d '{"publicMetadata": {"role": "premium"}}'
 */
app.patch('/users/:userId/metadata', async (req, res) => {
  const { userId } = req.params
  const { publicMetadata, privateMetadata, unsafeMetadata } = req.body

  try {
    const updatedUser = await clerkClient.users.updateUserMetadata(userId, {
      ...(publicMetadata  !== undefined && { publicMetadata }),
      ...(privateMetadata !== undefined && { privateMetadata }),
      ...(unsafeMetadata  !== undefined && { unsafeMetadata }),
    })

    return res.json({
      id: updatedUser.id,
      publicMetadata:  updatedUser.publicMetadata,
      privateMetadata: updatedUser.privateMetadata,
      unsafeMetadata:  updatedUser.unsafeMetadata,
    })
  } catch (err) {
    console.error(err)
    return res.status(400).json({ error: err.message })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`clerk-backend listening on port ${PORT}`))
