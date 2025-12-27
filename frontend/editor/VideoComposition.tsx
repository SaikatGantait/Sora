import React from 'react'
import { AbsoluteFill, Sequence } from 'remotion'
import { Template } from '../lib/types'

export function VideoComposition({ template }: { template: Template }) {
  const { duration, layers } = template
  return (
    <AbsoluteFill style={{ backgroundColor: 'black', color: 'white' }}>
      {layers.map((l, idx) => {
        const fps = 30
        if (l.type === 'text') {
          const tl = l as any
          const start = typeof tl.start === 'number' ? tl.start : 0
          const end = typeof tl.end === 'number' ? tl.end : duration
          return (
            <Sequence key={idx} from={Math.floor(start * fps)} durationInFrames={Math.max(1, Math.floor((end - start) * fps))}>
              <div style={{ position: 'absolute', left: tl.x, top: tl.y, fontSize: tl.fontSize, color: tl.color }}>{tl.text}</div>
            </Sequence>
          )
        }
        if (l.type === 'image') {
          const il = l as any
          const start = typeof il.start === 'number' ? il.start : 0
          const end = typeof il.end === 'number' ? il.end : duration
          return (
            <Sequence key={idx} from={Math.floor(start * fps)} durationInFrames={Math.max(1, Math.floor((end - start) * fps))}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={il.src || 'https://placekitten.com/300/300'} alt="img" style={{ position: 'absolute', left: il.x, top: il.y, width: il.width, height: il.height }} />
            </Sequence>
          )
        }
        return null
      })}
    </AbsoluteFill>
  )
}

export default VideoComposition