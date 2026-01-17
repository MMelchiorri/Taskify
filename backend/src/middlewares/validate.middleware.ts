import type { Request, Response, NextFunction } from 'express'
import z from 'zod'

export const validateMiddleware =
  (schema: z.ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body)
      next()
    } catch (error: any) {
      next(error)
    }
  }
