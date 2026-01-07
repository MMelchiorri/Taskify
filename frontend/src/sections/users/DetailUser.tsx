'use client'

import {
  Box,
  Grid,
  IconButton,
  Typography,
  Card,
  CardContent,
  Divider,
  Avatar,
} from '@mui/material'
import BackButton from '@/sections/BackButton'
import EditIcon from '@mui/icons-material/Edit'
import UserJobs from '@/sections/users/SelectJob'
import { User } from '@/type/Users'
import { Todo } from '@/type/Todo'
import { DetailTodo } from '@/sections/todos/DetailTodo'
import { useState } from 'react'
import Link from 'next/link'

type Props = {
  user: User
  todo: Todo[]
}

export const DetailUser = ({ user, todo }: Props) => {
  const [selectedTodo, setSelected] = useState<Todo | null>(
    todo.length > 0 ? todo[0] : null
  )

  return (
    <Grid container display="flex" justifyContent="space-evenly" sx={{ mt: 4 }}>
      {/* Card Utente */}
      <Grid
        size={{ xs: 12, md: 4 }}
        sx={{
          '@media (max-width:769px)': { width: '80%' },
          mt: 4,
        }}
      >
        <Card
          sx={{
            borderRadius: 4,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            bgcolor: 'white',
          }}
        >
          <CardContent>
            {/* Header con back e edit */}
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={2}
            >
              <BackButton />
              <IconButton size="small" sx={{ color: 'black' }}>
                <Link href={`/users/${user._id}/edit`}>
                  <EditIcon fontSize="small" />
                </Link>
              </IconButton>
            </Box>

            {/* Avatar + Nome + Ruolo */}
            <Box display="flex" alignItems="center" mb={2}>
              <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  mr: 2,
                  bgcolor: 'primary.main',
                  fontWeight: 'bold',
                }}
              >
                {user.username[0].toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  {user.username}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.role}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ mb: 2 }} />

            {/* Lista lavori */}
            {todo.length > 0 ? (
              <UserJobs jobs={todo} selectJobAction={setSelected} />
            ) : (
              <Typography variant="body2" color="text.secondary">
                Nessun task disponibile
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>

      {selectedTodo && (
        <Grid size={{ xs: 12, md: 6 }} display="flex" justifyContent="center">
          <DetailTodo todo={selectedTodo} />
        </Grid>
      )}
    </Grid>
  )
}
