import * as Yup from 'yup'
import { TodoCategory, TodoStatus, TodoPriority } from '@/type/Todo'

export const todoSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(3, 'Name must be at least 3 characters')
    .max(100, 'Name is too long')
    .required('Name is required'),

  description: Yup.string().trim().max(500, 'Description is too long'),

  category: Yup.mixed<TodoCategory>()
    .oneOf(Object.values(TodoCategory))
    .required('Category is required'),

  assignedTo: Yup.string().required('Assignee is required'),

  dueDate: Yup.date()
    .nullable()
    .min(new Date(), 'Due date must be in the future')
    .required('Due date is required'),

  priority: Yup.mixed<TodoPriority>()
    .oneOf(Object.values(TodoPriority))
    .required('Priority is required'),

  status: Yup.mixed<TodoStatus>()
    .oneOf(Object.values(TodoStatus))
    .required('Status is required'),

  reminder: Yup.boolean(),

  reminderDate: Yup.date()
    .nullable()
    .when('reminder', {
      is: true,
      then: (schema) =>
        schema
          .required('Reminder date is required')
          .min(Yup.ref('dueDate'), 'Reminder must be before due date'),
      otherwise: (schema) => schema.nullable(),
    }),

  tags: Yup.array().of(Yup.string().trim()).max(10, 'Maximum 10 tags allowed'),
})
