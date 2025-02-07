import { useGoalListQuery } from '@/apis/goals';
import { Goal } from '@/lib/types/goal.type';

const useGoals = () => {
  const { data: _goals, isPending } = useGoalListQuery();

  const goals: Goal[] =
    _goals?.map((goal) => ({
      id: goal.id,
      title: goal.title,
      description: goal.description,
      dueDate: goal.dueDate,
      status: goal.status,
      progress: goal.progress,
      todos:
        goal.expand.todos?.map((todo) => ({
          id: todo.id,
          title: todo.title,
          description: todo.description,
          dueDate: todo.dueDate,
          status: todo.status,
          goalId: todo.goalId,
          order: todo.order,
          createdAt: todo.createdAt,
          updatedAt: todo.updatedAt,
        })) ?? [],
      order: goal.order,
      createdAt: goal.createdAt,
      updatedAt: goal.updatedAt,
    })) ?? [];

  return { goals, isPending };
};

export default useGoals;
