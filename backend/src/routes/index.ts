import usersRoutes from './users.routes'
import authRoutes from './auth.routes'
import postRoutes from './post.routes'
import { Router } from 'express'

const router = Router()

router.use(usersRoutes)
router.use(authRoutes)
router.use(postRoutes)

export default router
