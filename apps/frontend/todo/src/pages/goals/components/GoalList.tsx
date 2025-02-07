import { useGoalStore } from '@/hooks/useGoalStore';
import React from 'react';
import GoalItem from './GoalItem';
import { useGoalListQuery } from '@/apis/goals';

const GoalList: React.FC = () => {
  const { data: goals, isPending } = useGoalListQuery();
  const reorderGoals = useGoalStore((state) => state.reorderGoals);

  if (isPending) return null;
  if (!goals) return null;

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(goals);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedGoals = items.map((item, index) => ({
      ...item,
      order: index,
    }));

    reorderGoals(updatedGoals);
  };

  console.log(handleDragEnd);

  return (
    <div className="space-y-4">
      {goals.map((goal) => (
        <GoalItem key={goal.id} goal={goal} />
      ))}
    </div>
  );
};

export default GoalList;
