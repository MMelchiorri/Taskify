'use client'

import React from 'react'

import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useTranslations } from 'next-intl'
import { LoginUser } from '@/services/usersFetch'

export default function LoginForm() {
  const tLogin = useTranslations('LoginForm')
  const tError = useTranslations('ErrorMessage')
  const formik = useFormik({
    initialValues: {
      usernameEmail: '',
      password: '',
    },
    validationSchema: Yup.object({
      usernameEmail: Yup.string()
        .required(tError('username-email-required'))
        .email(tError('username-email-invalid')),
      password: Yup.string()
        .required(tError('password-required'))
        .min(6, tError('password-min', { min: 6 })),
    }),
    onSubmit: (values) => {
      LoginUser(values.usernameEmail, values.password).then((accessToken) => {
        if (accessToken) {
          const { accessToken: token } = accessToken
          localStorage.setItem('accessToken', token)
        } else {
          alert(tLogin('login-failure'))
        }
      })
    },
  })
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
      <form onSubmit={formik.handleSubmit}>
        <Box
          display={'flex'}
          flexDirection={'column'}
          padding={4}
          gap={2}
          width={300}
        >
          <Box display={'flex'} flexDirection={'column'}>
            <Typography variant="h5" marginBottom={2}>
              {tLogin('title')}
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              id="usernameEmail"
              name="usernameEmail"
              label={tLogin('username-email')}
              onChange={formik.handleChange}
              value={formik.values.usernameEmail}
              onBlur={formik.handleBlur}
              error={
                formik.touched.usernameEmail &&
                Boolean(formik.errors.usernameEmail)
              }
              helperText={
                formik.touched.usernameEmail && formik.errors.usernameEmail
              }
            ></TextField>
          </Box>
          <Box display={'flex'} flexDirection={'column'}>
            <TextField
              variant="outlined"
              margin="normal"
              type="password"
              id="password"
              name="password"
              label={tLogin('password')}
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            ></TextField>
          </Box>
          <Button variant="contained" color="primary" type={'submit'}>
            {tLogin('submit')}
          </Button>
        </Box>
      </form>
    </Paper>
  )
}
