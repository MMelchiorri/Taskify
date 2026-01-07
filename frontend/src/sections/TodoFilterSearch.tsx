'use client'

import { Box, Button, Popover, Select, MenuItem } from '@mui/material'
import { FilterAlt } from '@mui/icons-material'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

import useRequestParams from '@/hooks/useRequestParams'
import ClearFilterButton from '@/sections/common/clearFilterButton'

type AreaFilterSearchProps = {
  url: string
  filter: Record<string, any>
  statusOptions: string[]
}

const TodoFilterSearch = ({ url, statusOptions }: AreaFilterSearchProps) => {
  const t = useTranslations('Todos')
  const searchParams = useSearchParams()

  // 🔹 stato UI
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [status, setStatus] = useState<string>(searchParams.get('status') ?? '')

  // 🔹 hook URL params
  const { handleRequestParams, deleteUrlParam } = useRequestParams({
    url,
    filter: { status },
  })

  const hasStatusFilter = Boolean(searchParams.get('status'))
  const open = Boolean(anchorEl)

  return (
    <Box display="flex" gap={2} alignItems="center">
      {/* Bottone filtro */}
      <Button
        variant="outlined"
        startIcon={<FilterAlt />}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        {t('columns.filterByStatus')}
      </Button>

      {/* Popover */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box p={2} display="flex" gap={2} minWidth={200}>
          <Select
            fullWidth
            size="small"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {statusOptions.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Popover>

      {/* Apply */}
      <Button onClick={handleRequestParams}>Apply</Button>

      {/* Clear */}
      {hasStatusFilter && (
        <ClearFilterButton onClear={() => deleteUrlParam('status')} />
      )}
    </Box>
  )
}

export default TodoFilterSearch
