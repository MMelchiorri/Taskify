import { Router } from 'express'
import {
  createUserHandler,
  getUserByIdHandler,
  getUsersHandler,
  deleteUserByIdHandler,
} from '../controllers/users.controllers'

const router = Router()

router.post('/auth/login', createUserHandler)

export default router
