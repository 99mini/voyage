import React from 'react';
import { useGoalStore } from '@/hooks/useGoalStore';
import GoalList from './components/GoalList';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusIcon } from 'lucide-react';

const GoalsPage: React.FC = () => {
  const [newGoalTitle, setNewGoalTitle] = React.useState('');
  const addGoal = useGoalStore((state) => state.addGoal);

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
          <PlusIcon className="h-4 w-4 mr-2" />
          목표 추가
        </Button>
      </form>
      <GoalList />
    </div>
  );
};

export default GoalsPage;
