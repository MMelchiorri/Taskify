import { prisma } from '../lib/prisma'
import type { PostModel } from '../../generated/prisma/models/Post'
import bcrypt from 'bcrypt'

export async function getPostUser(): Promise<PostModel[]> {
  return prisma.post.findMany({
    include: { author: true },
  })
}
