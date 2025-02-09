import { useMutation, useQuery } from '@tanstack/react-query';
import { createTodo, deleteTodo, getAllTodos, getTodo, updateTodo } from './todos.client';
import { CreateTodoRequest, UpdateTodoRequest } from './todos.model';

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

export const useCreateTodoMutation = () =>
  useMutation({
    mutationFn: (data: CreateTodoRequest) => createTodo(data),
  });

export const useUpdateTodoMutation = () =>
  useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTodoRequest }) => updateTodo(id, data),
  });

export const useDeleteTodoMutation = () =>
  useMutation({
    mutationFn: (id: string) => deleteTodo(id),
  });
