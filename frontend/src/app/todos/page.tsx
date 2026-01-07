import TodoTable from '@/sections/todos/tableDataTodos'
import { Suspense } from 'react'
import Loading from '@/app/todos/loading'
import { fetchTodos } from '@/services/todosFetch'
import TodoFilterSearch from '@/sections/TodoFilterSearch'

type PageProps = {
  searchParams: {
    [key: string]: string | string[]
  }
}

export default async function TodoPage({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {}

  const queryParams = new URLSearchParams()
  const url = process.env.NEXT_PUBLIC_TODO_API_BASE_URL

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => queryParams.append(key, v))
    } else {
      queryParams.append(key, value)
    }
  })
  const data = await fetchTodos(`${url}/todos?${queryParams.toString()}`)
  const statusOptions = Object.values(data).map((todo) => todo.status)

  return (
    <Suspense fallback={<Loading />}>
      <TodoFilterSearch
        url={`${process.env.NEXT_PUBLIC_API_BASE_URL}/todos`}
        filter={params}
        statusOptions={statusOptions}
      />
      <TodoTable todos={data} />
    </Suspense>
  )
}
