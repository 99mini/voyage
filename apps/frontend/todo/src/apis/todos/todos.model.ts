import { RecordResponse } from '@packages/pb-api';
import { Todo } from '@/lib/types';

export type TodoResponse = RecordResponse<Todo>;
export type CreateTodoRequest = Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateTodoRequest = Partial<Todo>;
