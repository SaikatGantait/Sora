import React from 'react'
import { AbsoluteFill, Sequence } from 'remotion'
import { Template, Layer } from '../lib/types'

export function VideoComposition({ template }: { template: Template }) {
  const { duration, layers } = template
  return (
    <AbsoluteFill style={{ backgroundColor: 'black', color: 'white' }}>
      {layers.map((l, idx) => {
        if (l.type === 'text') {
          const tl = l as any
          return (
            <Sequence key={idx} from={0} durationInFrames={duration * 30}>
              <div style={{ position: 'absolute', left: tl.x, top: tl.y, fontSize: tl.fontSize, color: tl.color }}>{tl.text}</div>
            </Sequence>
          )
        }
        if (l.type === 'image') {
          const il = l as any
          return (
            <Sequence key={idx} from={0} durationInFrames={duration * 30}>
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