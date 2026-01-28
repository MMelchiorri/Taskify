'use client'

import React from 'react'

import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useTranslations } from 'next-intl'

export default function LoginForm() {
  const t = useTranslations('LoginForm')
  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <Box
        display={'flex'}
        flexDirection={'column'}
        padding={4}
        gap={2}
        width={300}
      >
        <Box display={'flex'} flexDirection={'column'}>
          <Typography variant="h5" marginBottom={2}>
            {t('title')}
          </Typography>
          <TextField
            label={t('username-email')}
            variant="outlined"
            margin="normal"
          ></TextField>
        </Box>
        <Box display={'flex'} flexDirection={'column'}>
          <TextField
            label={t('password')}
            variant="outlined"
            margin="normal"
          ></TextField>
        </Box>
        <Button variant="contained" color="primary">
          {t('submit')}
        </Button>
      </Box>
    </Paper>
  )
}
