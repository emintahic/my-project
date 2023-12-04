import { configureStore } from "@reduxjs/toolkit";
import TodoTask from "../features/TodoTask";

const todosReducer = TodoTask;

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
