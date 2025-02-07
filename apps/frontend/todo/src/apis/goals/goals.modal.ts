import { Goal } from '@/lib/types/goal';
import { RecordResponse, ListResponse } from '@packages/pb-api';

export type GoalResponse = RecordResponse<Goal>;
export type GoalsResponse = ListResponse<Goal>;
