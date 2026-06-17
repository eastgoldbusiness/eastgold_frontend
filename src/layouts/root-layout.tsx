import { Outlet } from 'react-router-dom'

/**
 * Application shell. Persistent UI (navigation, footer, etc.) lives here;
 * routed pages render through <Outlet />.
 */
export function RootLayout() {
  return (
    <div className="bg-gold-mesh text-ink min-h-svh">
      <Outlet />
    </div>
  )
}
