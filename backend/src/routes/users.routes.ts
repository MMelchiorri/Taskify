import {
  createUserHandler,
  getUserByIdHandler,
  getUsersHandler,
  deleteUserByIdHandler,
} from '../controllers/users.controllers'
import type { NextFunction, Request, Response } from 'express'
import { userSchema } from '../schemas/user.schema'
import z from 'zod'

export type HttpMethod = 'get' | 'post' | 'put' | 'delete'

export interface Route {
  path: string
  method: HttpMethod
  schema?: z.ZodSchema
  handler: (req: Request, res: Response, next: NextFunction) => Promise<void>
}

const userRoutes: Route[] = [
  {
    path: '/users',
    method: 'post',
    schema: userSchema,
    handler: createUserHandler,
  },
  {
    path: '/users',
    method: 'get',
    handler: getUsersHandler,
  },
  {
    path: '/users/:id',
    method: 'get',
    handler: getUserByIdHandler,
  },
  {
    path: '/users/:id',
    method: 'delete',
    handler: deleteUserByIdHandler,
  },
]

export default userRoutes
