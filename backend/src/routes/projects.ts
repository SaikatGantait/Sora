import { Router } from 'express'
import { authMiddleware } from '../services/jwt.js'
import { createProject, getProject, listMyProjects, deleteProject } from '../controllers/projectController.js'

const router = Router()
router.get('/', authMiddleware, listMyProjects)
router.get('/:id', authMiddleware, getProject)
router.post('/', authMiddleware, createProject)
router.delete('/:id', authMiddleware, deleteProject)

export default router
