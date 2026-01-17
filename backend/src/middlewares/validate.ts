import type { Request, Response, NextFunction } from 'express'
import z from 'zod'

export const validate =
  (schema: z.ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('Validating request body:', req.body)
      schema.parse(req.body)
      next()
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        console.log(error.message)
        return res.status(400).json({
          message: 'Validation Error',
          errors: error.message,
        })
      }
      next(error)
    }
  }
