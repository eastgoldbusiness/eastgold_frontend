import { useEffect, useState, type FormEvent } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Coins,
  Eye,
  EyeOff,
  Inbox,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Phone,
  RefreshCw,
  Search,
  Settings as SettingsIcon,
  Trash2,
  TrendingUp,
  X,
} from 'lucide-react'
import {
  adminLogin,
  fetchGoldRate,
  fetchGoldRateHistory,
  updateGoldRate,
  type GoldRate,
} from '@/lib/api/gold-rate'
import {
  deleteEnquiry,
  fetchEnquiries,
  fetchEnquiryStats,
  updateEnquiryStatus,
  type Enquiry,
  type EnquiryStatus,
} from '@/lib/api/enquiries'
import { fetchAdminProfile, updateAdminProfile, type AdminProfile } from '@/lib/api/admin'
import { translations } from '@/i18n/translations'
import { GOLD_RATE_QUERY_KEY } from '@/hooks/use-gold-rate'
import { AUTH_UNAUTHORIZED_EVENT } from '@/lib/axios'
import { adminStyles } from './admin-styles'

const TOKEN_KEY = 'auth_token'
const STATUSES: EnquiryStatus[] = ['New', 'Contacted', 'Closed']

/** Pulls a human-readable message out of an axios-style error. */
function errorMessage(err: unknown, fallback: string): string {
  if (typeof err === 'object' && err !== null) {
    const resp = (err as { response?: { data?: { message?: string } } }).response
    if (resp?.data?.message) return resp.data.message
  }
  return fallback
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function rupees(amount: number): string {
  return new Intl.NumberFormat('en-IN').format(amount)
}

/**
 * Normalises a stored service value to its English label. Older enquiries may
 * have been saved in the language the visitor used (e.g. Tamil); the service
 * options align by index across languages, so a match in any language maps
 * back to the canonical English label.
 */
function serviceInEnglish(service?: string): string {
  if (!service) return '—'
  const en = translations.en.consultation.serviceOptions
  for (const lang of Object.values(translations)) {
    const idx = lang.consultation.serviceOptions.indexOf(service)
    if (idx >= 0) return en[idx]
  }
  return service
}

/**
 * Hidden admin panel (reachable only by typing /admin). Renders the login
 * screen until authenticated, then the full dashboard. All styling is
 * self-contained (scoped `eg-admin-*` classes) so it never touches the public
 * site's CSS, and unauthenticated/expired sessions are redirected to login.
 */
export function AdminPage() {
  const [authed, setAuthed] = useState<boolean>(() => Boolean(localStorage.getItem(TOKEN_KEY)))

  // A 401 from any admin request clears the token and bounces back to login.
  useEffect(() => {
    const onUnauthorized = () => setAuthed(false)
    window.addEventListener(AUTH_UNAUTHORIZED_EVENT, onUnauthorized)
    return () => window.removeEventListener(AUTH_UNAUTHORIZED_EVENT, onUnauthorized)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY)
    setAuthed(false)
  }

  return (
    <>
      <style>{adminStyles}</style>
      {authed ? (
        <DashboardShell onLogout={handleLogout} />
      ) : (
        <div className="eg-admin-shell">
          <div className="eg-admin-glow eg-admin-glow-a" aria-hidden />
          <div className="eg-admin-glow eg-admin-glow-b" aria-hidden />
          <LoginScreen onSuccess={() => setAuthed(true)} />
        </div>
      )}
    </>
  )
}

export default AdminPage

/* ── Shared brand header ──────────────────────────────────────────────────── */
function Brand({ caption }: { caption: string }) {
  return (
    <div className="eg-admin-brand">
      <span className="eg-admin-logo">
        <img src="/east-gold-logo.webp" alt="EastGold" />
      </span>
      <span className="eg-admin-wordmark">EastGold</span>
      <span className="eg-admin-caption">{caption}</span>
    </div>
  )
}

/* ── Login ────────────────────────────────────────────────────────────────── */
function LoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = useMutation({
    mutationFn: adminLogin,
    onSuccess: ({ token }) => {
      localStorage.setItem(TOKEN_KEY, token)
      onSuccess()
    },
    onError: (err) => setError(errorMessage(err, 'Login failed. Please try again.')),
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    login.mutate({ username, password })
  }

  return (
    <form onSubmit={handleSubmit} className="eg-admin-card">
      <Brand caption="Admin Panel" />

      <div className="eg-admin-field">
        <label htmlFor="admin-username">Username</label>
        <input
          id="admin-username"
          className="eg-admin-input"
          type="text"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="admin"
          required
        />
      </div>

      <div className="eg-admin-field">
        <label htmlFor="admin-password">Password</label>
        <div className="eg-admin-inputwrap">
          <input
            id="admin-password"
            className="eg-admin-input eg-admin-input--eye"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          <button
            type="button"
            className="eg-admin-eye-btn"
            onClick={() => setShowPassword(v => !v)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      {error && <p className="eg-admin-error">{error}</p>}

      <button type="submit" className="eg-admin-btn" disabled={login.isPending}>
        {login.isPending ? 'Signing in…' : 'Sign In'}
      </button>
    </form>
  )
}

/* ── Dashboard shell (sidebar + content) ──────────────────────────────────── */
type Section = 'dashboard' | 'gold-rate' | 'enquiries' | 'settings'

const NAV: { key: Section; label: string; icon: typeof LayoutDashboard }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'gold-rate', label: 'Gold Rate', icon: Coins },
  { key: 'enquiries', label: 'Enquiries', icon: Inbox },
  { key: 'settings', label: 'Settings', icon: SettingsIcon },
]

function DashboardShell({ onLogout }: { onLogout: () => void }) {
  const [section, setSection] = useState<Section>('dashboard')
  const [navOpen, setNavOpen] = useState(false)

  const active = NAV.find((n) => n.key === section)

  return (
    <div className="eg-admin-app">
      {/* Mobile overlay */}
      {navOpen && <div className="eg-admin-overlay" onClick={() => setNavOpen(false)} aria-hidden />}

      <aside className={`eg-admin-sidebar ${navOpen ? 'is-open' : ''}`}>
        <div className="eg-admin-sidebrand">
          <span className="eg-admin-logo eg-admin-logo--sm">
            <img src="/east-gold-logo.webp" alt="EastGold" />
          </span>
          <span>EastGold</span>
          <button
            type="button"
            className="eg-admin-iconbtn eg-admin-navclose"
            onClick={() => setNavOpen(false)}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="eg-admin-nav">
          {NAV.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              className={`eg-admin-navitem ${section === key ? 'is-active' : ''}`}
              onClick={() => {
                setSection(key)
                setNavOpen(false)
              }}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <button type="button" className="eg-admin-navitem eg-admin-logout" onClick={onLogout}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </aside>

      <div className="eg-admin-main">
        <header className="eg-admin-topbar">
          <button
            type="button"
            className="eg-admin-iconbtn eg-admin-navtoggle"
            onClick={() => setNavOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          <h1 className="eg-admin-title">{active?.label}</h1>
        </header>

        <main className="eg-admin-content">
          {section === 'dashboard' && <DashboardSection onNavigate={setSection} />}
          {section === 'gold-rate' && <GoldRateSection />}
          {section === 'enquiries' && <EnquiriesSection />}
          {section === 'settings' && <SettingsSection />}
        </main>
      </div>
    </div>
  )
}

/* ── Dashboard overview ───────────────────────────────────────────────────── */
function DashboardSection({ onNavigate }: { onNavigate: (s: Section) => void }) {
  const stats = useQuery({ queryKey: ['enquiry-stats'], queryFn: fetchEnquiryStats })
  const rate = useQuery({ queryKey: GOLD_RATE_QUERY_KEY, queryFn: fetchGoldRate })
  const recent = useQuery({ queryKey: ['enquiries', '', ''], queryFn: () => fetchEnquiries() })

  const cards = [
    { label: 'Total Enquiries', value: stats.data?.total ?? '—', icon: Inbox, tone: 'gold' },
    { label: "Today's Enquiries", value: stats.data?.today ?? '—', icon: TrendingUp, tone: 'green' },
    { label: 'New Enquiries', value: stats.data?.new ?? '—', icon: Mail, tone: 'blue' },
    { label: 'Contacted', value: stats.data?.contacted ?? '—', icon: Phone, tone: 'amber' },
  ] as const

  return (
    <div className="eg-admin-stack">
      <div className="eg-admin-cards">
        {cards.map((c) => (
          <div key={c.label} className="eg-admin-statcard">
            <span className={`eg-admin-staticon tone-${c.tone}`}>
              <c.icon size={20} />
            </span>
            <div>
              <p className="eg-admin-statvalue">{c.value}</p>
              <p className="eg-admin-statlabel">{c.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="eg-admin-grid2">
        <div className="eg-admin-panel eg-admin-ratecard">
          <div className="eg-admin-panelhead">
            <h2>Current Gold Rate</h2>
            <button type="button" className="eg-admin-link" onClick={() => onNavigate('gold-rate')}>
              Manage
            </button>
          </div>
          {rate.data ? (
            <>
              <div className="eg-admin-raterow">
                <div>
                  <p className="eg-admin-ratebig">₹{rupees(rate.data.oneGramRate)}</p>
                  <p className="eg-admin-statlabel">per 1 gram</p>
                </div>
                <div>
                  <p className="eg-admin-ratebig">
                    ₹{rupees(rate.data.eightGramRate ?? rate.data.oneGramRate * 8)}
                  </p>
                  <p className="eg-admin-statlabel">per 8 gram</p>
                </div>
              </div>
              <p className="eg-admin-muted">Updated {formatDate(rate.data.updatedAt)}</p>
            </>
          ) : (
            <p className="eg-admin-muted">Loading…</p>
          )}
        </div>

        <div className="eg-admin-panel">
          <div className="eg-admin-panelhead">
            <h2>Recent Activity</h2>
            <button type="button" className="eg-admin-link" onClick={() => onNavigate('enquiries')}>
              View all
            </button>
          </div>
          {recent.data && recent.data.length > 0 ? (
            <ul className="eg-admin-activity">
              {recent.data.slice(0, 6).map((e) => (
                <li key={e._id}>
                  <span className="eg-admin-activity-name">{e.name}</span>
                  <span className={`eg-admin-badge status-${e.status.toLowerCase()}`}>
                    {e.status}
                  </span>
                  <span className="eg-admin-activity-date">{formatDate(e.createdAt)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="eg-admin-muted">
              {recent.isLoading ? 'Loading…' : 'No enquiries yet.'}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Gold Rate management ─────────────────────────────────────────────────── */
function GoldRateSection() {
  const rate = useQuery({ queryKey: GOLD_RATE_QUERY_KEY, queryFn: fetchGoldRate })
  const history = useQuery({ queryKey: ['gold-rate-history'], queryFn: fetchGoldRateHistory })

  return (
    <div className="eg-admin-stack">
      <div className="eg-admin-panel">
        <div className="eg-admin-panelhead">
          <h2>Update Gold Rate</h2>
          {rate.data && (
            <span className="eg-admin-muted">Last updated {formatDate(rate.data.updatedAt)}</span>
          )}
        </div>
        {/* Render the editor only once the rate has loaded so inputs can be
            initialised directly from the data (no setState-in-effect). */}
        {rate.data ? (
          <RateEditor initial={rate.data} />
        ) : (
          <p className="eg-admin-muted">{rate.isError ? 'Could not load rate.' : 'Loading…'}</p>
        )}
      </div>

      <div className="eg-admin-panel">
        <div className="eg-admin-panelhead">
          <h2>Rate History</h2>
        </div>
        <div className="eg-admin-tablewrap">
          <table className="eg-admin-table">
            <thead>
              <tr>
                <th>1 Gram</th>
                <th>8 Gram</th>
                <th>Updated By</th>
                <th>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {history.data && history.data.length > 0 ? (
                history.data.map((h) => (
                  <tr key={String(h.id)}>
                    <td>₹{rupees(h.oneGramRate)}</td>
                    <td>₹{rupees(h.eightGramRate ?? h.oneGramRate * 8)}</td>
                    <td>{h.updatedBy ?? '—'}</td>
                    <td>{formatDate(h.updatedAt)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="eg-admin-empty">
                    {history.isLoading ? 'Loading…' : 'No history yet.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

/** Editable gold-rate form, initialised from the already-loaded rate. */
function RateEditor({ initial }: { initial: GoldRate }) {
  const queryClient = useQueryClient()
  const [oneGram, setOneGram] = useState(() => String(initial.oneGramRate))
  const [eightGram, setEightGram] = useState(() =>
    String(initial.eightGramRate ?? initial.oneGramRate * 8),
  )
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const save = useMutation({
    mutationFn: updateGoldRate,
    onSuccess: (updated: GoldRate) => {
      queryClient.setQueryData(GOLD_RATE_QUERY_KEY, updated)
      queryClient.invalidateQueries({ queryKey: ['gold-rate-history'] })
      setSaved(true)
      setError(null)
      window.setTimeout(() => setSaved(false), 3000)
    },
    onError: (err) => setError(errorMessage(err, 'Could not save. Please try again.')),
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSaved(false)
    setError(null)
    save.mutate({ oneGramRate: Number(oneGram), eightGramRate: Number(eightGram) })
  }

  return (
    <form onSubmit={handleSubmit} className="eg-admin-rateform">
      <div className="eg-admin-field">
        <label htmlFor="rate-1g">1 Gram Gold Rate</label>
        <div className="eg-admin-inputwrap">
          <span className="eg-admin-prefix">₹</span>
          <input
            id="rate-1g"
            className="eg-admin-input eg-admin-input--prefixed"
            type="number"
            min={0}
            step="1"
            inputMode="numeric"
            value={oneGram}
            onChange={(e) => setOneGram(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="eg-admin-field">
        <label htmlFor="rate-8g">8 Gram Gold Rate</label>
        <div className="eg-admin-inputwrap">
          <span className="eg-admin-prefix">₹</span>
          <input
            id="rate-8g"
            className="eg-admin-input eg-admin-input--prefixed"
            type="number"
            min={0}
            step="1"
            inputMode="numeric"
            value={eightGram}
            onChange={(e) => setEightGram(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="eg-admin-formactions">
        <button type="submit" className="eg-admin-btn" disabled={save.isPending}>
          {save.isPending ? 'Saving…' : 'Update Rate'}
        </button>
        {saved && <span className="eg-admin-success">✓ Rate updated</span>}
        {error && <span className="eg-admin-error">{error}</span>}
      </div>
    </form>
  )
}

/* ── Enquiries management ─────────────────────────────────────────────────── */
function EnquiriesSection() {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [debounced, setDebounced] = useState('')
  const [status, setStatus] = useState<EnquiryStatus | ''>('')

  // Debounce the search box so we don't fire a request per keystroke.
  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(search.trim()), 300)
    return () => window.clearTimeout(id)
  }, [search])

  const list = useQuery({
    queryKey: ['enquiries', debounced, status],
    queryFn: () => fetchEnquiries({ search: debounced, status }),
  })

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['enquiries'] })
    queryClient.invalidateQueries({ queryKey: ['enquiry-stats'] })
  }

  const statusMutation = useMutation({
    mutationFn: ({ id, next }: { id: string; next: EnquiryStatus }) =>
      updateEnquiryStatus(id, next),
    onSuccess: invalidate,
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteEnquiry(id),
    onSuccess: invalidate,
  })

  const handleDelete = (e: Enquiry) => {
    if (window.confirm(`Delete enquiry from ${e.name}? This cannot be undone.`)) {
      deleteMutation.mutate(e._id)
    }
  }

  const rows = list.data ?? []

  return (
    <div className="eg-admin-stack">
      <div className="eg-admin-panel">
        <div className="eg-admin-toolbar">
          <div className="eg-admin-searchwrap">
            <Search size={16} className="eg-admin-searchicon" />
            <input
              className="eg-admin-input eg-admin-search"
              type="search"
              placeholder="Search name, phone, email, message…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="eg-admin-filters">
            {(['', ...STATUSES] as const).map((s) => (
              <button
                key={s || 'all'}
                type="button"
                className={`eg-admin-chip ${status === s ? 'is-active' : ''}`}
                onClick={() => setStatus(s)}
              >
                {s || 'All'}
              </button>
            ))}
            <button
              type="button"
              className="eg-admin-iconbtn"
              onClick={() => list.refetch()}
              aria-label="Refresh"
            >
              <RefreshCw size={16} />
            </button>
          </div>
        </div>

        <div className="eg-admin-tablewrap">
          <table className="eg-admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Area</th>
                <th>Service</th>
                <th>Type of Gold</th>
                <th>Preferred Call Time</th>
                <th>Message</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.length > 0 ? (
                rows.map((e) => (
                  <tr key={e._id}>
                    <td data-label="Name">{e.name}</td>
                    <td data-label="Phone">
                      <a href={`tel:${e.phone}`} className="eg-admin-link">
                        {e.phone}
                      </a>
                    </td>
                    <td data-label="Area">{e.area || '—'}</td>
                    <td data-label="Service">{serviceInEnglish(e.service)}</td>
                    <td data-label="Type of Gold">{e.typeOfGold || '—'}</td>
                    <td data-label="Preferred Call Time">{e.callTime || '—'}</td>
                    <td data-label="Message" className="eg-admin-message" title={e.message}>
                      {e.message || '—'}
                    </td>
                    <td data-label="Date">{formatDate(e.createdAt)}</td>
                    <td data-label="Status">
                      <select
                        className={`eg-admin-statusselect status-${e.status.toLowerCase()}`}
                        value={e.status}
                        onChange={(ev) =>
                          statusMutation.mutate({
                            id: e._id,
                            next: ev.target.value as EnquiryStatus,
                          })
                        }
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td data-label="Actions">
                      <button
                        type="button"
                        className="eg-admin-iconbtn eg-admin-danger"
                        onClick={() => handleDelete(e)}
                        aria-label={`Delete enquiry from ${e.name}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="eg-admin-empty">
                    {list.isLoading ? 'Loading…' : 'No enquiries found.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

/* ── Settings (admin profile) ─────────────────────────────────────────────── */
function SettingsSection() {
  const profile = useQuery({ queryKey: ['admin-profile'], queryFn: fetchAdminProfile })

  return (
    <div className="eg-admin-stack">
      <div className="eg-admin-panel eg-admin-panel--narrow">
        <div className="eg-admin-panelhead">
          <h2>Admin Profile</h2>
          {profile.data && <span className="eg-admin-muted">@{profile.data.username}</span>}
        </div>
        {/* Render the editor only once the profile has loaded so inputs can be
            initialised directly from the data (no setState-in-effect). */}
        {profile.data ? (
          <ProfileEditor initial={profile.data} onSaved={() => profile.refetch()} />
        ) : (
          <p className="eg-admin-muted">
            {profile.isError ? 'Could not load profile.' : 'Loading…'}
          </p>
        )}
      </div>
    </div>
  )
}

/** Editable admin-profile form, initialised from the already-loaded profile. */
function ProfileEditor({
  initial,
  onSaved,
}: {
  initial: AdminProfile
  onSaved: () => void
}) {
  const [name, setName] = useState(() => initial.name ?? '')
  const [email, setEmail] = useState(() => initial.email ?? '')
  const [password, setPassword] = useState('')
  const [showSettingsPassword, setShowSettingsPassword] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const save = useMutation({
    mutationFn: updateAdminProfile,
    onSuccess: () => {
      setSaved(true)
      setError(null)
      setPassword('')
      onSaved()
      window.setTimeout(() => setSaved(false), 3000)
    },
    onError: (err) => setError(errorMessage(err, 'Could not save profile.')),
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSaved(false)
    setError(null)
    save.mutate({ name, email, password: password || undefined })
  }

  return (
    <form onSubmit={handleSubmit} className="eg-admin-rateform">
          <div className="eg-admin-field">
            <label htmlFor="profile-name">Display Name</label>
            <input
              id="profile-name"
              className="eg-admin-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="eg-admin-field">
            <label htmlFor="profile-email">Email</label>
            <input
              id="profile-email"
              className="eg-admin-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div className="eg-admin-field">
            <label htmlFor="profile-password">New Password</label>
            <div className="eg-admin-inputwrap">
              <input
                id="profile-password"
                className="eg-admin-input eg-admin-input--eye"
                type={showSettingsPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank to keep current"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="eg-admin-eye-btn"
                onClick={() => setShowSettingsPassword(v => !v)}
                aria-label={showSettingsPassword ? 'Hide password' : 'Show password'}
              >
                {showSettingsPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="eg-admin-formactions">
            <button type="submit" className="eg-admin-btn" disabled={save.isPending}>
              {save.isPending ? 'Saving…' : 'Save Changes'}
            </button>
            {saved && <span className="eg-admin-success">✓ Saved</span>}
            {error && <span className="eg-admin-error">{error}</span>}
          </div>
        </form>
  )
}
