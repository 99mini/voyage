import { useMutation, useQuery } from '@tanstack/react-query';
import { createGoal, deleteGoal, getAllGoals, getGoal, updateGoal } from './goals.client';
import { CreateGoalRequest, UpdateGoalRequest } from './goals.model';

export const useGoalListQuery = () =>
  useQuery({
    queryKey: ['goals'],
    queryFn: getAllGoals,
  });

export const useGoalQuery = (id: string) =>
  useQuery({
    queryKey: ['goal', id],
    queryFn: () => getGoal(id),
  });

export const useCreateGoalMutation = () =>
  useMutation({
    mutationFn: (data: CreateGoalRequest) => createGoal(data),
  });

export const useUpdateGoalMutation = () =>
  useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateGoalRequest }) => updateGoal(id, data),
  });

export const useDeleteGoalMutation = () =>
  useMutation({
    mutationFn: (id: string) => deleteGoal(id),
  });
