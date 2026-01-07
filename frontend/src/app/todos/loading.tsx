'use client'

import { Stack, CircularProgress, Typography } from '@mui/material'
import { useTranslations } from 'next-intl'

const Loading = () => {
  const t = useTranslations('Common')
  return (
    <Stack
      height="100vh"
      width="100%"
      alignItems="center"
      justifyContent="center"
      spacing={2}
    >
      <CircularProgress color="primary" />
      <Typography variant="body2" color="text.secondary">
        {t('Loading')}
      </Typography>
    </Stack>
  )
}

export default Loading
