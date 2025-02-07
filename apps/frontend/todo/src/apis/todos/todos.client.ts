import client from '@/database/client';
import { TodoResponse } from './todos.model';

export async function getAllTodos() {
  const records = await client.collection<TodoResponse>('todos').getFullList();

  return records;
}

export async function getTodo(id: string) {
  const record = await client.collection<TodoResponse>('todos').getOne(id);

  return record;
}
