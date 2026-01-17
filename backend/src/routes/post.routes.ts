import { Router } from 'express'
import { getUserPosts } from '../controllers/post.controllers'
import { validateMiddleware } from '../middlewares/validate.middleware'
import { authorizedMiddleware } from '../middlewares/authorized.middleware'
const router = Router()

router.get('/posts', authorizedMiddleware, getUserPosts)

export default router
