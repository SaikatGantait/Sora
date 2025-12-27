import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import templateRoutes from './routes/templates.js'
import renderRoutes from './routes/render.js'

const app = express()
app.use(express.json({ limit: '10mb' }))
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000' }))

app.get('/api/health', (_req, res) => res.json({ ok: true }))
app.use('/api/auth', authRoutes)
app.use('/api/templates', templateRoutes)
app.use('/api/render', renderRoutes)

const port = Number(process.env.PORT || 4000)
app.listen(port, () => console.log(`API at http://localhost:${port}`))
