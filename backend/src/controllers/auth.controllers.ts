import jwt from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'
import { getUserByEmail, getUserById } from '../queries/user.query'
import bcrypt from 'bcrypt'
import { authSchema } from '../schemas/auth.schema'
import { refreshTokenService } from '../services/refreshToken.service'
import {
  createRefreshToken,
  deleteRefreshToken,
  getRefreshToken,
} from '../queries/token.query'

export async function authLogin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email, password } = authSchema.parse(req.body)

    const user = await getUserByEmail(email)
    const isValidPassword = user
      ? await bcrypt.compare(password, user.password || '')
      : false

    if (!isValidPassword || !user) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const accessToken = jwt.sign(
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

    res
      .cookie('refreshToken', refreshToken.token, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: refreshToken.expiresIn * 1000,
      })
      .json({ accessToken })
  } catch (error) {
    next(error)
  }
}

export async function authLogout(req: Request, res: Response) {
  try {
    const refreshToken = req.cookies?.refreshToken
    console.log('Refresh Token from Cookie:', refreshToken)
    if (!refreshToken) return res.sendStatus(204)
    const payload = jwt.verify(
      refreshToken,
      process.env.JWT_SECRET_REFRESH_TOKEN!,
    ) as jwt.JwtPayload
    if (!payload.jti) {
      return res.sendStatus(204)
    }
    const storedToken = await getRefreshToken(payload.jti)
    if (!storedToken) return res.sendStatus(204)

    await deleteRefreshToken(storedToken.id)
    res.clearCookie('refreshToken')
    res.status(200).json({ message: 'Logged out successfully' })
  } catch (error) {
    res.sendStatus(204)
  }
}

export async function authRefreshToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const refreshToken = req.cookies?.refreshToken
    if (!refreshToken) {
      return res.status(401).json({ error: 'No refresh token provided' })
    }

    const payload = jwt.verify(
      refreshToken,
      process.env.JWT_SECRET_REFRESH_TOKEN!,
    ) as jwt.JwtPayload

    if (!payload.jti) {
      return res.status(401).json({ error: 'Invalid refresh token' })
    }

    const storedToken = await getRefreshToken(payload.jti)
    if (!storedToken) {
      return res.status(401).json({ error: 'Refresh token not found' })
    }

    const isValidToken = await bcrypt.compare(
      refreshToken,
      storedToken.hashedToken,
    )
    if (!isValidToken) {
      return res.status(401).json({ error: 'Invalid refresh token' })
    }

    const user = await getUserById(storedToken.userId)
    if (!user) {
      return res.status(401).json({ error: 'User not found' })
    }

    const newAccessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '15m' },
    )

    res.json({ accessToken: newAccessToken })
  } catch (error) {
    next(error)
  }
}
