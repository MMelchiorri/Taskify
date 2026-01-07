import { createContext } from 'react'
import { User } from '@/type/Users'

export interface UserContextType {
  user?: User
}

export const initialState: UserContextType = {
  user: undefined,
}

export const UserContext = createContext<UserContextType>(initialState)
