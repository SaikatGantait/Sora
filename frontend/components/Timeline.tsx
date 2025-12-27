"use client"
import { useEffect, useRef, useState } from 'react'
import { Layer } from '../lib/types'

type Props = {
  duration: number
  layers: Layer[]
  setLayers: (l: Layer[])=>void
  currentFrame: number
  setCurrentFrame: (f: number)=>void
}

export default function Timeline({ duration, layers, setLayers, currentFrame, setCurrentFrame }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [drag, setDrag] = useState<null | { idx: number; handle: 'start'|'end' }>(null)
  const fps = 30

  const pxToSeconds = (x: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    const w = rect?.width || 1
    const clamped = Math.max(0, Math.min(w, x - (rect?.left || 0)))
    return (clamped / w) * duration
  }

  const secondsToPx = (s: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    const w = rect?.width || 1
    const clamped = Math.max(0, Math.min(duration, s))
    return (clamped / duration) * w
  }

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

  useEffect(() => {
    const onMove = (ev: MouseEvent) => {
      if (!drag) return
      const sec = pxToSeconds(ev.clientX)
      updateTime(drag.idx, drag.handle, sec)
    }
    const onUp = () => setDrag(null)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [drag, layers, duration])

  return (
    <div className="card p-4">
      <div className="text-sm text-zinc-400 mb-2">Timeline · Duration: {duration}s · Layers: {layers.length}</div>
      <div
        ref={containerRef}
        className="relative h-24 w-full rounded border border-zinc-800 bg-zinc-900/60"
        onMouseDown={(e) => {
          // Seek to clicked position
          const sec = pxToSeconds(e.clientX)
          const f = Math.floor(sec * fps)
          setCurrentFrame(f)
        }}
      >
        {/* Current time indicator */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-accent"
          style={{ left: `${(currentFrame / (duration * fps)) * 100}%` }}
        />

        {/* Layer clips */}
        {layers.map((l, i) => {
          const start = typeof (l as any).start === 'number' ? (l as any).start : 0
          const end = typeof (l as any).end === 'number' ? (l as any).end : duration
          const left = `${(start / duration) * 100}%`
          const width = `${Math.max(0, (end - start) / duration) * 100}%`
          return (
            <div key={i} className="absolute left-0 right-0" style={{ top: 6 + i * 18 }}>
              <div className="relative h-3 rounded bg-zinc-800">
                <div className="absolute h-3 rounded bg-primary/70" style={{ left, width }}>
                  {/* Start handle */}
                  <div
                    className="absolute -left-1 top-0 h-3 w-2 bg-white/80 cursor-ew-resize rounded"
                    onMouseDown={(e)=>{ e.stopPropagation(); setDrag({ idx: i, handle: 'start' }) }}
                  />
                  {/* End handle */}
                  <div
                    className="absolute -right-1 top-0 h-3 w-2 bg-white/80 cursor-ew-resize rounded"
                    onMouseDown={(e)=>{ e.stopPropagation(); setDrag({ idx: i, handle: 'end' }) }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-2 text-xs text-zinc-500">Click timeline to seek. Drag white handles to adjust start/end.</div>
    </div>
  )
}