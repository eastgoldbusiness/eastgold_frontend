import { apiClient } from '@/lib/axios'
import { env } from '@/config/env'

/** The kinds of contact buttons we track. */
export type ClickType = 'call' | 'whatsapp' | 'contact'

/** Click counts for a single window (today or lifetime total). */
export interface ClickCounts {
  call: number
  whatsapp: number
  /** Combined total across every contact-button type. */
  contact: number
}

/** Shape returned by GET /api/analytics/dashboard. */
export interface AnalyticsDashboard {
  today: ClickCounts
  total: ClickCounts
}

/** Admin-only — dashboard aggregates (requires a valid Bearer token). */
export async function fetchAnalyticsDashboard(): Promise<AnalyticsDashboard> {
  const { data } = await apiClient.get<AnalyticsDashboard>('/analytics/dashboard')
  return data
}

/* ── Public click tracking ──────────────────────────────────────────────────
 * Fire-and-forget: tracking must never delay opening WhatsApp or dialling. We
 * use `navigator.sendBeacon`, which queues the request and lets it complete
 * even as the browser navigates away (tel:/wa.me links leave the page). A
 * `fetch` with `keepalive` covers browsers without sendBeacon.
 *
 * The body is sent as `text/plain` on purpose: that makes it a CORS "simple"
 * request, so the browser sends it WITHOUT a preflight and WITHOUT requiring
 * the API origin to be CORS-whitelisted (the response is ignored anyway). An
 * `application/json` beacon would trigger a preflight and be silently dropped
 * whenever the site's origin isn't in the server's CORS allow-list. The server
 * parses the text body as JSON.
 */
const BEACON_CONTENT_TYPE = 'text/plain'

const TRACK_URL = `${env.apiBaseUrl}/analytics/click`

/** Client-side debounce so a double-tap doesn't send two events. */
const DEBOUNCE_MS = 1500
const lastSent = new Map<ClickType, number>()

/**
 * Record a contact-button click without blocking navigation. Safe to call in
 * an `onClick` handler right before the link opens; any failure is swallowed.
 */
export function trackClick(type: ClickType): void {
  const now = Date.now()
  const prev = lastSent.get(type)
  if (prev !== undefined && now - prev < DEBOUNCE_MS) return
  lastSent.set(type, now)

  const payload = JSON.stringify({ type })

  try {
    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([payload], { type: BEACON_CONTENT_TYPE })
      if (navigator.sendBeacon(TRACK_URL, blob)) return
    }
    // Fallback for environments without sendBeacon. `credentials: 'include'`
    // matches sendBeacon's credentialed behaviour so the server's `eg_vid`
    // visitor cookie is sent/kept for cross-visit dedupe.
    void fetch(TRACK_URL, {
      method: 'POST',
      headers: { 'Content-Type': BEACON_CONTENT_TYPE },
      body: payload,
      credentials: 'include',
      keepalive: true,
    }).catch(() => {})
  } catch {
    // Never let analytics break the user's action.
  }
}
