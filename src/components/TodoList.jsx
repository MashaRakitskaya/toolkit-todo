import React from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';

export interface ITodo {
  id: number;
  title: string;
  completed: boolean;
}

interface Props {
  // todos?: ITodo[];
  removeTodo: () => void;
  toggleTodoComplited: () => void;
}

export default function TodoList() {
  // state.todos.todos потому что счанала на глобальный todos а потом на todos в slice(срезе)
  const todos = useSelector((state) => state.todos.todos);
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
