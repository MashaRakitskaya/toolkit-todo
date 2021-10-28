import React, { useState } from 'react';
import './App.css';
import TodoList from 'components/TodoList';
import InputField from 'components/InputField';
import { useDispatch } from 'react-redux';
import { addTodo } from './store/todoSlice';

const App = () => {
  const [text, setText] = useState('');
  // dispatch функция которая сробатывает как тригер
  // что случилось какое-то событие,пора передать какое-то событие в редъюсер
  const dispatch = useDispatch();
  const addTask = () => {
    // обьект {text} чтобы в slice обращаться к ключу action.payload.text
    dispatch(addTodo({ text }));
    setText('');
  };

  return (
    <div className='App'>
      <InputField text={text} setText={setText} addTodos={addTask} />

      <TodoList />
    </div>
  );
};

export default App;
