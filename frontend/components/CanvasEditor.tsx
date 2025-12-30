"use client"
import { Stage, Layer as KonvaLayer, Rect, Text, Image as KonvaImage } from 'react-konva'
import useImage from 'use-image'
import { Layer } from '../lib/types'
import { useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import { getApiBase, authFetch } from '../lib/api'

function DraggableImage({ layer, onChange }: { layer: any; onChange: (p: any)=>void }) {
  const [img] = useImage(layer.src || 'https://placekitten.com/300/300')
  return (
    <KonvaImage
      image={img as any}
      x={layer.x}
      y={layer.y}
      width={layer.width}
      height={layer.height}
      draggable
      onDragEnd={(e) => onChange({ x: e.target.x(), y: e.target.y() })}
      onTransformEnd={(e: any) => {
        const node = e.target
        onChange({ x: node.x(), y: node.y(), width: node.width(), height: node.height() })
      }}
    />
  )
}

export default function CanvasEditor({ layers, setLayers }: { layers: Layer[]; setLayers: (l: Layer[])=>void }) {
  const [selected, setSelected] = useState<number | null>(null)
  const { token } = useAuth()

  const updateLayer = (idx: number, patch: any) => {
    const next = layers.slice()
    next[idx] = { ...next[idx] as any, ...patch }
    setLayers(next)
  }

  return (
    <div className="card p-4">
      <div className="text-sm text-zinc-400 mb-3">Canvas Editor</div>
      <Stage width={960} height={540} className="bg-black rounded border border-zinc-800">
        <KonvaLayer>
          {/* Background rect */}
          <Rect x={0} y={0} width={960} height={540} fill="#000" />
          {layers.map((l, i) => {
            if (l.type === 'image') {
              return <DraggableImage key={i} layer={l} onChange={(p)=>updateLayer(i, p)} />
            }
            if (l.type === 'text') {
              return (
                <Text
                  key={i}
                  text={(l as any).text}
                  x={(l as any).x}
                  y={(l as any).y}
                  fontSize={(l as any).fontSize}
                  fill={(l as any).color}
                  draggable
                  onDragEnd={(e)=>updateLayer(i, { x: e.target.x(), y: e.target.y() })}
                  onDblClick={() => {
                    const text = prompt('Edit text', (l as any).text)
                    if (text !== null) updateLayer(i, { text })
                  }}
                />
              )
            }
            return null
          })}
        </KonvaLayer>
      </Stage>
      {/* Image layer uploads */}
      <div className="mt-4 space-y-2">
        <div className="text-sm font-medium">Replace Images</div>
        {layers.map((l, i) => l.type === 'image' ? (
          <div key={i} className="flex items-center gap-3 text-sm">
            <div className="text-zinc-400">Image Layer #{i+1}</div>
            <input
              className="text-xs"
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0]
                if (!file) return
                try {
                  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
                  if (cloudName) {
                    // Ask backend for a signature
                    const signRes = await authFetch(token, `${getApiBase()}/upload/sign`, { method: 'POST' })
                    if (signRes.ok) {
                      const { signature, timestamp, apiKey, folder } = await signRes.json()
                      const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`
                      const form = new FormData()
                      form.append('file', file)
                      form.append('api_key', apiKey)
                      form.append('timestamp', String(timestamp))
                      form.append('signature', signature)
                      form.append('folder', folder || (process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_FOLDER || 'sorastudio'))
                      const up = await fetch(uploadUrl, { method: 'POST', body: form as any })
                      if (up.ok) {
                        const body = await up.json()
                        const url = body.secure_url || body.url
                        if (url) {
                          const next = layers.slice()
                          next[i] = { ...(next[i] as any), src: url }
                          setLayers(next)
                          return
                        }
                      }
                    }
                  }
                  // Fallback to backend mock upload
                  const fd = new FormData()
                  fd.append('file', file)
                  const res = await authFetch(token, `${getApiBase()}/upload/image`, { method: 'POST', body: fd as any })
                  if (!res.ok) return
                  const data = await res.json()
                  const next = layers.slice()
                  next[i] = { ...(next[i] as any), src: data.url }
                  setLayers(next)
                } catch (err) {
                  console.error(err)
                }
              }}
            />
          </div>
        ) : null)}
      </div>
    </div>
  )
}