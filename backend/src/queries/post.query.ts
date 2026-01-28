import { prisma } from '../lib/prisma'
import type { TodoModel } from '../../generated/prisma/models/Todo'

export async function getPostUser(): Promise<TodoModel[]> {
  return prisma.todo.findMany({
    include: { assigned: true },
  })
}
