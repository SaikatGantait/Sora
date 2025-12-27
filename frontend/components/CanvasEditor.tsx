"use client"
import { Stage, Layer as KonvaLayer, Rect, Text, Image as KonvaImage } from 'react-konva'
import useImage from 'use-image'
import { Layer } from '../lib/types'
import { useState } from 'react'

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
    </div>
  )
}