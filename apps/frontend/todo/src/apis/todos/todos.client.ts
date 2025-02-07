import client from '@/database/client';

export async function getAllTodos() {
  const records = await client.collection('todos').getFullList();

  return records;
}

export async function getTodo(id: string) {
  const record = await client.collection('todos').getOne(id);

  return record;
}
