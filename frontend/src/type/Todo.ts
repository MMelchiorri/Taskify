export type Todo = {
  _id: string
  id: string
  name: string
  description: string
  completed: boolean
  category: string
  assignedTo: string
  dueDate: Date
  reminder: boolean
  reminderDate: Date
  createdAt: Date
  priority: string
  status: string
  tags: string[]
}

export enum TodoCategory {
  WORK = 'work',
  PERSONAL = 'personal',
  SHOPPING = 'shopping',
  OTHERS = 'others',
}

export enum TodoStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in progress',
  COMPLETED = 'completed',
}

export enum TodoPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}
