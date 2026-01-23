import { Router } from 'express'

import {
  authLogin,
  authLogout,
  authRefreshToken,
  authRotateToken,
} from '../controllers/auth.controllers'
import { authSchema } from '../schemas/auth.schema'
import { validateMiddleware } from '../middlewares/validate.middleware'

const router = Router()

router.post('/auth/login', validateMiddleware(authSchema), authLogin)
router.delete('/auth/logout', authLogout)
router.post('/auth/refresh', authRefreshToken)
router.post('/auth/rotate', authRotateToken)

export default router
