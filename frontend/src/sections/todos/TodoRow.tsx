'use client'

import { Box, Chip, TableCell, TableRow } from '@mui/material'
import {
  CalendarMonth,
  CheckCircle,
  Pending,
  Schedule,
} from '@mui/icons-material'
import dayjs from 'dayjs'
import DeleteButton from '@/sections/todos/DeleteButton'
import React, { memo } from 'react'
import { Todo } from '@/type/Todo'
import DetailButton from '@/sections/todos/DetailButton'

interface TodoProps {
  id: string
  todo: Todo
  handleDeleteTodo: (id: string) => void | Promise<void>
  handleNavigate: (id: string) => void | Promise<void>
}

const TodoRow = memo(function TodoRow(props: TodoProps) {
  const { todo, handleDeleteTodo, handleNavigate } = props

  return (
    <TableRow>
      <TableCell>{todo.name}</TableCell>
      <TableCell>{todo.description}</TableCell>
      <TableCell align="center">
        {todo.completed ? (
          <CheckCircle sx={{ color: '#4A454F' }} />
        ) : (
          <Pending sx={{ color: '#4A454F' }} />
        )}
      </TableCell>
      <TableCell>
        <Chip label={todo.category} />
      </TableCell>
      <TableCell>{todo.assignedTo}</TableCell>
      <TableCell>
        <Box display="flex" flexDirection="column" gap={1}>
          <Chip
            icon={<CalendarMonth />}
            label={dayjs(todo.dueDate).format('DD MMM YYYY')}
            size="small"
          />
          <Chip
            icon={<Schedule />}
            label={dayjs(todo.dueDate).format('HH:mm')}
            size="small"
          />
        </Box>
      </TableCell>
      <TableCell>
        <Chip
          label={todo.priority}
          color={
            todo.priority === 'alta'
              ? 'error'
              : todo.priority === 'media'
              ? 'warning'
              : 'success'
          }
          variant="outlined"
        />
      </TableCell>
      <TableCell>
        <DeleteButton id={todo._id} onDelete={handleDeleteTodo} />
      </TableCell>
      <TableCell>
        <DetailButton
          id={todo._id}
          key={todo._id}
          handleNavigate={handleNavigate}
        />
      </TableCell>
    </TableRow>
  )
})

export default TodoRow
