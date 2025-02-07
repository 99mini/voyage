import client from '@/database/client';
import { Goal } from '@/lib/types/goal';

export async function getAllGoals() {
  const records = await client.collection<Goal>('goals').getFullList();

  console.log(records);

  return records;
}

export async function getGoal(id: string) {
  const record = await client.collection<Goal>('goals').getOne(id);

  return record;
}
