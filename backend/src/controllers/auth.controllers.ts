import jwt from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'
import { getUserByEmail } from '../queries/user.query'
import bcrypt from 'bcrypt'

export async function authLogin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { email, password } = req.body
  try {
    const user = await getUserByEmail(email)
    const isValidPassword = user
      ? await bcrypt.compare(password, user.password || '')
      : false

    if (!isValidPassword || !user) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '1h' },
    )
    res.json({ token })
  } catch (error) {
    next(error)
  }
}
