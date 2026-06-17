/**
 * Server configuration. Values fall back to safe defaults so the API runs
 * out-of-the-box for local use, but every secret can be overridden via env.
 */
export const PORT = Number(process.env.PORT) || 3000

// Change this in production via the JWT_SECRET environment variable.
export const JWT_SECRET = process.env.JWT_SECRET || 'eastgold-admin-secret-change-me'

export const TOKEN_TTL = '8h'

// Allowed origins for CORS (the Vite dev server, by default).
export const CORS_ORIGINS = (process.env.CORS_ORIGINS || 'http://localhost:5173,http://localhost:4173')
  .split(',')
  .map((o) => o.trim())

// Single admin account, as specified. Override with env in production.
export const ADMIN = {
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || 'admin@123',
}

// Initial gold rate seeded into the data file on first run.
export const DEFAULT_GOLD_RATE = {
  id: 1,
  oneGramRate: 9500,
  updatedAt: new Date().toISOString(),
}
