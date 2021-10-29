import React, { useState, useEffect } from 'react';
import './App.css';
import TodoList from 'components/TodoList';
import InputField from 'components/InputField';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTodo, fetchTodos } from './store/todoSlice';

const App = () => {
  const [text, setText] = useState('');
  const { status, error } = useSelector((state) => state.todos);
  // dispatch функция которая сробатывает как тригер
  // что случилось какое-то событие,пора передать какое-то событие в редъюсер
  const dispatch = useDispatch();
  const addTask = () => {
    // обьект {text} чтобы в slice обращаться к ключу action.payload.text
    dispatch(addNewTodo(text));
    setText('');
  };
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className='App'>
      <InputField text={text} setText={setText} addTodos={addTask} />
      {status === 'loading' && <h2>Loading...</h2>}
      {error && <h2>An arror occured:{error}</h2>}
      <TodoList />
    </div>
  );
};

export default App;
