import { randomUUID } from 'crypto'
import { renderVideoMock } from '../services/renderService.js'
import { enqueueRenderBull, getBullJob, renderQueue } from './bull.js'

// In-memory queue fallback with progress. For real usage, integrate BullMQ + Redis.
type Job = { id: string; status: 'pending'|'processing'|'completed'|'failed'; progress: number; videoUrl?: string }
const jobs = new Map<string, Job>()

export async function addRenderJob(payload: any) {
  // If Redis/BullMQ configured, use it
  if (renderQueue) {
    return enqueueRenderBull(payload)
  }
  const id = randomUUID()
  const job: Job = { id, status: 'pending', progress: 0 }
  jobs.set(id, job)
  // simulate async processing with progress
  setTimeout(async () => {
    const j = jobs.get(id)
    if (!j) return
    j.status = 'processing'
    j.progress = 5
    jobs.set(id, j)
    const timer = setInterval(() => {
      const cur = jobs.get(id)
      if (!cur || cur.status !== 'processing') { clearInterval(timer); return }
      cur.progress = Math.min(95, (cur.progress || 0) + Math.floor(Math.random() * 10) + 1)
      jobs.set(id, cur)
    }, 500)
    try {
      const url = await renderVideoMock(payload)
      clearInterval(timer)
      const done = jobs.get(id)
      if (!done) return
      done.status = 'completed'
      done.progress = 100
      done.videoUrl = url
      jobs.set(id, done)
    } catch {
      clearInterval(timer)
      const fail = jobs.get(id)
      if (!fail) return
      fail.status = 'failed'
      fail.progress = 0
      jobs.set(id, fail)
    }
  }, 300)
  return id
}

export function getJob(id: string) {
  if (renderQueue) {
    // Return a promise-like object; controller awaits if needed
    // Here, to keep API compatible, return a placeholder and let controller handle async
    return { id, status: 'pending', progress: 0, __bull: true } as any
  }
  return jobs.get(id)
}

// Helper for controllers to resolve BullMQ job info when enabled
export async function resolveJobStatus(jobId: string) {
  if (renderQueue) {
    return await getBullJob(jobId)
  }
  return jobs.get(jobId)
}
