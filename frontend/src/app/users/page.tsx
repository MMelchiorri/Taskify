import UsersTable from '@/sections/users/usersTable'
export default async function UsersPage() {
  return (
    <UsersTable url={`${process.env.NEXT_PUBLIC_TODO_API_BASE_URL}/users`} />
  )
}
