import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  editing: boolean;
}

interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: [],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    },
    editTodo: (state, action: PayloadAction<{ id: number; title: string }>) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, title: action.payload.title, editing: false }
          : todo
      );
    },
    setEditing: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload
          ? { ...todo, editing: true }
          : { ...todo, editing: false }
      );
    },
  },
});

export const { addTodo, deleteTodo, toggleTodo, editTodo, setEditing } =
  todosSlice.actions;
export default todosSlice.reducer;
