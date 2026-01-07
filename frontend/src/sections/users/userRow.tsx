'use client'

import { memo } from 'react'
import { TableCell, TableRow } from '@mui/material'
import dayjs from 'dayjs'
import DeleteButton from '@/sections/users/DeleteButton'
import DetailButton from '@/sections/users/DetailButton'
import { User } from '@/type/Users'

type TodoRowProps = {
  id: string
  user: User
  keys: (keyof User)[]
  handleDelete: (id: string) => void | Promise<void>
  handleNavigate: (id: string) => void | Promise<void>
}

function UserRow(props: TodoRowProps) {
  const { user, handleDelete, handleNavigate, keys } = props
  return (
    <TableRow key={user.id}>
      {keys.map((key) => (
        <TableCell key={key}>
          {typeof user[key] === 'string' && dayjs(user[key]).isValid()
            ? dayjs(user[key]).format('DD/MM/YYYY')
            : user[key]?.toString()}
        </TableCell>
      ))}
      <TableCell sx={{ textAlign: 'center' }}>
        <DeleteButton id={user._id} onDelete={handleDelete} />
      </TableCell>
      <TableCell sx={{ textAlign: 'center' }}>
        <DetailButton id={user._id} handleNavigate={handleNavigate} />
      </TableCell>
    </TableRow>
  )
}

export default memo(UserRow)
