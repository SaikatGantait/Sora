"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../../auth/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const ok = await login(email, password)
    if (ok) router.push('/templates')
    else setError('Invalid credentials')
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-2xl font-semibold mb-6">Login</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input className="input" placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button className="btn btn-primary w-full" type="submit">Login</button>
      </form>
      <p className="text-sm text-zinc-400 mt-3">New here? <a className="text-accent hover:underline" href="/auth/signup">Create an account</a></p>
    </div>
  )
}