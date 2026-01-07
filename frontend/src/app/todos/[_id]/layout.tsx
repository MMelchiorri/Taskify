'use client'

import { FC, PropsWithChildren } from 'react'
import { UsersProvider } from '@/context/users/UsersProvider'

const Layout: FC<PropsWithChildren> = (props) => {
  const { children } = props
  return (
    <div>
      <UsersProvider>{children}</UsersProvider>
    </div>
  )
}

export default Layout
