import { Goal, Todo } from '@/lib/types';
import { ExpandResponse } from '@packages/pb-api';

export type GoalResponse = ExpandResponse<Goal, Todo, 'todos'>;
export type CreateGoalRequest = Omit<Goal, 'id' | 'createdAt' | 'updatedAt' | 'todos'>;
export type UpdateGoalRequest = Partial<CreateGoalRequest>;
