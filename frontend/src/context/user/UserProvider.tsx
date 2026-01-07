'use client'

import React, { useState, PropsWithChildren, FC, useEffect } from 'react'
import { UserContext } from '@/context'
import { User } from '@/type/Users'
import { getUserById } from '@/services/usersFetch'

interface UserProviderProps {
  id: string
}

export const UserProvider: FC<PropsWithChildren<UserProviderProps>> = (
  props
) => {
  const { id, children } = props
  const [user, setUser] = useState<User>()
  const fetchUser = async (): Promise<User> => {
    const fetchedUser = await getUserById(id)
    setUser(fetchedUser)
    return fetchedUser
  }
  useEffect(() => {
    fetchUser().catch(() => {
      console.error('Failed to fetch user')
    })
  }, [id])

  return <UserContext value={{ user }}>{children}</UserContext>
}
