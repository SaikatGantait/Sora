"use client"
import { useEffect, useState } from 'react'
import { Template } from '../../lib/types'
import { getApiBase } from '../../lib/api'
import TemplateCard from '../../components/TemplateCard'

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${getApiBase()}/templates`)
        const data = await res.json()
        setTemplates(data.templates || [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <p>Loading templates...</p>

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Templates</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map(t => (
          <TemplateCard key={t.id} template={t} />
        ))}
      </div>
    </div>
  )
}