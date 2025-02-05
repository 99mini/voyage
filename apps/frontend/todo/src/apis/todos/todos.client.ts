import { pb } from '@packages/pb-api';

export async function getAllTodos() {
  const records = await pb.collection('todos').getFullList();

  return records;
}

export async function getTodo(id: string) {
  const record = await pb.collection('todos').getOne(id);

  return record;
}
