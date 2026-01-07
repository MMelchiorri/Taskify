'use client'

import { useEffect, useState } from 'react'
import { User } from '@/type/Users'
import { fetchUsers } from '@/services/usersFetch'

export const useFetch = (url: string) => {
  const [data, setData] = useState<User[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUsers(url)
        setData(response)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [url])

  return data
}
