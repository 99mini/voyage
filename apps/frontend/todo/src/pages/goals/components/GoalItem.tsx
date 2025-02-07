import React from 'react';
import { Goal } from '@/lib/types/goal.type';
import { useGoalStore } from '@/hooks/useGoalStore';
import TodoList from './TodoList';

interface GoalItemProps {
  goal: Goal;
}

const GoalItem: React.FC<GoalItemProps> = ({ goal }) => {
  const updateGoal = useGoalStore((state) => state.updateGoal);
  const deleteGoal = useGoalStore((state) => state.deleteGoal);

  return (
    <div className="border rounded-lg p-4 space-y-4 bg-card">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{goal.title}</h3>
          {goal.description && <p className="text-sm text-muted-foreground">{goal.description}</p>}
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={goal.status}
            onChange={(e) => updateGoal(goal.id, { status: e.target.value as Goal['status'] })}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="in-progress">진행중</option>
            <option value="completed">완료</option>
            <option value="on-hold">보류</option>
          </select>
          <button onClick={() => deleteGoal(goal.id)} className="text-sm text-destructive hover:text-destructive/80">
            삭제
          </button>
        </div>
      </div>
      <div className="w-full bg-secondary rounded-full h-2">
        <div className="bg-primary rounded-full h-2 transition-all" style={{ width: `${goal.progress}%` }} />
      </div>
      <TodoList goal={goal} />
    </div>
  );
};

export default GoalItem;
