import { getUserById } from '@/services/usersFetch'
import { Grid, Typography } from '@mui/material'
import { getTranslations } from 'next-intl/server'
import { getTodoById } from '@/services/todosFetch'
import { Todo } from '@/type/Todo'
import { DetailUser } from '@/sections/users/DetailUser'

export default async function Page({ params }: { params: { _id: string } }) {
  const { _id } = params
  const user = await getUserById(_id)
  const jobAssigned = (
    await Promise.all(user?.jobAssigned?.map(getTodoById) || [])
  ).filter((job): job is Todo => job !== null)
  const t = await getTranslations('Users')

  if (!user) {
    return <Typography>{t('details.notFound')}</Typography>
  }

  return (
    <Grid container>
      <Grid size={{ xs: 12 }}>
        <DetailUser user={user} todo={jobAssigned} />
      </Grid>
    </Grid>
  )
}
