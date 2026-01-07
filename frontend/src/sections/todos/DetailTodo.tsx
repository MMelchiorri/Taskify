import { Todo } from '@/type/Todo'
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Divider,
  Box,
} from '@mui/material'
import { CheckCircle, HourglassEmpty, Flag } from '@mui/icons-material'

type DetailTodoProps = {
  todo: Todo
}

export const DetailTodo = ({ todo }: DetailTodoProps) => {
  const statusColor = todo.completed ? 'success' : 'warning'
  const StatusIcon = todo.completed ? CheckCircle : HourglassEmpty

  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        mt: 4,
        transition: '0.3s',
        '&:hover': {
          boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
          transform: 'translateY(-3px)',
        },
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h5" fontWeight="bold" color="primary">
            {todo.name}
          </Typography>

          {todo.description && (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ lineHeight: 1.6 }}
            >
              {todo.description}
            </Typography>
          )}

          <Divider />

          <Stack direction="row" spacing={2} alignItems="center">
            <Chip
              label={todo.completed ? 'Completed' : 'In Progress'}
              color={statusColor}
              icon={<StatusIcon />}
              sx={{ fontWeight: 'medium' }}
            />
            <Chip
              label={`Priority: ${todo.priority}`}
              color={
                todo.priority === 'High'
                  ? 'error'
                  : todo.priority === 'Medium'
                  ? 'warning'
                  : 'success'
              }
              icon={<Flag />}
              variant="outlined"
            />
          </Stack>

          <Divider />

          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              fontStyle="italic"
            >
              Created at: {new Date(todo.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}
