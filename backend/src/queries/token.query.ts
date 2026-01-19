import { prisma } from '../lib/prisma'
import type { RefreshTokenModel } from '../../generated/prisma/models/RefreshToken'

export async function getRefreshToken(
  id: string,
): Promise<RefreshTokenModel | null> {
  return prisma.refreshToken.findUnique({
    where: { id },
  })
}

export async function createRefreshToken(
  id: string,
  userId: string,
  hashedToken: string,
  expiresAt: Date,
): Promise<RefreshTokenModel> {
  return prisma.refreshToken.create({
    data: {
      id,
      userId,
      hashedToken,
      expiresAt,
    },
  })
}
