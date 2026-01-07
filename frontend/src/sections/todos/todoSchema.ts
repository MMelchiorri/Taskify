import * as Yup from 'yup'

export const todoSchema = Yup.object().shape({
  name: Yup.string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters long')
    .max(100, 'Title must not exceed 100 characters'),

  description: Yup.string().max(
    500,
    'Description must not exceed 500 characters'
  ),

  completed: Yup.boolean(),

  tags: Yup.string(),

  category: Yup.string()
    .required('Category is required')
    .max(50, 'Category must not exceed 50 characters'),

  assignedTo: Yup.string(),

  dueDate: Yup.date()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value)),

  reminder: Yup.boolean(),

  reminderDate: Yup.date()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value)),

  createdAt: Yup.date()
    .default(() => new Date())
    .transform((value, originalValue) => (originalValue === '' ? null : value)),

  priority: Yup.string(),
})
