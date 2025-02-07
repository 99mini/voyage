import { Goal, Todo } from '@/lib/types';
import { ExpandResponse } from '@packages/pb-api';

export type GoalResponse = ExpandResponse<Goal, Todo, 'todos'>;
