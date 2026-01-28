import type { Request, Response, NextFunction } from 'express'

import { getTodosUser } from '../queries/todos.query'

export async function getUserTodos(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const posts = await getTodosUser()
    res.json(posts)
  } catch (error) {
    next(error)
  }
}
