"use client"
import { useEffect, useState } from 'react'
import { getApiBase, authFetch } from '../../lib/api'
import { useAuth } from '../../auth/AuthContext'

export default function CreatorPage() {
  const { token } = useAuth()
  const [json, setJson] = useState('')
  const [message, setMessage] = useState('')
  const [templates, setTemplates] = useState<any[]>([])

  const load = async () => {
    const res = await fetch(`${getApiBase()}/templates`)
    const data = await res.json()
    setTemplates(data.templates || [])
  }
  useEffect(() => { load() }, [])

  const onPublish = async () => {
    try {
      const tpl = JSON.parse(json)
      const res = await authFetch(token, `${getApiBase()}/templates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tpl)
      })
      if (res.ok) {
        setMessage('Template published')
        setJson('')
        load()
      } else setMessage('Failed to publish')
    } catch (e) {
      setMessage('Invalid JSON')
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="card p-4 space-y-3">
        <h2 className="text-xl font-semibold">Upload template JSON</h2>
        <textarea className="input h-64" value={json} onChange={e=>setJson(e.target.value)} placeholder='{"id":"...","name":"..."}' />
        <button className="btn btn-primary" onClick={onPublish}>Publish</button>
        {message && <p className="text-sm text-zinc-400">{message}</p>}
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Your templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map(t => (
            <div key={t.id} className="card p-3">
              <video className="w-full rounded mb-2" src={t.previewUrl} controls/>
              <div className="text-sm font-medium">{t.name}</div>
              <div className="text-xs text-zinc-400">{t.creatorName}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}