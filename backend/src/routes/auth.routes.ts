import { Router } from 'express'

import { authLogin } from '../controllers/auth.controllers'
import { authSchema } from '../schemas/auth.schema'
import { validate } from '../middlewares/validate'

const router = Router()

router.post('/auth/login', validate(authSchema), authLogin)

export default router
