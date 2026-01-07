'use client'

import React, { useState, PropsWithChildren, FC, useEffect } from 'react'
import { getTodoById } from '@/services/todosFetch'
import { Todo } from '@/type/Todo'
import { TodoContext } from '@/context/task/TodoContext'

interface UserProviderProps {
  id: string
}

export const TodoProvider: FC<PropsWithChildren<UserProviderProps>> = (
  props
) => {
  const { id, children } = props
  const [todo, setTodo] = useState<Todo>()
  const fetchTodo = async (): Promise<Todo> => {
    const fetchedTodo = await getTodoById(id)
    setTodo(fetchedTodo)
    return fetchedTodo
  }
  useEffect(() => {
    fetchTodo().catch(() => {
      console.error('Failed to fetch user')
    })
  }, [id])

  return <TodoContext value={{ todo }}>{children}</TodoContext>
}
