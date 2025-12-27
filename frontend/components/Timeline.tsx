"use client"
import { Layer } from '../lib/types'

export default function Timeline({ duration, layers, setLayers }: { duration: number; layers: Layer[]; setLayers: (l: Layer[])=>void }) {
  // Minimal timeline visualization: show duration and layers count
  return (
    <div className="card p-4">
      <div className="text-sm text-zinc-400">Timeline · Duration: {duration}s · Layers: {layers.length}</div>
      <div className="mt-3 h-20 bg-zinc-900/60 rounded border border-zinc-800" />
    </div>
  )
}