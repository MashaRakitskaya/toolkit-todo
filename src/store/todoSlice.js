import { createSlice } from '@reduxjs/toolkit';
// createSlice  может быть много
const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
  },
  // набор методов которые используютс, action событие что произошло
  reducers: {
    addTodo(state, action) {
      console.log(state);
      console.log(action);
      state.todos.push({
        id: new Date().toISOString(),
        text: action.payload.text,
        completed: false,
      });
    },
    removeTodo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
    toggleTodoComplete(state, action) {
      const toggleTodo = state.todos.find(
        (todo) => todo.id === action.payload.id
      );
      toggleTodo.completed = !toggleTodo.completed;
    },
  },
});

// достаем экшены через дестракторизацию
export const { addTodo, removeTodo, toggleTodoComplete } = todoSlice.actions;
// создается овтаомитически reducer
export default todoSlice.reducer;
