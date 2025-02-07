import { Todo } from './todo.type';

export type GoalStatus = 'in-progress' | 'completed' | 'on-hold';

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
