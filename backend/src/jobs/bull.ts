import { Queue, Worker, Job } from 'bullmq'
import IORedis from 'ioredis'
import { renderVideoMock } from '../services/renderService.js'

const queueName = 'render'

let connection: IORedis | undefined
if (process.env.REDIS_URL) {
  connection = new IORedis(process.env.REDIS_URL)
}

export const renderQueue = connection ? new Queue(queueName, { connection }) : null

// Start a worker in-process when Redis is available
if (connection) {
  new Worker(
    queueName,
    async (job: Job) => {
      // Simulate progress during render
      let prog = 0
      const t = setInterval(async () => {
        prog = Math.min(95, prog + Math.floor(Math.random() * 10) + 1)
        try { await job.updateProgress(prog) } catch {}
      }, 500)
      try {
        const url = await renderVideoMock(job.data)
        clearInterval(t)
        await job.updateProgress(100)
        return { videoUrl: url }
      } catch (e) {
        clearInterval(t)
        throw e
      }
    },
    { connection }
  )
}

export async function enqueueRenderBull(payload: any): Promise<string> {
  if (!renderQueue) throw new Error('Redis not configured')
  const job = await renderQueue.add('render', payload)
  return job.id as string
}

export async function getBullJob(jobId: string) {
  if (!renderQueue) return null
  const job = await renderQueue.getJob(jobId)
  if (!job) return null
  const state = await job.getState()
  const progress = (await job.getProgress()) as number | undefined
  const ret = await job.getState() === 'completed' ? await job.getReturnValue() : null
  return {
    id: jobId,
    status: state === 'waiting' ? 'pending' : state === 'active' ? 'processing' : state as any,
    progress: typeof progress === 'number' ? progress : state === 'completed' ? 100 : 0,
    videoUrl: ret?.videoUrl || null,
  }
}
