export type GoalStatus = 'in-progress' | 'completed' | 'on-hold';
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

export interface Goal {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  status: GoalStatus;
  progress: number;
  todos: Todo[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}
