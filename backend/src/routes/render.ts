import { Router } from 'express'
import { authMiddleware } from '../services/jwt.js'
import { enqueueRender, getRenderStatus } from '../controllers/renderController.js'

const router = Router()
router.post('/', authMiddleware, enqueueRender)
router.get('/:jobId', authMiddleware, getRenderStatus)

export default router
