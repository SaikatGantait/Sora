import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import templateRoutes from './routes/templates.js'
import projectRoutes from './routes/projects.js'
import renderRoutes from './routes/render.js'
import uploadRoutes from './routes/upload.js'

const app = express()
app.use(express.json({ limit: '10mb' }))
const corsOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3000')
	.split(',')
	.map((s) => s.trim())
	.filter(Boolean)
app.use(cors({ origin: corsOrigins }))

app.get('/api/health', (_req, res) => res.json({ ok: true }))
app.use('/api/auth', authRoutes)
app.use('/api/templates', templateRoutes)
app.use('/api/render', renderRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/projects', projectRoutes)

const port = Number(process.env.PORT || 4000)
app.listen(port, () => console.log(`API at http://localhost:${port}`))

// Dev keepalive: some environments stop background processes when they go "idle".
// Emit a lightweight heartbeat log so the API stays running during local dev.
const keepAliveMs = Number(process.env.KEEPALIVE_MS || 0)
if (keepAliveMs > 0) {
	setInterval(() => {
		console.log(`[api] heartbeat ${new Date().toISOString()}`)
	}, keepAliveMs)
}
