import jwt from 'jsonwebtoken'

import type { Request, Response, NextFunction } from 'express'

export const authorizedMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' })
  }

  const token = authHeader.split(' ')[1]
  if (!token) {
    return res.status(401).json({ error: 'Token missing' })
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'secretkey',
    ) as jwt.JwtPayload
    console.log(decoded)
    next()
  }