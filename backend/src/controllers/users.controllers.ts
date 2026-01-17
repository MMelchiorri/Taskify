import type { Request, Response } from 'express'
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
} from '../queries/user.query'

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
    console.log(error)
    res.status(500).json({ error: 'Failed to fetch users' })
  }
}

export async function getUserByIdHandler(
  req: Request,
  res: Response,
  next: Function,
) {
  const { id } = req.params
  try {
    if (!id) {
      res.status(400).json({ error: 'User ID is required' })
      return
    }
    const user = await getUserById(id)
    if (!user) {
      res.status(404).json({ error: 'User not found' })
    }
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

export async function deleteUserByIdHandler(
  req: Request,
  res: Response,
  next: Function,
) {
  const { id } = req.params
  try {
    if (!id) {
      res.status(400).json({ error: 'User ID is required' })
      return
    }
    const user = await deleteUserById(id)
    if (!user) {
      res.status(404).json({ error: 'User not found' })
    }
    res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    next(error)
  }
}
