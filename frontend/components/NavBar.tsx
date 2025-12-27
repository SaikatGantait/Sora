"use client"
import Link from 'next/link'
import { useAuth } from '../auth/AuthContext'

export default function NavBar() {
  const { user, logout } = useAuth()
  return (
    <div className="flex items-center gap-4">
      <Link href="/templates" className="hover:text-accent">Templates</Link>
      <Link href="/creator" className="hover:text-accent">Creator</Link>
      {user ? (
        <>
          <span className="text-sm text-zinc-400">{user.name}</span>
          <button className="btn btn-secondary" onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link href="/auth/login" className="btn btn-secondary">Login</Link>
          <Link href="/auth/signup" className="btn btn-primary">Sign up</Link>
        </>
      )}
    </div>
  )
}