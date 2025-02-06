import React from 'react';
import { Goal, Todo } from '@/lib/types/goal';
import { useGoalStore } from '@/hooks/useGoalStore';
import TodoItem from './TodoItem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusIcon } from 'lucide-react';

interface TodoListProps {
  goal: Goal;
}

const TodoList: React.FC<TodoListProps> = ({ goal }) => {
  const [newTodoTitle, setNewTodoTitle] = React.useState('');
  const addTodo = useGoalStore((state) => state.addTodo);
  const reorderTodos = useGoalStore((state) => state.reorderTodos);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoTitle.trim()) {
      addTodo(goal.id, newTodoTitle.trim());
      setNewTodoTitle('');
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(goal.todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedTodos = items.map((item, index) => ({
      ...item,
      order: index,
    }));

    reorderTodos(goal.id, updatedTodos);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleAddTodo} className="flex gap-2">
        <Input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="새로운 할 일 추가"
          className="flex-1"
        />
        <Button type="submit" size="sm">
          <PlusIcon className="h-4 w-4" />
        </Button>
      </form>
      <div className="space-y-2">
        {goal.todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} goalId={goal.id} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
