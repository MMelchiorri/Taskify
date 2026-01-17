import { Router } from 'express'

import { authLogin } from '../controllers/auth.controllers'

const router = Router()

router.post('/auth/login', authLogin)

export default router
