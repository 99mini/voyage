import React from 'react';
import { useGoalStore } from '@/hooks/useGoalStore';
import { Goal } from '@/lib/types/goal';
import GoalItem from './GoalItem';

const GoalList: React.FC = () => {
  const goals = useGoalStore((state) => state.goals);
  const reorderGoals = useGoalStore((state) => state.reorderGoals);

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

  return (
    <div className="space-y-4">
      {goals.map((goal) => (
        <GoalItem key={goal.id} goal={goal} />
      ))}
    </div>
  );
};

export default GoalList;
