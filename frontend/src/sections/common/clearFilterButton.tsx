'use client'

import { Button } from '@mui/material'
import React, { memo } from 'react'
import { useTranslations } from 'next-intl'

type ClearFilterButtonProps = {
  onClear?: () => void
}

function ClearFilterButton(props: ClearFilterButtonProps) {
  const t = useTranslations('Common')

  const { onClear } = props

  return (
    <Button variant="outlined" onClick={onClear}>
      {t('filters.deleteFilter')}
    </Button>
  )
}

export default memo(ClearFilterButton)
