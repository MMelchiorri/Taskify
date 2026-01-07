import { getTodoById } from '@/services/todosFetch'
import TodoForm from '@/sections/todos/FormDataTodos'

export default async function Page({ params }: { params: { _id: string } }) {
  const { _id } = await params
  const todo = await getTodoById(_id)

  return <TodoForm todo={todo} />
}
