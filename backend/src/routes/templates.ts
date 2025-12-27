import { Router } from 'express'
import { listTemplates, getTemplate, createTemplate } from '../controllers/templateController.js'
import { authMiddleware } from '../services/jwt.js'

const router = Router()
router.get('/', listTemplates)
router.get('/:id', getTemplate)
router.post('/', authMiddleware, createTemplate)

export default router
