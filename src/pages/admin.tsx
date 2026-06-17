import { useState, type FormEvent } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  adminLogin,
  fetchGoldRate,
  updateGoldRate,
  type GoldRate,
} from '@/lib/api/gold-rate'
import { GOLD_RATE_QUERY_KEY } from '@/hooks/use-gold-rate'

const TOKEN_KEY = 'auth_token'

/** Pulls a human-readable message out of an axios-style error. */
function errorMessage(err: unknown, fallback: string): string {
  if (typeof err === 'object' && err !== null) {
    const resp = (err as { response?: { data?: { message?: string } } }).response
    if (resp?.data?.message) return resp.data.message
  }
  return fallback
}

/**
 * Hidden admin panel. Not linked anywhere — reachable only by typing /admin.
 * Renders the login screen until authenticated, then the gold-rate dashboard.
 * All styling is self-contained (scoped `eg-admin-*` classes) so it never
 * touches the public site's CSS.
 */
export function AdminPage() {
  const [authed, setAuthed] = useState<boolean>(() => Boolean(localStorage.getItem(TOKEN_KEY)))

  return (
    <div className="eg-admin-shell">
      <style>{adminStyles}</style>
      {/* Decorative ambient glow */}
      <div className="eg-admin-glow eg-admin-glow-a" aria-hidden />
      <div className="eg-admin-glow eg-admin-glow-b" aria-hidden />

      {authed ? (
        <Dashboard onLogout={() => setAuthed(false)} />
      ) : (
        <LoginScreen onSuccess={() => setAuthed(true)} />
      )}
    </div>
  )
}

export default AdminPage

/* ── Shared brand header ──────────────────────────────────────────────────── */
function Brand({ caption }: { caption: string }) {
  return (
    <div className="eg-admin-brand">
      <span className="eg-admin-logo">
        <img src="/east-gold-logo.png" alt="EastGold" />
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
        <input
          id="admin-password"
          className="eg-admin-input"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />
      </div>

      {error && <p className="eg-admin-error">{error}</p>}

      <button type="submit" className="eg-admin-btn" disabled={login.isPending}>
        {login.isPending ? 'Signing in…' : 'Sign In'}
      </button>
    </form>
  )
}

/* ── Dashboard ────────────────────────────────────────────────────────────── */
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: GOLD_RATE_QUERY_KEY,
    queryFn: fetchGoldRate,
  })

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY)
    onLogout()
  }

  // Render the editable form only once the current rate has loaded, so its
  // input state can be initialised directly from the data (no effect needed).
  if (isLoading || isError || !data) {
    return (
      <div className="eg-admin-card">
        <Brand caption="Gold Rate Management" />
        <p className={isError ? 'eg-admin-error' : 'eg-admin-muted'}>
          {isError
            ? 'Could not reach the server. Is the API running on port 3000?'
            : 'Loading current rate…'}
        </p>
        <button type="button" className="eg-admin-ghost" onClick={handleLogout}>
          Logout
        </button>
      </div>
    )
  }

  return <RateForm initial={data} onLogout={onLogout} onLogoutClick={handleLogout} />
}

function RateForm({
  initial,
  onLogout,
  onLogoutClick,
}: {
  initial: GoldRate
  onLogout: () => void
  onLogoutClick: () => void
}) {
  const queryClient = useQueryClient()
  const [oneGram, setOneGram] = useState(() => String(initial.oneGramRate))
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const save = useMutation({
    mutationFn: updateGoldRate,
    onSuccess: (updated) => {
      queryClient.setQueryData(GOLD_RATE_QUERY_KEY, updated)
      setSaved(true)
      setError(null)
      window.setTimeout(() => setSaved(false), 3000)
    },
    onError: (err) => {
      // Session expired or unauthorised → send back to the login screen.
      const status = (err as { response?: { status?: number } }).response?.status
      if (status === 401) {
        localStorage.removeItem(TOKEN_KEY)
        onLogout()
        return
      }
      setError(errorMessage(err, 'Could not save. Please try again.'))
    },
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSaved(false)
    setError(null)
    save.mutate({ oneGramRate: Number(oneGram) })
  }

  return (
    <form onSubmit={handleSubmit} className="eg-admin-card">
      <Brand caption="Gold Rate Management" />

      <div className="eg-admin-updated">
        Last updated: {new Date(initial.updatedAt).toLocaleString('en-IN')}
      </div>

      <div className="eg-admin-field">
        <label htmlFor="one-gram">Gold Rate Today · 1 Gram</label>
        <div className="eg-admin-inputwrap">
          <span className="eg-admin-prefix">₹</span>
          <input
            id="one-gram"
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

      {error && <p className="eg-admin-error">{error}</p>}
      {saved && <p className="eg-admin-success">✓ Gold rate updated successfully.</p>}

      <button type="submit" className="eg-admin-btn" disabled={save.isPending}>
        {save.isPending ? 'Saving…' : 'Save'}
      </button>

      <button type="button" className="eg-admin-ghost" onClick={onLogoutClick}>
        Logout
      </button>
    </form>
  )
}

/* ── Scoped styles (eg-admin-*) ───────────────────────────────────────────── */
const adminStyles = `
  .eg-admin-shell {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    overflow: hidden;
    font-family: 'Inter', system-ui, sans-serif;
    background:
      radial-gradient(1200px 600px at 50% -10%, #2a2a2a 0%, #1a1a1a 45%, #111111 100%);
  }
  .eg-admin-glow {
    position: absolute;
    border-radius: 9999px;
    filter: blur(90px);
    opacity: 0.5;
    pointer-events: none;
  }
  .eg-admin-glow-a { width: 360px; height: 360px; background: #D4AF37; top: -120px; left: -80px; }
  .eg-admin-glow-b { width: 300px; height: 300px; background: #8a6d1f; bottom: -120px; right: -60px; opacity: 0.35; }

  .eg-admin-card {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.98);
    border: 1px solid rgba(212, 175, 55, 0.35);
    border-radius: 20px;
    padding: 34px 30px;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
  }

  .eg-admin-brand {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 26px;
  }
  .eg-admin-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    border-radius: 9999px;
    background: linear-gradient(135deg, #FFFDF5, #F6E7B6);
    border: 1px solid rgba(212, 175, 55, 0.5);
    box-shadow: 0 8px 24px rgba(212, 175, 55, 0.25);
    overflow: hidden;
  }
  .eg-admin-logo img { width: 100%; height: 100%; object-fit: contain; }
  .eg-admin-wordmark {
    margin-top: 12px;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 26px;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: #111111;
  }
  .eg-admin-caption {
    margin-top: 2px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #D4AF37;
  }

  .eg-admin-field { display: flex; flex-direction: column; gap: 7px; margin-top: 16px; }
  .eg-admin-field label {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.02em;
    color: #4A4A4A;
  }

  .eg-admin-input {
    width: 100%;
    padding: 12px 14px;
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    background: #FAFAF8;
    font-size: 15px;
    color: #111111;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
    box-sizing: border-box;
  }
  .eg-admin-input::placeholder { color: #B4B4B4; }
  .eg-admin-input:focus {
    border-color: #D4AF37;
    background: #FFFFFF;
    box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.15);
  }

  .eg-admin-inputwrap { position: relative; }
  .eg-admin-prefix {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 15px;
    font-weight: 600;
    color: #6B6B6B;
    pointer-events: none;
  }
  .eg-admin-input--prefixed { padding-left: 30px; }

  .eg-admin-updated {
    margin-top: 4px;
    font-size: 12px;
    color: #8A8A8A;
    text-align: center;
  }
  .eg-admin-muted { font-size: 13px; color: #6B6B6B; text-align: center; margin: 8px 0 0; }

  .eg-admin-btn {
    margin-top: 22px;
    padding: 13px 16px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    font-size: 15px;
    font-weight: 600;
    color: #1A1A1A;
    background: linear-gradient(to right, #EAB308, #D69E2E);
    box-shadow: 0 8px 22px rgba(214, 158, 46, 0.35);
    transition: transform 0.15s, box-shadow 0.2s, opacity 0.2s;
  }
  .eg-admin-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 12px 28px rgba(214, 158, 46, 0.45); }
  .eg-admin-btn:active:not(:disabled) { transform: translateY(0); }
  .eg-admin-btn:disabled { opacity: 0.65; cursor: default; }

  .eg-admin-ghost {
    margin-top: 12px;
    padding: 10px 16px;
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    background: transparent;
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
    color: #6B6B6B;
    transition: border-color 0.2s, color 0.2s;
  }
  .eg-admin-ghost:hover { border-color: rgba(212, 175, 55, 0.5); color: #111111; }

  .eg-admin-error { margin: 14px 0 0; font-size: 13px; color: #DC2626; text-align: center; }
  .eg-admin-success { margin: 14px 0 0; font-size: 13px; font-weight: 600; color: #059669; text-align: center; }
`
