"use client"
import { useEffect, useState } from 'react'
import { useAuth } from '../../auth/AuthContext'
import { getApiBase, authFetch } from '../../lib/api'

export default function ProjectsPage() {
  const { token } = useAuth()
  const [projects, setProjects] = useState<any[]>([])
  const [error, setError] = useState<string>("")
  const [busy, setBusy] = useState<string>("")

  useEffect(() => {
    const load = async () => {
      try {
        const res = await authFetch(token, `${getApiBase()}/projects`)
        if (!res.ok) {
          setError('Projects unavailable. If you just updated, run DB migration.')
          return
        }
        const data = await res.json()
        setProjects(data.projects || [])
      } catch (e) {
        setError('Could not load projects')
      }
    }
    load()
  }, [token])

  const onDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return
    setBusy(id)
    try {
      const res = await authFetch(token, `${getApiBase()}/projects/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setProjects(prev => prev.filter(p => p.id !== id))
      }
    } finally {
      setBusy("")
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">My Projects</h1>
      {error && <p className="text-sm text-red-400 mb-4">{error}</p>}
      {projects.length === 0 ? (
        <p className="text-zinc-400">No projects yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map(p => (
            <div key={p.id} className="card p-4">
              <div className="text-sm text-zinc-400">{new Date(p.updatedAt).toLocaleString()}</div>
              <div className="font-medium">{p.name}</div>
              <a className="btn btn-secondary mt-3" href={`/editor/${p.templateId}?project=${p.id}`}>Open in Editor</a>
              <button className="btn btn-secondary mt-3" onClick={()=>onDelete(p.id)} disabled={busy===p.id}>{busy===p.id? 'Deleting...' : 'Delete'}</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
