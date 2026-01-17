import { Router } from 'express'

import { authLogin } from '../controllers/auth.controllers'
import { authSchema } from '../schemas/auth.schema'
import { validateMiddleware } from '../middlewares/validate.middleware'

const router = Router()

router.post('/auth/login', validateMiddleware(authSchema), authLogin)

export default router
