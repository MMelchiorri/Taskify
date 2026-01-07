import * as Yup from 'yup'

export const userSchema = Yup.object().shape({
  username: Yup.string()
    .required('username is required')
    .min(2, 'Name must be at least 2 characters long')
    .max(50, 'Name cannot exceed 50 characters'),

  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),

  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),

  role: Yup.string().oneOf(
    ['admin', 'user'],
    "Role must be either 'admin' or 'user'"
  ),

  createdAt: Yup.date().default(() => new Date()),
  updatedAt: Yup.date().default(() => new Date()),
  isActive: Yup.boolean().default(true),
})
