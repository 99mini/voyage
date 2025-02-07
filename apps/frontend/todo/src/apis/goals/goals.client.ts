import client from '@/database/client';
import { GoalResponse } from './goals.modal';

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
