import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET || 'secret'

export function signJwt(payload: any) {
  return jwt.sign(payload, secret, { expiresIn: '7d' })
}

export function verifyJwt(token: string) {
  try {
    return jwt.verify(token, secret) as any
  } catch {
    return null
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return res.status(401).json({ error: 'Unauthorized' })
  const decoded = verifyJwt(token)
  if (!decoded) return res.status(401).json({ error: 'Unauthorized' })
  ;(req as any).userId = decoded.userId
  next()
}
