'use client'

import React from 'react'
import { FileSearch } from 'lucide-react'

interface DetailButtonProps {
  id: string
  handleNavigate: (id: string) => void | Promise<void>
}

const DetailButton: React.FC<DetailButtonProps> = ({ id, handleNavigate }) => {
  return (
    <FileSearch
      style={{ cursor: 'pointer' }}
      onClick={() => handleNavigate(id)}
    />
  )
}

export default DetailButton
