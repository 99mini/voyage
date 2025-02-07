import client from '@/database/client';
import { Todo } from '@/lib/types/goal';

export async function getAllTodos() {
  const records = await client.collection<Todo>('todos').getFullList();

  return records;
}

export async function getTodo(id: string) {
  const record = await client.collection<Todo>('todos').getOne(id);

  return record;
}
