import { useQuery } from '@tanstack/react-query';
import { getAllGoals, getGoal } from './goals.client';

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
