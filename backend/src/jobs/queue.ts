import { randomUUID } from 'crypto'
import { renderVideoMock } from '../services/renderService.js'

// In-memory queue fallback. For real usage, integrate BullMQ + Redis.
type Job = { id: string; status: 'pending'|'processing'|'completed'|'failed'; videoUrl?: string }
const jobs = new Map<string, Job>()

export async function addRenderJob(payload: any) {
  const id = randomUUID()
  jobs.set(id, { id, status: 'pending' })
  // simulate async processing
  setTimeout(async () => {
    const job = jobs.get(id)
    if (!job) return
    job.status = 'processing'
    try {
      const url = await renderVideoMock(payload)
      job.status = 'completed'
      job.videoUrl = url
    } catch {
      job.status = 'failed'
    }
    jobs.set(id, job)
  }, 500)
  return id
}

export function getJob(id: string) {
  return jobs.get(id)
}
