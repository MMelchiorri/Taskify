'use client'

import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import Link from 'next/link'
import { AddTask } from '@mui/icons-material'
import { useTranslations } from 'next-intl'

export default function TableEmpty() {
  const t = useTranslations('Todos')

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxWidth: 800,
        mx: 'auto',
        my: 6,
        p: 2,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ backgroundColor: '#F8F1F6' }} align={'center'}>
              {t('generic.empty')}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell style={{ textAlign: 'center' }}>
              <Link href={'/todos/create'}>
                <Button
                  variant={'contained'}
                  startIcon={<AddTask />}
                  sx={{ backgroundColor: '#65558E' }}
                >
                  {t('actions.add')}
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
