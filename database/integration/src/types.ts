export interface User {
  id: number
  email: string
  created_at: Date
}

export interface Task {
  id: number
  user_id: number
  title: string
  completed: boolean
  created_at: Date
}