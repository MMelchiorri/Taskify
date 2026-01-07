'use client'

import { Autocomplete, TextField } from '@mui/material'
import { Todo } from '@/type/Todo'

type Props = {
  jobs: Todo[]
  selectJobAction: (job: Todo | null) => void
}

export default function UserJobs({ jobs, selectJobAction }: Props) {
  return (
    <Autocomplete
      options={jobs}
      getOptionLabel={(option) => option.name ?? ''}
      onChange={(_, value) => selectJobAction(value)}
      renderInput={(params) => <TextField {...params} label="Select job" />}
    />
  )
}
