'use client'

import DeleteIcon from '@mui/icons-material/Delete'
import { memo } from 'react'

type Props = {
  onDelete: (id: string) => void | Promise<void>
  id: string
}

const DeleteButton = memo(function DeleteButton({ onDelete, id }: Props) {
  return <DeleteIcon sx={{ cursor: 'pointer' }} onClick={() => onDelete(id)} />
})

export default DeleteButton
