import { Router } from 'express'
import {
  createUserHandler,
  getUserByIdHandler,
  getUsersHandler,
  deleteUserByIdHandler,
} from '../controllers/users.controllers'
import { userSchema } from '../schemas/user.schema'
import { validateMiddleware } from '../middlewares/validate.middleware'

const router = Router()

router.post('/users', validateMiddleware(userSchema), createUserHandler)
router.get('/users', getUsersHandler)
router.get('/users/:id', getUserByIdHandler)
router.delete('/users/:id', deleteUserByIdHandler)

export default router
