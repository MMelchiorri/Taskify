import usersRoutes from './users.routes'
import authRoutes from './auth.routes'
import { Router } from 'express'

const router = Router()

router.use(usersRoutes)
router.use(authRoutes)

export default router
