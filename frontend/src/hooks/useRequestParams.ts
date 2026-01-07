'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type RequestParamsHooksType = {
  url: string
  filter?: Record<string, string | undefined>
}

const useRequestParams = ({ url, filter = {} }: RequestParamsHooksType) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleRequestParams = () => {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(filter).forEach(([key, value]) => {
      if (value && value !== '') {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })

    router.push(`${pathname}?${params.toString()}`)
  }

  /**
   */
  const deleteUrlParam = (key: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete(key)
    router.push(`${pathname}?${params.toString()}`)
  }

  return {
    handleRequestParams,
    deleteUrlParam,
  }
}

export default useRequestParams
