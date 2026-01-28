'use client'

import React, { useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  TextField,
  Box,
  Button,
  MenuItem,
  Autocomplete,
  Divider,
} from '@mui/material'
import { useTranslations } from 'next-intl'
import { useFormik } from 'formik'
import { postUser } from '@/services/usersFetch'
import { userSchema } from '@/sections/users/userSchema'
import { useRouter } from 'next/navigation'
import { Todo } from '@/type/Todo'

type ValuesFormType = {
  username: string
  password: string
  email: string
  role: string
  jobAssigned: string[]
}

export const CreateUsersForm: React.FC = () => {
  const t = useTranslations('Users')
  const router = useRouter()
  const [todos, setTodos] = useState<Todo[]>([])
  console.log(todos)

  useEffect(() => {
    const loadTodos = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_TODO_API_BASE_URL}/todos`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data = await res.json()
      setTodos(data)
    }
    loadTodos()
  }, [])

  const formik = useFormik<ValuesFormType>({
    initialValues: {
      username: '',
      password: '',
      email: '',
      role: 'user',
      jobAssigned: [],
    },
    validationSchema: userSchema,
    onSubmit: async (values) => {
      await postUser(values)
      router.push('/users')
    },
  })

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#f6f7fb',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        py: 6,
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 760,
          borderRadius: 3,
          boxShadow: '0 10px 35px rgba(0,0,0,0.08)',
        }}
      >
        <CardHeader
          title={t('create.title')}
          sx={{
            textAlign: 'center',
            bgcolor: '#675496',
            color: 'white',
            '& .MuiCardHeader-subheader': {
              color: 'rgba(255,255,255,0.85)',
            },
          }}
        />

        <CardContent sx={{ p: 4 }}>
          <form onSubmit={formik.handleSubmit}>
            <Grid
              container
              spacing={3}
              flexDirection="column"
              alignItems="center"
            >
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label={t('create.username')}
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                  helperText={formik.touched.username && formik.errors.username}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label={t('create.email')}
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label={t('create.password')}
                  name="password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  select
                  label={t('create.role.label')}
                  name="role"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                >
                  <MenuItem value="user">
                    {t('create.role.options.user')}
                  </MenuItem>
                  <MenuItem value="admin">
                    {t('create.role.options.admin')}
                  </MenuItem>
                </TextField>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Divider sx={{ my: 1 }} />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Autocomplete
                  multiple
                  fullWidth
                  options={todos}
                  getOptionLabel={(option) => option.name || ''}
                  value={todos.filter((todo) =>
                    formik.values.jobAssigned.includes(todo._id)
                  )}
                  onChange={(_, value) => {
                    formik.setFieldValue(
                      'jobAssigned',
                      value.map((v) => v._id)
                    )
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label={t('create.jobAssigned')} />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Box textAlign="center" mt={4}>
                  <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    sx={{
                      px: 6,
                      py: 1.5,
                      borderRadius: 2,
                      backgroundColor: '#675496',
                    }}
                    disabled={formik.isSubmitting}
                  >
                    {t('create.submit')}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}
