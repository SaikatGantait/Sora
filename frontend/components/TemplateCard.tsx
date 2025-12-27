"use client"
import Link from 'next/link'
import { Template } from '../lib/types'

export default function TemplateCard({ template }: { template: Template }) {
  return (
    <Link href={`/editor/${template.id}`} className="card overflow-hidden group relative transition transform hover:-translate-y-0.5 hover:shadow-xl">
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition" style={{background: 'linear-gradient(120deg, rgba(124,92,255,0.25), rgba(0,229,255,0.25))'}} />
      <div className="aspect-video bg-black/50 relative">
        {template.previewUrl ? (
          <video src={template.previewUrl} className="w-full h-full object-cover" muted autoPlay loop playsInline />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-500">No preview</div>
        )}
      </div>
      <div className="p-4 relative">
        <div className="font-medium">{template.name}</div>
        <div className="text-xs text-zinc-400">{template.creatorName || 'SoraStudio'}</div>
      </div>
    </Link>
  )
}