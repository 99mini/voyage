import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@packages/vds';
import { Todo } from '@/lib/types/';
import { TrashIcon } from 'lucide-react';
import React from 'react';

interface TodoItemProps {
  todo: Todo;
  goalId: string;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, goalId }) => {
  // TODO: implement updateTodo and deleteTodo
  const updateTodo = (goalId: string, todoId: string, data: Partial<Todo>) => console.log(goalId, todoId, data);
  const deleteTodo = (goalId: string, todoId: string) => console.log(goalId, todoId);

  const handleStatusChange = () => {
    updateTodo(goalId, todo.id, {
      status: todo.status === 'completed' ? 'pending' : 'completed',
    });
  };

  return (
    <div className="flex items-center justify-between p-2 rounded-md bg-muted/50">
      <div className="flex items-center gap-2">
        <Checkbox checked={todo.status === 'completed'} onCheckedChange={handleStatusChange} />
        <span className={todo.status === 'completed' ? 'line-through text-muted-foreground' : ''}>{todo.title}</span>
      </div>
      <div className="flex items-center gap-2">
        <select
          value={todo.status}
          onChange={(e) => updateTodo(goalId, todo.id, { status: e.target.value as Todo['status'] })}
          className="text-sm border rounded px-2 py-1"
        >
          <option value="pending">대기중</option>
          <option value="in-progress">진행중</option>
          <option value="completed">완료</option>
        </select>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => deleteTodo(goalId, todo.id)}
          className="text-destructive hover:text-destructive/80"
        >
          <TrashIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TodoItem;
