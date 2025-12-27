"use client"
import { Player } from '@remotion/player'
import VideoComposition from '../editor/VideoComposition'
import { Template } from '../lib/types'
import { useEffect, useMemo, useRef, useState } from 'react'

export default function RemotionPreview({ template, frame, setFrame }: { template: Template; frame: number; setFrame: (f: number)=>void }) {
  const fps = 30
  const durationInFrames = useMemo(() => (template.duration || 10) * fps, [template.duration])
  const playerRef = useRef<any>(null)
  const [playing, setPlaying] = useState(false)

  const fmt = (f: number) => {
    const secs = Math.floor(f / fps)
    const m = Math.floor(secs / 60).toString().padStart(2, '0')
    const s = (secs % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  return (
    <div className="card p-3">
      <div className="text-sm text-zinc-400 mb-2">Live Preview</div>
      <Player
        ref={playerRef}
        component={VideoComposition as any}
        inputProps={{ template }}
        durationInFrames={durationInFrames}
        compositionWidth={960}
        compositionHeight={540}
        fps={fps}
        controls
        onFrameUpdate={(f)=>{
          if (Math.abs(f - frame) > 0) setFrame(f)
        }}
        style={{ width: '100%', borderRadius: 8, overflow: 'hidden' }}
      />
      {/** Seek player when external frame changes */}
      {/** This keeps Player in sync if Timeline or external control seeks */}
      <SyncPlayer playerRef={playerRef} frame={frame} />
      <div className="mt-3 flex items-center gap-3">
        <button
          className="btn btn-secondary"
          onClick={() => {
            if (!playerRef.current) return
            if (playing) {
              playerRef.current.pause()
              setPlaying(false)
            } else {
              playerRef.current.play()
              setPlaying(true)
            }
          }}
        >{playing ? 'Pause' : 'Play'}</button>
        <input
          type="range"
          min={0}
          max={durationInFrames}
          value={frame}
          onChange={(e)=>{
            const f = Number(e.target.value)
            setFrame(f)
            playerRef.current?.seekTo(f)
          }}
          className="flex-1"
        />
        <div className="text-xs text-zinc-400 w-20 text-right">{fmt(frame)} / {fmt(durationInFrames)}</div>
      </div>
    </div>
  )
}

function SyncPlayer({ playerRef, frame }: { playerRef: any; frame: number }) {
  const last = useRef<number>(-1)
  useEffect(() => {
    if (!playerRef.current) return
    if (last.current !== frame) {
      playerRef.current.seekTo(frame)
      last.current = frame
    }
  }, [frame, playerRef])
  return null
}