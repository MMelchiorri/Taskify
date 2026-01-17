import { prisma } from '../lib/prisma'
import type { UserModel } from '../../generated/prisma/models/User'
import bcrypt from 'bcrypt'

export async function createUser(user: UserModel) {
  const hashed = user.password ? await bcrypt.hash(user.password, 12) : null

  return prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      password: hashed,
    },
  })
}

export async function getAllUsers(): Promise<UserModel[]> {
  return prisma.user.findMany({
    include: {
      posts: true,
    },
  })
}

export async function getUserById(id: string): Promise<UserModel> {
  return prisma.user.findUniqueOrThrow({
    where: { id },
    include: {
      posts: true,
    },
  })
}

export async function deleteUserById(id: string): Promise<UserModel> {
  return prisma.user.delete({
    where: { id },
  })
}
