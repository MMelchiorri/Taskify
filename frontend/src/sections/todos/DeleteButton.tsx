'use client'

import DeleteIcon from '@mui/icons-material/Delete'
import { memo } from 'react'

type Props = {
  onDelete: (id: string) => void | Promise<void>
  locked?: boolean
  id: string
}

const DeleteButton = memo(function DeleteButton({
  onDelete,
  locked,
  id,
}: Props) {
  if (locked) {
    return <span style={{ marginLeft: 6, color: 'orange' }}>🔒</span>
  }

  return <DeleteIcon sx={{ cursor: 'pointer' }} onClick={() => onDelete(id)} />
})

export default memo(DeleteButton)
