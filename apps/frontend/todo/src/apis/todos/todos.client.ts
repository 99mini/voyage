import client from '@/database/client';
import { CreateTodoRequest, TodoResponse, UpdateTodoRequest } from './todos.model';

export async function getAllTodos() {
  const records = await client.collection<TodoResponse>('todos').getFullList();

  return records;
}

export async function getTodo(id: string) {
  const record = await client.collection<TodoResponse>('todos').getOne(id);

  return record;
}

export async function createTodo(data: CreateTodoRequest) {
  const record = await client.collection<TodoResponse>('todos').create(data);

  return record;
}

export async function updateTodo(id: string, data: UpdateTodoRequest) {
  const record = await client.collection<TodoResponse>('todos').update(id, data);

  return record;
}

export async function deleteTodo(id: string) {
  const record = await client.collection<TodoResponse>('todos').delete(id);

  return record;
}
