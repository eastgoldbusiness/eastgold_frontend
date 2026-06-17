import { z } from 'zod'

/**
 * Validate and expose typed environment variables.
 * Vite only exposes variables prefixed with `VITE_` to client code.
 * Defaults keep the app runnable before a local `.env` is created.
 */
const envSchema = z.object({
  VITE_API_BASE_URL: z.url().default('http://localhost:3000/api'),
  VITE_APP_NAME: z.string().min(1).default('Gold Exchange'),
})

const parsed = envSchema.safeParse(import.meta.env)

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', z.flattenError(parsed.error).fieldErrors)
  throw new Error('Invalid environment variables. Check your .env file.')
}

export const env = {
  apiBaseUrl: parsed.data.VITE_API_BASE_URL,
  appName: parsed.data.VITE_APP_NAME,
} as const
