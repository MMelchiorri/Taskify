import type { Request, Response, NextFunction } from 'express'

import { getPostUser } from '../queries/post.query'

export async function getUserTodos(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const posts = await getPostUser()
    res.json(posts)
  } catch (error) {
    next(error)
  }
}
