import { Router } from 'express'

import {
  authLogin,
  authLogout,
  authRefreshToken,
} from '../controllers/auth.controllers'
import { authSchema } from '../schemas/auth.schema'
import { validateMiddleware } from '../middlewares/validate.middleware'

const router = Router()

router.post('/auth/login', validateMiddleware(authSchema), authLogin)
router.delete('/auth/logout', authLogout)
router.post('/auth/refresh', authRefreshToken)

export default router
