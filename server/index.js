/**
 * EastGold admin API.
 *
 * Endpoints:
 *   POST /api/admin/login   → { token }            (issues a JWT)
 *   GET  /api/gold-rate     → GoldRate             (public)
 *   PUT  /api/gold-rate     → GoldRate             (requires Bearer token)
 */
import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import { ADMIN, CORS_ORIGINS, JWT_SECRET, PORT, TOKEN_TTL } from './config.js'
import { readGoldRate, writeGoldRate } from './store.js'

const app = express()
app.use(cors({ origin: CORS_ORIGINS }))
app.use(express.json())

/** Verifies the Bearer token and rejects unauthenticated requests. */
function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return res.status(401).json({ message: 'Authentication required.' })
  try {
    req.admin = jwt.verify(token, JWT_SECRET)
    next()
  } catch {
    return res.status(401).json({ message: 'Invalid or expired session.' })
  }
}

// ── Auth ────────────────────────────────────────────────────────────────────
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body || {}
  if (username === ADMIN.username && password === ADMIN.password) {
    const token = jwt.sign({ username, role: 'admin' }, JWT_SECRET, { expiresIn: TOKEN_TTL })
    return res.json({ token })
  }
  return res.status(401).json({ message: 'Invalid username or password.' })
})

// ── Gold rate ─────────────────────────────────────────────────────────────--
app.get('/api/gold-rate', async (_req, res) => {
  try {
    res.json(await readGoldRate())
  } catch {
    res.status(500).json({ message: 'Failed to read gold rate.' })
  }
})

app.put('/api/gold-rate', requireAuth, async (req, res) => {
  const oneGramRate = Number(req.body?.oneGramRate)

  if (!Number.isFinite(oneGramRate) || oneGramRate < 0) {
    return res.status(400).json({ message: 'oneGramRate must be a valid non-negative number.' })
  }

  try {
    const updated = await writeGoldRate({ oneGramRate })
    res.json(updated)
  } catch {
    res.status(500).json({ message: 'Failed to update gold rate.' })
  }
})

app.listen(PORT, () => {
  console.log(`EastGold API running on http://localhost:${PORT}`)
})
