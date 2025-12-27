import { Request, Response } from 'express'
import { prisma } from '../utils/prisma.js'

export async function listMyProjects(req: Request, res: Response) {
  const userId = (req as any).userId as string
  const projects = await prisma.project.findMany({ where: { userId }, orderBy: { updatedAt: 'desc' } })
  res.json({ projects })
}

export async function getProject(req: Request, res: Response) {
  const userId = (req as any).userId as string
  const { id } = req.params
  const project = await prisma.project.findFirst({ where: { id, userId } })
  if (!project) return res.status(404).json({ error: 'Not found' })
  let parsed: any = undefined
  try { parsed = JSON.parse(project.data) } catch { parsed = null }
  res.json({ project: { ...project, data: parsed } })
}

export async function createProject(req: Request, res: Response) {
  const userId = (req as any).userId as string
  const { name, templateId, data } = req.body as { name: string; templateId: string; data: any }
  if (!name || !templateId || !data) return res.status(400).json({ error: 'Missing fields' })
  const project = await prisma.project.create({ data: { name, templateId, data: JSON.stringify(data), userId } })
  res.json({ project })
}
