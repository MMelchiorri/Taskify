'use client'

import EditIcon from '@mui/icons-material/Edit'
import React from 'react'

interface EditButtonProps {
  id?: string
  onEdit?: () => void
}

export const EditButton: React.FC<EditButtonProps> = ({ id }) => {
  const handleClick = () => {
    if (id) {
      window.location.href = `/todos/${id}/edit`
    } else {
      console.warn('No ID provided for EditButton')
    }
  }
  return <EditIcon style={{ cursor: 'pointer' }} onClick={handleClick} />
}
