"use client"
import { useEffect, useMemo, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { Layer, Template } from '../../../lib/types'
import { getApiBase, authFetch } from '../../../lib/api'
import CanvasEditor from '../../../components/CanvasEditor'
import Timeline from '../../../components/Timeline'
import RemotionPreview from '../../../components/RemotionPreview'
import { useAuth } from '../../../auth/AuthContext'

export default function EditorPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const search = useSearchParams()
  const { token } = useAuth()
  const [template, setTemplate] = useState<Template | null>(null)
  const [layers, setLayers] = useState<Layer[]>([])
  const [status, setStatus] = useState<string>('idle')
  const [jobId, setJobId] = useState<string | null>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [saveMsg, setSaveMsg] = useState<string>('')

  useEffect(() => {
    // Protect route: if no token, redirect to login
    if (!token) {
      router.replace('/auth/login')
      return
    }
    const load = async () => {
      const projectId = search.get('project')
      if (projectId) {
        const res = await authFetch(token, `${getApiBase()}/projects/${projectId}`)
        if (res.ok) {
          const data = await res.json()
          const projTpl = data.project?.data
          if (projTpl) {
            setTemplate(projTpl)
            setLayers(projTpl.layers || [])
            return
          }
        }
      }
      const res = await fetch(`${getApiBase()}/templates/${params.id}`)
      const data = await res.json()
      setTemplate(data.template)
      setLayers(data.template.layers)
    }
    load()
  }, [params.id, token, router, search])

  const onRender = async () => {
    if (!template) return
    setStatus('queuing')
    const res = await authFetch(token, `${getApiBase()}/render`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ template: { ...template, layers } }),
    })
    const data = await res.json()
    setJobId(data.jobId)
    setStatus('processing')
  }

  const onSave = async () => {
    if (!template) return
    try {
      const res = await authFetch(token, `${getApiBase()}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${template.name} Project`,
          templateId: template.id,
          data: { ...template, layers },
        }),
      })
      if (res.ok) setSaveMsg('Saved!')
      else setSaveMsg('Could not save (backend migration pending)')
    } catch {
      setSaveMsg('Could not save')
    } finally {
      setTimeout(()=>setSaveMsg(''), 2000)
    }
  }

  useEffect(() => {
    if (!jobId) return
    const t = setInterval(async () => {
      const res = await authFetch(token, `${getApiBase()}/render/${jobId}`)
      const data = await res.json()
      setStatus(data.status)
      if (data.status === 'completed') {
        setVideoUrl(data.videoUrl)
        clearInterval(t)
      }
    }, 1500)
    return () => clearInterval(t)
  }, [jobId, token])

  const duration = useMemo(() => template?.duration ?? 10, [template])

  if (!template) return <p>Loading...</p>

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
      <div className="xl:col-span-8 space-y-4">
        <RemotionPreview template={{ ...template, layers }} />
        <CanvasEditor layers={layers} setLayers={setLayers} />
        <Timeline duration={duration} layers={layers} setLayers={setLayers} />
      </div>
      <div className="xl:col-span-4">
        <div className="card p-4 space-y-4">
          <h3 className="text-lg font-semibold">Actions</h3>
          <button className="btn btn-secondary w-full" onClick={onSave}>Save Project</button>
          <button className="btn btn-primary w-full" onClick={onRender}>Render</button>
          <p className="text-sm text-zinc-400">Status: {status}</p>
          {saveMsg && <p className="text-sm text-zinc-300">{saveMsg}</p>}
          {videoUrl && (
            <video className="w-full rounded" controls src={videoUrl} />
          )}
        </div>
      </div>
    </div>
  )
}