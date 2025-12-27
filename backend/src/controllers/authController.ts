import { Request, Response } from 'express'
import { prisma } from '../utils/prisma.js'
import { hashPassword, verifyPassword } from '../services/password.js'
import { signJwt } from '../services/jwt.js'

export async function signup(req: Request, res: Response) {
  const { name, email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' })
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) return res.status(400).json({ error: 'Email in use' })
  const passwordHash = await hashPassword(password)
  const user = await prisma.user.create({ data: { name: name || 'User', email, passwordHash } })
  console.log('[auth] signup ok', email)
  const token = signJwt({ userId: user.id })
  res.json({ token, user: { id: user.id, email: user.email, name: user.name } })
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' })
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    console.log('[auth] login user not found', email)
    return res.status(401).json({ error: 'Invalid credentials' })
  }
  const ok = await verifyPassword(password, user.passwordHash)
  if (!ok) {
    console.log('[auth] login bad password', email)
    return res.status(401).json({ error: 'Invalid credentials' })
  }
  console.log('[auth] login ok', email)
  const token = signJwt({ userId: user.id })
  res.json({ token, user: { id: user.id, email: user.email, name: user.name } })
}
