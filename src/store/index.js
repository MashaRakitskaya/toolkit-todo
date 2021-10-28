import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
// настройка стора
export default configureStore({
  reducer: { todos: todoReducer },
});
