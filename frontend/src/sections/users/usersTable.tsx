'use client'

import { User } from '@/type/Users'
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Typography,
  Box,
  Stack,
  TableRow,
} from '@mui/material'
import dayjs from 'dayjs'
import Link from 'next/link'
import DeleteButton from '@/sections/users/DeleteButton'
import DetailButton from '@/sections/users/DetailButton'
import { fetchUsers, deleteUser } from '@/services/usersFetch'
import { useTranslations } from 'next-intl'
import TableEmpty from '@/sections/users/tableDataEmpty'
import React, { useCallback, useEffect, useState } from 'react'
import UserRow from '@/sections/users/userRow'

type UsersTableProps = {
  url: string
}

const excludeKeysSet = new Set([
  'id',
  '__v',
  '_id',
  'createdAt',
  'updatedAt',
  'password',
  'isActive',
  'updatedAt',
  'jobAssigned',
])

const keysToDisplay = (user: User): (keyof User)[] => {
  return Object.keys(user).filter(
    (key) => !excludeKeysSet.has(key)
  ) as (keyof User)[]
}

export default function UsersTable(props: UsersTableProps) {
  const { url } = props
  const t = useTranslations('Users')
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const load = async () => {
      setUsers(await fetchUsers(url))
    }
    load()
  }, [url])

  const handleDelete = useCallback(async (id: string) => {
    await deleteUser(`${id}`)
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id))
  }, [])

  const handleNavigate = useCallback(async (id: string) => {
    window.location.href = `/users/${id}`
  }, [])

  if (!users || users.length === 0) {
    return <TableEmpty />
  }

  const keys = keysToDisplay(users[0])

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          mx: 'auto',
          width: '80%',
          borderRadius: 2,
          boxShadow: 3,
          display: { xs: 'none', sm: 'block' }, // hide on mobile
          overflowX: 'auto',
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#F8F1F6' }}>
              {keys.map((key) => (
                <TableCell key={key}>{t(`columns.${key}`)}</TableCell>
              ))}
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <UserRow
                id={user._id}
                key={user._id}
                user={user}
                handleDelete={handleDelete}
                keys={keys}
                handleNavigate={handleNavigate}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack spacing={2} sx={{ display: { xs: 'block', sm: 'none' }, my: 4 }}>
        {users.map((user) => (
          <Paper key={user.id} sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
            {keys.map((key) => (
              <Box key={key} sx={{ mb: 0.5 }}>
                <Typography variant="caption" color="text.secondary">
                  {t(`columns.${key}`)}
                </Typography>
                <Typography variant="body1">
                  {typeof user[key] === 'string' && dayjs(user[key]).isValid()
                    ? dayjs(user[key]).format('DD/MM/YYYY')
                    : user[key]?.toString()}
                </Typography>
              </Box>
            ))}

            <Box display="flex" gap={1} mt={1}>
              <DeleteButton id={user._id} onDelete={handleDelete} />
              <DetailButton id={user._id} handleNavigate={handleNavigate} />
            </Box>
          </Paper>
        ))}

        <Button variant="contained" sx={{ mt: 2, width: '100%' }}>
          <Link
            href="/users/create"
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            {t('actions.add')}
          </Link>
        </Button>
      </Stack>
      <Box display={'flex'} justifyContent={'center'}>
        <Link
          href="/users/create"
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          <Button
            variant="contained"
            sx={{ backgroundColor: '#675496', mt: 2 }}
          >
            {t('actions.add')}
          </Button>
        </Link>
      </Box>
    </>
  )
}
