import { useTodoListQuery } from '@/apis/todos';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGoalStore } from '@/hooks/useGoalStore';
import React from 'react';
import GoalList from './components/GoalList';
import LucideIcon from '@/components/lucide/LucideIcon';

const GoalsPage: React.FC = () => {
  const [newGoalTitle, setNewGoalTitle] = React.useState('');
  const addGoal = useGoalStore((state) => state.addGoal);

  const { data: todos } = useTodoListQuery();

  console.log(todos);

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoalTitle.trim()) {
      addGoal(newGoalTitle.trim());
      setNewGoalTitle('');
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">목표 관리</h1>
      <form onSubmit={handleAddGoal} className="flex gap-2 mb-8">
        <Input
          type="text"
          value={newGoalTitle}
          onChange={(e) => setNewGoalTitle(e.target.value)}
          placeholder="새로운 목표 추가"
          className="flex-1"
        />
        <Button type="submit">
          <LucideIcon name="Plus" className="h-4 w-4 mr-2" />
          목표 추가
        </Button>
      </form>
      <GoalList />
    </div>
  );
};

export default GoalsPage;
