import type { Request, Response } from 'express'
import { createUser, getAllUsers } from '../queries/user.query'

export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body)
    res.status(201).json(user)
  } catch (error) {
    res
      .status(500)
      .json({ error: error instanceof Error ? error.message : error })
  }
}

export async function getUsersHandler(req: Request, res: Response) {
  try {
    const users = await getAllUsers()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' })
  }
}
