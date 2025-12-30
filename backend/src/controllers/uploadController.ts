import { Request, Response } from 'express'
import { uploadImageMock } from '../services/cloudinary.js'
import { createSignature } from '../services/cloudinaryReal.js'

export async function uploadImage(req: Request, res: Response) {
  const file = (req as any).file as Express.Multer.File | undefined
  if (!file) return res.status(400).json({ error: 'No file' })
  // In a real impl, send file.path to Cloudinary and delete local temp
  const url = await uploadImageMock(file.path)
  res.json({ url })
}

export async function signUpload(_req: Request, res: Response) {
  try {
    const s = createSignature()
    if (!s) return res.status(400).json({ error: 'Cloudinary not configured' })
    res.json(s)
  } catch (e) {
    res.status(500).json({ error: 'Failed to sign' })
  }
}
