import { createContext } from 'react'
import { Todo } from '@/type/Todo'

export interface TodoContextType {
  todo?: Todo
}

export const initialState: TodoContextType = {
  todo: undefined,
}

export const TodoContext = createContext<TodoContextType>(initialState)
