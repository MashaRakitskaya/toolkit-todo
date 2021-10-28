import React from 'react';
import { useDispatch } from 'react-redux';
import { removeTodo, toggleTodoComplete } from '../store/todoSlice';

export interface ITodo {
  id: number;
  title: string;
  completed: boolean;
}

interface Props {
  todo: any;
}

const TodoItem = ({ todo }: Props) => {
  const dispatch = useDispatch();
  const { id, completed, text } = todo;
  return (
    <li key={id}>
      <input
        onChange={() => dispatch(toggleTodoComplete({ id }))}
        type='checkbox'
        checked={completed}
      />
      <span>{text}</span>
      <button
        type='button'
        onClick={() => dispatch(removeTodo({ id }))}
        className='delete'
      >
        &times;
      </button>
    </li>
  );
};

export default TodoItem;
