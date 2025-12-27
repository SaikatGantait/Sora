"use client"
import { Player } from '@remotion/player'
import VideoComposition from '../editor/VideoComposition'
import { Template } from '../lib/types'

export default function RemotionPreview({ template }: { template: Template }) {
  return (
    <div className="card p-3">
      <div className="text-sm text-zinc-400 mb-2">Live Preview</div>
      <Player
        component={VideoComposition as any}
        inputProps={{ template }}
        durationInFrames={(template.duration || 10) * 30}
        compositionWidth={960}
        compositionHeight={540}
        fps={30}
        controls
        style={{ width: '100%', borderRadius: 8, overflow: 'hidden' }}
      />
    </div>
  )
}