import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  // первый пораемерт тот которым
  // мы можем передавать через диспетчер(_)
  // второй доп вещи : dispanch , getState ...
  async function (_, { rejectWithValue }) {
    try {
      const respons = await fetch(
        'https://jsonplaceholder.typicode.com/todos?_limit=10'
      );
      if (!respons.ok) {
        throw new Error('Server Error!');
      }

      const data = respons.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Can`t delete tast. Servr eroror.');
      }
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      dispatch(removeTodo({ id }));
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const toggleStatus = createAsyncThunk(
  'todos/toggleStatus',
  async function (id, { rejectWithValue, dispatch, getState }) {
    // getState получает общий стэйт
    const todo = getState().todos.todos.find((tod) => tod.id === id);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'aplication/json',
          },
          body: JSON.stringify({
            completed: !todo.completed,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Can`t toggle status tast. Servr eroror.');
      }

      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      dispatch(toggleTodoComplete({ id }));
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const addNewTodo = createAsyncThunk(
  'todos/addNewTodo',
  async function (text, { rejectWithValue, dispatch }) {
    console.log(text);
    try {
      const todo = {
        title: text,
        userId: 1,
        completed: false,
      };

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'aplication/json',
          },
          body: JSON.stringify(todo),
        }
      );

      if (!response.ok) {
        throw new Error('Can`t add new tast. Servr eroror.');
      }
      const data = await response.json();
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      dispatch(addTodo(data));
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};
// createSlice  может быть много
const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    status: null,
    error: null,
  },
  // набор методов которые используютс, action событие что произошло
  reducers: {
    addTodo(state, action) {
      state.todos.push(action.payload);
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
  // extraReducers для обработки createAsyncThunk
  extraReducers: {
    // pending идет загрузка данных
    [fetchTodos.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    // fulfilled данные успешно получены
    [fetchTodos.fulfilled]: (state, action) => {
      state.status = 'resolved данные получены';
      state.todos = action.payload;
    },
    // rejected произошла неполадка и данные не получили
    [fetchTodos.rejected]: setError,
    [deleteTodo.rejected]: setError,
    [toggleStatus.rejected]: setError,
  },
});

// достаем экшены через дестракторизацию
const { addTodo, removeTodo, toggleTodoComplete } = todoSlice.actions;
// создается овтаомитически reducer
export default todoSlice.reducer;
