import { Goal, Todo } from '@/lib/types/goal';
import { ExpandResponse } from '@packages/pb-api';

export type GoalResponse = ExpandResponse<Goal, Todo, 'todos'>;
