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
import { useTranslations } from 'next-intl'

export default function TableEmpty() {
  const t = useTranslations('Users')

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
            <TableCell colSpan={6} style={{ textAlign: 'center' }}>
              {t('generic.empty')}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell colSpan={6} style={{ textAlign: 'center' }}>
              <Link href={'/users/create'}>
                <Button variant={'contained'}>{t('actions.add')}</Button>
              </Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
