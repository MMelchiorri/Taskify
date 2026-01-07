'use client'

import React from 'react'
import {
  Box,
  InputLabel,
  Typography,
  InputAdornment,
  TextField,
  Card,
  Divider,
  Button,
  MenuItem,
} from '@mui/material'
import { useTranslations } from 'next-intl'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Person from '@mui/icons-material/Person'
import { Category, TaskAlt, Assignment } from '@mui/icons-material'
import { Todo } from '@/type/Todo'
import { UsersContext } from '@/context/users/UsersContext'
import { useFormik } from 'formik'
import dayjs from 'dayjs'
import { TodoCategory, TodoStatus, TodoPriority } from '@/type/Todo'
import { postTodo } from '@/services/todosFetch'
import { todoSchema } from '@/schema/TodoSchema'
import { useRouter } from 'next/navigation'

type TodoFormProps = {
  todo?: Todo
}

const TodoForm = (props: TodoFormProps) => {
  const { users } = React.useContext(UsersContext)
  const router = useRouter()
  const t = useTranslations('Todos')
  const { todo } = props
  const attributes = {
    category: Object.values(TodoCategory),
    status: Object.values(TodoStatus),
    priority: Object.values(TodoPriority),
  }

  const handleSubmit = async (values: Omit<Todo, '_id'>) => {
    await postTodo(values)
    router.push('/todos')
  }
  const formik = useFormik<Omit<Todo, '_id'>>({
    initialValues: todo
      ? todo
      : {
          name: '',
          assignedTo: '',
          dueDate: new Date(),
          category: '',
          status: '',
          priority: '',
          description: '',
          reminder: false,
          reminderDate: new Date(),
          createdAt: new Date(),
          id: '',
          completed: false,
          tags: [],
        },
    onSubmit: handleSubmit,
    validationSchema: todoSchema,
  })

  return (
    <Box display="flex" flexDirection="column" width="40%" mx="auto" my={4}>
      <Box display="flex" alignItems="center" gap={1} mb={3}>
        <Assignment />
        <Typography variant="h5" fontWeight={600}>
          {t('create.title')}
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <InputLabel htmlFor="input-with-icon-adornment">
          {t('create.name')}
        </InputLabel>
        <TextField
          id="input-with-icon-adornment"
          onChange={formik.handleChange}
          value={formik.values.name}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.name && formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          fullWidth
          sx={{ mb: 3, '& fieldset': { borderRadius: 1 } }}
          name="name"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            },
          }}
        />
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <Typography variant="subtitle1" sx={{ minWidth: 100 }}>
            {t('create.assignee')}
          </Typography>
          <TextField
            select
            name="assignedTo"
            onChange={formik.handleChange}
            value={formik.values.assignedTo}
            onBlur={formik.handleBlur}
            error={Boolean(
              formik.touched.assignedTo && formik.errors.assignedTo
            )}
            helperText={formik.touched.assignedTo && formik.errors.assignedTo}
            fullWidth
            sx={{
              '& fieldset': { border: '1px solid #ccc', borderRadius: 1 },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              },
            }}
          >
            {users.map((user) => (
              <MenuItem key={user._id} value={user.username}>
                {user.username}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <Typography variant="subtitle1" sx={{ minWidth: 100 }}>
            {t('create.dueDate')}
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={['DatePicker']}
              sx={{
                '& fieldset': { border: '1px solid #ccc', borderRadius: 1 },
                '&:hover fieldset': { border: '1px solid #aaa' },
                '&.Mui-focused fieldset': { border: '1px solid #1976d2' },
                width: 200,
              }}
            >
              <DatePicker
                label={t('create.dueDate')}
                value={dayjs(formik.values.dueDate)}
                onChange={formik.handleChange}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>

        <Card
          sx={{
            borderRadius: 2,
            boxShadow: 2,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {[
            { icon: <Category />, label: t('create.category') },
            { icon: <TaskAlt />, label: t('create.status') },
            { icon: <Assignment />, label: t('create.priority') },
          ].map((item, index) => (
            <Box key={index} display="flex" alignItems="center" width="100%">
              <Box display="flex" alignItems="center" gap={1} flex={0.3}>
                {item.icon}
                <Typography variant="subtitle1">{item.label}</Typography>
              </Box>

              <Divider
                orientation="vertical"
                flexItem
                sx={{ borderColor: '#eee', margin: 1 }}
              />

              <Box flex={1}>
                <TextField
                  select
                  fullWidth
                  name={item.label.toLowerCase()}
                  sx={{ '& fieldset': { borderRadius: 1 } }}
                  onChange={formik.handleChange}
                  value={
                    formik.values[
                      item.label.toLowerCase() as keyof typeof formik.values
                    ]
                  }
                  onBlur={formik.handleBlur}
                  error={Boolean(
                    formik.touched[
                      item.label.toLowerCase() as keyof typeof formik.touched
                    ] &&
                      formik.errors[
                        item.label.toLowerCase() as keyof typeof formik.errors
                      ]
                  )}
                >
                  {attributes[
                    item.label.toLowerCase() as keyof typeof attributes
                  ].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Box>
          ))}
        </Card>
        <Box display={'flex'} justifyContent="center" mt={3}>
          <Button
            type={'submit'}
            variant={'contained'}
            sx={{ backgroundColor: '#675496' }}
          >
            {t('create.submit')}
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default TodoForm
