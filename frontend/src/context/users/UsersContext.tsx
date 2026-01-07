import { createContext } from 'react'
import { User } from '@/type/Users'

export interface UsersContextType {
  users: User[]
}

export const initialState: UsersContextType = {
  users: [],
}

export const UsersContext = createContext<UsersContextType>(initialState)
