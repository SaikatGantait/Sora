"use client"
import { Layer } from '../lib/types'

export default function Timeline({ duration, layers, setLayers }: { duration: number; layers: Layer[]; setLayers: (l: Layer[])=>void }) {
  const updateTime = (idx: number, key: 'start'|'end', val: number) => {
    const d = Math.max(0, Math.min(duration, val))
    const next = layers.slice()
    const l = { ...(next[idx] as any) }
    l[key] = d
    // Ensure start <= end and both within [0, duration]
    const start = typeof l.start === 'number' ? Math.max(0, Math.min(duration, l.start)) : 0
    const end = typeof l.end === 'number' ? Math.max(0, Math.min(duration, l.end)) : duration
    if (start > end) {
      if (key === 'start') l.end = start
      else l.start = end
    } else {
      l.start = start
      l.end = end
    }
    next[idx] = l
    setLayers(next)
  }

  return (
    <div className="card p-4">
      <div className="text-sm text-zinc-400 mb-2">Timeline · Duration: {duration}s · Layers: {layers.length}</div>
      <div className="space-y-3">
        {layers.map((l, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-32 text-xs text-zinc-400">Layer {i+1} · {l.type}</div>
            <div className="flex-1 flex items-center gap-2">
              <label className="text-xs text-zinc-500">Start</label>
              <input
                type="range"
                min={0}
                max={duration}
                step={0.1}
                value={typeof (l as any).start === 'number' ? (l as any).start : 0}
                onChange={e=>updateTime(i,'start', parseFloat(e.target.value))}
                className="w-40"
              />
              <span className="text-xs w-10 text-right">{(typeof (l as any).start === 'number' ? (l as any).start : 0).toFixed(1)}s</span>
              <label className="text-xs text-zinc-500 ml-4">End</label>
              <input
                type="range"
                min={0}
                max={duration}
                step={0.1}
                value={typeof (l as any).end === 'number' ? (l as any).end : duration}
                onChange={e=>updateTime(i,'end', parseFloat(e.target.value))}
                className="w-40"
              />
              <span className="text-xs w-10 text-right">{(typeof (l as any).end === 'number' ? (l as any).end : duration).toFixed(1)}s</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}