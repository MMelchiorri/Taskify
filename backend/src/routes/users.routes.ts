import {
  createUserHandler,
  getUsersHandler,
} from '../controllers/users.controllers'
import type { Request, Response } from 'express'
import { userSchema } from '../schemas/user.schema'
import z from 'zod'

export type HttpMethod = 'get' | 'post' | 'put' | 'delete'

export interface Route {
  path: string
  method: HttpMethod
  schema?: z.ZodSchema
  service: (req: Request, res: Response) => Promise<void>
}

const userRoutes: Route[] = [
  {
    path: '/users',
    method: 'post',
    schema: userSchema,
    service: createUserHandler,
  },
  {
    path: '/users',
    method: 'get',
    service: getUsersHandler,
  },
]

export default userRoutes
