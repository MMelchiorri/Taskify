'use client'
import { useEffect, useState } from 'react'
import { fetchTodos } from '@/services/todosFetch'
import { Todo } from '@/type/Todo'

export const useFetchTodos = (url: string) => {
  const [data, setData] = useState<Todo[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchTodos(url)
        setData(response)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [url])

  return data
}
