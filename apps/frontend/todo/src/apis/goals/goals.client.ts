import client from '@/database/client';
import { CreateGoalRequest, GoalResponse, UpdateGoalRequest } from './goals.model';

export async function getAllGoals() {
  const records = await client.collection<GoalResponse>('goals').getFullList({
    expand: 'todos',
  });

  return records;
}

export async function getGoal(id: string) {
  const record = await client.collection<GoalResponse>('goals').getOne(id, {
    expand: 'todos',
  });

  return record;
}

export async function createGoal(data: CreateGoalRequest) {
  const record = await client.collection<GoalResponse>('goals').create(data);

  return record;
}

export async function updateGoal(id: string, data: UpdateGoalRequest) {
  const record = await client.collection<GoalResponse>('goals').update(id, data);

  return record;
}

export async function deleteGoal(id: string) {
  const record = await client.collection<GoalResponse>('goals').delete(id);

  return record;
}
