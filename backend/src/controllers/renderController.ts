import { Request, Response } from 'express'
import { addRenderJob, getJob } from '../jobs/queue.js'

export async function enqueueRender(req: Request, res: Response) {
  const { template } = req.body
  if (!template) return res.status(400).json({ error: 'Missing template' })
  const jobId = await addRenderJob({ template })
  res.json({ jobId })
}

export async function getRenderStatus(req: Request, res: Response) {
  const { jobId } = req.params
  const job = getJob(jobId)
  if (!job) return res.status(404).json({ error: 'Not found' })
  res.json({ status: job.status, videoUrl: job.videoUrl || null })
}
