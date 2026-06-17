/**
 * Shared application types.
 * Co-locate feature-specific types within their feature folder.
 */

/** Standard shape for paginated API responses. */
export interface Paginated<T> {
  data: T[]
  page: number
  pageSize: number
  total: number
}

/** Generic API error payload. */
export interface ApiError {
  message: string
  code?: string
  details?: unknown
}
