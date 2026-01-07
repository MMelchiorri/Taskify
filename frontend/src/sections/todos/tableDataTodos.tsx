'use client'

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Button,
} from '@mui/material'
import { Todo } from '@/type/Todo'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'
import TableEmpty from '@/sections/todos/tableDataEmpty'
import TodoRow from '@/sections/todos/TodoRow'
import { deleteTodo } from '@/services/todosFetch'
import Link from 'next/link'

interface Props {
  todos: Todo[]
}

export default function TodoTable({ todos }: Props) {
  const t = useTranslations('Todos')
  const router = useRouter()

  const excludeKeys = new Set([
    '_id',
    'id',
    '__v',
    'createdAt',
    'tags',
    'reminder',
    'reminderDate',
    'status',
  ])

  const handleDelete = useCallback(
    async (id: string) => {
      await deleteTodo(id)
      router.refresh()
    },
    [router]
  )

  if (!todos || todos.length === 0) {
    return <TableEmpty />
  }

  const columns = Object.keys(todos[0]).filter((k) => !excludeKeys.has(k))

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={4}>
      <TableContainer component={Paper} sx={{ width: '80%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={columns.length + 2}></TableCell>
            </TableRow>

            <TableRow>
              {columns.map((col) => (
                <TableCell key={col} align="center">
                  {t(`columns.${col}`)}
                </TableCell>
              ))}
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>

          <TableBody>
            {todos.map((todo) => (
              <TodoRow
                id={todo._id}
                key={todo._id}
                todo={todo}
                handleDeleteTodo={handleDelete}
                handleNavigate={() => router.push(`/todos/${todo._id}`)}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Link href="/todos/create">
        <Button variant="contained">{t('actions.add')}</Button>
      </Link>
    </Box>
  )
}
