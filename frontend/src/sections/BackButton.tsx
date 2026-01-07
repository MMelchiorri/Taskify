'use client'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Button } from '@mui/material'

export default function BackButton() {
  return (
    <Button
      onClick={() => window.history.back()}
      sx={{ color: 'black' }}
      aria-label="Go back"
    >
      <ArrowBackIcon sx={{ mr: 1 }} />
    </Button>
  )
}
