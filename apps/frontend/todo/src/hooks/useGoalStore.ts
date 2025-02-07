import { Goal, Todo } from '@/lib/types/goal.type';
import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';

interface GoalStore {
  goals: Goal[];
  addGoal: (title: string, description?: string, dueDate?: Date) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  addTodo: (goalId: string, title: string, description?: string, dueDate?: Date) => void;
  updateTodo: (goalId: string, todoId: string, updates: Partial<Todo>) => void;
  deleteTodo: (goalId: string, todoId: string) => void;
  reorderGoals: (goals: Goal[]) => void;
  reorderTodos: (goalId: string, todos: Todo[]) => void;
}

export const useGoalStore = create<GoalStore>((set) => ({
  goals: [],

  addGoal: (title, description, dueDate) => {
    const newGoal: Goal = {
      id: uuidv4(),
      title,
      description,
      dueDate,
      status: 'in-progress',
      progress: 0,
      todos: [],
      order: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    set((state) => ({
      goals: [...state.goals, { ...newGoal, order: state.goals.length }],
    }));
  },

  updateGoal: (id, updates) => {
    set((state) => ({
      goals: state.goals.map((goal) =>
        goal.id === id
          ? {
              ...goal,
              ...updates,
              updatedAt: new Date(),
            }
          : goal,
      ),
    }));
  },

  deleteGoal: (id) => {
    set((state) => ({
      goals: state.goals.filter((goal) => goal.id !== id),
    }));
  },

  addTodo: (goalId, title, description, dueDate) => {
    const newTodo: Todo = {
      id: uuidv4(),
      title,
      description,
      dueDate,
      status: 'pending',
      goalId,
      order: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    set((state) => ({
      goals: state.goals.map((goal) => {
        if (goal.id === goalId) {
          const updatedTodos = [...goal.todos, { ...newTodo, order: goal.todos.length }];
          const completedTodos = updatedTodos.filter((todo) => todo.status === 'completed');
          const progress = (completedTodos.length / updatedTodos.length) * 100;

          return {
            ...goal,
            todos: updatedTodos,
            progress,
            updatedAt: new Date(),
          };
        }
        return goal;
      }),
    }));
  },

  updateTodo: (goalId, todoId, updates) => {
    set((state) => ({
      goals: state.goals.map((goal) => {
        if (goal.id === goalId) {
          const updatedTodos = goal.todos.map((todo) =>
            todo.id === todoId
              ? {
                  ...todo,
                  ...updates,
                  updatedAt: new Date(),
                }
              : todo,
          );
          const completedTodos = updatedTodos.filter((todo) => todo.status === 'completed');
          const progress = (completedTodos.length / updatedTodos.length) * 100;

          return {
            ...goal,
            todos: updatedTodos,
            progress,
            updatedAt: new Date(),
          };
        }
        return goal;
      }),
    }));
  },

  deleteTodo: (goalId, todoId) => {
    set((state) => ({
      goals: state.goals.map((goal) => {
        if (goal.id === goalId) {
          const updatedTodos = goal.todos.filter((todo) => todo.id !== todoId);
          const completedTodos = updatedTodos.filter((todo) => todo.status === 'completed');
          const progress = updatedTodos.length ? (completedTodos.length / updatedTodos.length) * 100 : 0;

          return {
            ...goal,
            todos: updatedTodos,
            progress,
            updatedAt: new Date(),
          };
        }
        return goal;
      }),
    }));
  },

  reorderGoals: (goals) => {
    set({ goals });
  },

  reorderTodos: (goalId, todos) => {
    set((state) => ({
      goals: state.goals.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              todos,
              updatedAt: new Date(),
            }
          : goal,
      ),
    }));
  },
}));
