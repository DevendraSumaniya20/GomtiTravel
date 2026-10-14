/** The server answered with an error status, or could not be reached (status 0). */
export class ApiError extends Error {
  constructor(readonly status: number) {
    super(`API request failed with status ${status}`)
  }
}

/** Calls the site's own API at `/api/...` with JSON in and out, sending the admin cookie. */
export async function api<T>(path: string, method = 'GET', body?: unknown): Promise<T> {
  const response = await fetch(`/api/${path}`, {
    method,
    credentials: 'same-origin',
    headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  }).catch(() => {
    throw new ApiError(0)
  })
  if (!response.ok) throw new ApiError(response.status)
  return (response.status === 204 ? undefined : await response.json()) as T
}
