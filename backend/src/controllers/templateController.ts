import { Request, Response } from 'express'
import { prisma } from '../utils/prisma.js'

export async function listTemplates(_req: Request, res: Response) {
  const templates = await prisma.template.findMany({ where: { published: true }, orderBy: { createdAt: 'desc' } })
  const parsed = templates.map((t) => ({ ...t, layers: safeParse(t.layers) }))
  res.json({ templates: parsed })
}

export async function getTemplate(req: Request, res: Response) {
  const { id } = req.params
  const template = await prisma.template.findUnique({ where: { id } })
  if (!template) return res.status(404).json({ error: 'Not found' })
  res.json({ template: { ...template, layers: safeParse(template.layers) } })
}

export async function createTemplate(req: Request, res: Response) {
  const data = req.body
  if (!data.id || !data.name || !Array.isArray(data.layers)) return res.status(400).json({ error: 'Invalid template' })
  const tpl = await prisma.template.upsert({
    where: { id: data.id },
    update: { name: data.name, duration: data.duration || 10, layers: JSON.stringify(data.layers), previewUrl: data.previewUrl || '', published: true, creatorName: data.creatorName || 'Creator' },
    create: { id: data.id, name: data.name, duration: data.duration || 10, layers: JSON.stringify(data.layers), previewUrl: data.previewUrl || '', published: true, creatorName: data.creatorName || 'Creator' }
  })
  res.json({ template: { ...tpl, layers: safeParse(tpl.layers) } })
}

function safeParse(s: string) {
  try { return JSON.parse(s) } catch { return [] }
}
