import { useQuery } from '@tanstack/react-query';
import { getAllTodos, getTodo } from './todos.client';

export const useTodoListQuery = () =>
  useQuery({
    queryKey: ['todos'],
    queryFn: getAllTodos,
  });

export const useTodoQuery = (id: string) =>
  useQuery({
    queryKey: ['todo', id],
    queryFn: () => getTodo(id),
  });
