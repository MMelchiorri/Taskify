import { Todo } from '@/type/Todo'

export async function fetchTodos(url: string): Promise<Todo[]> {
  try {
    const res = await fetch(`${url}`, {
      cache: 'no-store',
    })
    const data: Todo[] = await res.json()
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error('Error fetching todos:', error)
    return []
  }
}

export async function postTodo(todo: {
  name: string
  description: string
  completed: boolean
  category: string
  assignedTo: string
  dueDate: Date | undefined
  reminder: boolean
  reminderDate: Date | undefined
  createdAt: Date
  priority: string
  status: string
  tags: string[]
}): Promise<Todo | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_TODO_API_BASE_URL}/todos`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
        cache: 'no-store',
      }
    )
    return await res.json()
  } catch (error) {
    console.error('Error posting todo:', error)
    return null
  }
}

export const deleteTodo = async (id: string): Promise<void> => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_TODO_API_BASE_URL}/todos/${id}`, {
      method: 'DELETE',
      cache: 'no-store',
    })
  } catch (error) {
    console.error('Error deleting todo:', error)
  }
}

export const getTodoById = async (id: string): Promise<Todo> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_TODO_API_BASE_URL}/todos/${id}`,
      {
        method: 'GET',
        cache: 'no-store',
      }
    )
    return await res.json()
  } catch (error) {
    console.error('Error fetching todo:', error)
    return {} as Todo
  }
}

export const updateTodoById = async (
  id: string,
  todo: {
    name: string
    description: string
    completed: boolean
    category: string
    assignedTo: string
    dueDate: Date | undefined
    reminder: boolean
    reminderDate: Date | undefined
    createdAt: Date
    priority: 'low' | 'medium' | 'high'
    status: 'todo' | 'in-progress' | 'done'
    tags: string[]
  }
): Promise<Todo> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_TODO_API_BASE_URL}/todos/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(todo),
        cache: 'no-store',
      }
    )
    return await res.json()
  } catch (error) {
    console.error('Error fetching todo:', error)
    return {} as Todo
  }
}
