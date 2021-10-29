import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo, toggleStatus } from '../store/todoSlice';

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
  const { id, completed, title } = todo;
  return (
    <li key={id}>
      <input
        onChange={() => dispatch(toggleStatus(id))}
        type='checkbox'
        checked={completed}
      />
      <span>{title}</span>
      <button
        type='button'
        onClick={() => dispatch(deleteTodo(id))}
        className='delete'
      >
        &times;
      </button>
    </li>
  );
};

export default TodoItem;
