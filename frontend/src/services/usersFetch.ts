import { User } from '@/type/Users'

type AccessTokenResponse = {
  accessToken: string
}

export async function fetchUsers(url: string): Promise<User[]> {
  try {
    const res = await fetch(`${url}`, {
      cache: 'no-store',
    })
    const data: User[] = await res.json()
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error('Error fetching users:', error)
    return []
  }
}

export const deleteUser = async (id: string): Promise<void> => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_TODO_API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
      cache: 'no-store',
    })
  } catch (error) {
    console.error('Error deleting Users:', error)
  }
}

export async function postUser(user: User): Promise<User | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_TODO_API_BASE_URL}/users`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
        cache: 'no-store',
      }
    )
    return await res.json()
  } catch (error) {
    console.error('Error posting user:', error)
    return null
  }
}

export async function LoginUser(
  email: string,
  password: string
): Promise<AccessTokenResponse | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_TODO_API_BASE_URL}/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        cache: 'no-store',
        credentials: 'include',
      }
    )
    if (res.ok) {
      return await res.json()
    } else {
      return null
    }
  } catch (error) {
    console.error('Error logging in user:', error)
    return null
  }
}

export async function getUserById(id: string): Promise<User> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TODO_API_BASE_URL}/users/${id}`,
    {
      method: 'GET',
      cache: 'no-store',
    }
  )
  return await res.json()
}
