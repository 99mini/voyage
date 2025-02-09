export type TodoStatus = 'pending' | 'in-progress' | 'completed';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  status: TodoStatus;
  goalId: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}
