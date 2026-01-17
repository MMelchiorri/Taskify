import jwt from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'

import { getUserByEmail } from '../queries/user.query'

export async function authLogin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = await getUserByEmail(req.body.email)
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
}
