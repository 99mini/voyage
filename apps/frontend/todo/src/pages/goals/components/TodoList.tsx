import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Goal } from '@/lib/types/goal.type';
import { PlusIcon } from 'lucide-react';
import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from '@/lib/types';

interface TodoListProps {
  goal: Goal;
}

const TodoList: React.FC<TodoListProps> = ({ goal }) => {
  const [newTodoTitle, setNewTodoTitle] = React.useState('');

  // TODO: implement addTodo
  const addTodo = (target: string, val: string) => console.log(target, val);
  // TODO: implement reorderTodos
  const reorderTodos = (target: string, data: Todo[]) => console.log(target, data);

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

  console.log(handleDragEnd);

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
