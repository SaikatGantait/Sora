// Default to same-origin and rely on Next.js rewrites to proxy to the backend.
export const getApiBase = () => process.env.NEXT_PUBLIC_API_BASE || '/api'

export const authFetch = (token: string | null, url: string, init?: RequestInit) => {
  return fetch(url, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      Authorization: token ? `Bearer ${token}` : ''
    }
  })
}
