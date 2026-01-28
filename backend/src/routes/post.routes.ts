import { Router } from 'express'
import { getUserTodos } from '../controllers/post.controllers'
import { validateMiddleware } from '../middlewares/validate.middleware'
import { authorizedMiddleware } from '../middlewares/authorized.middleware'
const router = Router()

router.get('/todos', authorizedMiddleware, getUserTodos)

export default router
