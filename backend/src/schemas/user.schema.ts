import { z } from 'zod'

export const userSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(6),
})

export type User = z.infer<typeof userSchema>
