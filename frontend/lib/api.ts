export const getApiBase = () => process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000/api'

export const authFetch = (token: string | null, url: string, init?: RequestInit) => {
  return fetch(url, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      Authorization: token ? `Bearer ${token}` : ''
    }
  })
}
