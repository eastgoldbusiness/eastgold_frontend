import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { RootLayout } from '@/layouts/root-layout'
import { HomePage } from '@/pages/home'
import { AdminPage } from '@/pages/admin'

/**
 * Central route configuration.
 * Register application routes as children of the root layout.
 *
 * `/admin` is intentionally a top-level route OUTSIDE the site shell: it is not
 * linked from the navbar, footer or any page, and is reachable only by typing
 * the URL. The page handles its own auth (login screen until authenticated).
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [{ index: true, element: <HomePage /> }],
  },
  {
    path: '/admin',
    element: <AdminPage />,
  },
  // Catch-all: any unknown path (including a direct hit on /index.html from the
  // static-host SPA rewrite) is sent to the home page instead of erroring.
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
