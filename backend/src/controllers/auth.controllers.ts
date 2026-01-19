import jwt from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'
import { getUserByEmail } from '../queries/user.query'
import bcrypt from 'bcrypt'
import { authSchema } from '../schemas/auth.schema'
import { refreshTokenService } from '../services/refreshToken.service'
import { createRefreshToken } from '../queries/token.query'

export async function authLogin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { email, password } = authSchema.parse(req.body)

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
      process.env.JWT_SECRET!,
      { expiresIn: '15m' },
    )
    const refreshToken = refreshTokenService()
    const hashedRefreshToken = await bcrypt.hash(refreshToken.token, 10)

    await createRefreshToken(
      refreshToken.jti,
      user.id,
      hashedRefreshToken,
      new Date(Date.now() + refreshToken.expiresIn * 1000),
    )

    res.json({ token })
  } catch (error) {
    next(error)
  }
}
