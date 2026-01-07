import TodoForm from '@/sections/todos/FormDataTodos'
import { UsersProvider } from '@/context/users/UsersProvider'

export default async function TodoCreatePage() {
  return (
    <UsersProvider>
      <TodoForm />
    </UsersProvider>
  )
}
