import { ValidationError, NotFoundError } from '../errors'

import type { Request, Response, NextFunction } from 'express'

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ValidationError) {
    return res.status(400).json({ error: err.message })
  }

  if (err instanceof NotFoundError) {
    return res.status(404).json({ error: err.message })
  }

  console.error(err)

  return res.status(500).json({ error: 'Internal Server Error' })
}

export default errorHandler
