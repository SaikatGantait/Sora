import { Router } from 'express'
import multer from 'multer'
import { authMiddleware } from '../services/jwt.js'
import { uploadImage, signUpload } from '../controllers/uploadController.js'

const upload = multer({ dest: 'tmp/' })
const router = Router()

router.post('/image', authMiddleware, upload.single('file'), uploadImage)
router.post('/sign', authMiddleware, signUpload)

export default router
