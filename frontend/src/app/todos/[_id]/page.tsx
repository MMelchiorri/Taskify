import { getTodoById } from '@/services/todosFetch'
import {
  Box,
  Card,
  Divider,
  Typography,
  CardContent,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from '@mui/material'
import { getTranslations } from 'next-intl/server'
import BackButton from '@/sections/BackButton'
import Link from 'next/link'
import dayjs from 'dayjs'
import { Todo } from '@/type/Todo'

type ColumnsTodo = Omit<
  Todo,
  'id' | '__v' | 'createdAt' | '_id' | 'reminderDate'
>

export default async function Page({ params }: { params: { _id: string } }) {
  const { _id } = await params
  const todo = await getTodoById(_id)
  const todoData: {
    description: string
    completed: boolean
    dueDate: Date
    priority: string
    tags: string[]
    reminder: boolean
    name?: string
    assignedTo?: string
    category?: string
    status?: string
  } = {
    description: todo.description,
    completed: todo.completed,
    dueDate: todo.dueDate,
    priority: todo.priority,
    tags: todo.tags,
    reminder: todo.reminder,
    name: todo.name,
    assignedTo: todo.assignedTo,
    category: todo.category,
    status: todo.status,
  }
  const t = await getTranslations('Todos')

  if (!todo) {
    return <Typography>Todo non trovato</Typography>
  }

  return (
    <Card sx={{ maxWidth: 800, margin: 'auto', mt: 4, p: 2 }}>
      <Box display={'flex'} flexDirection={'column'}>
        <CardContent>
          <Box display={'flex'} gap={2}>
            <Link href="/todos">
              <BackButton />
            </Link>
            <Typography variant={'h5'}>{t('details.title')}</Typography>
            <Box display={'flex'} flexDirection={'column'}></Box>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Table>
            <TableBody>
              {(Object.keys(todoData) as Array<keyof ColumnsTodo>).map(
                (key) => (
                  <TableRow key={key}>
                    <TableCell sx={{ fontWeight: 'bold' }}>
                      {t(`columns.${key}`)}
                    </TableCell>
                    <TableCell>
                      {key === 'dueDate' ? (
                        dayjs(todoData[key]).format('DD/MM/YYYY')
                      ) : key === 'tags' ? (
                        <Box display="flex" gap={1}>
                          {todoData[key].map((tag) => (
                            <Chip key={tag} label={tag} />
                          ))}
                        </Box>
                      ) : (
                        String(todoData[key])
                      )}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Box>
    </Card>
  )
}
