import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import TodoList from "./components/TodoList";
import Header from "./components/Header";

const App = () => {
  return (
    <Provider store={store}>
      <div className="">
        <Header />
        <TodoList />
      </div>
    </Provider>
  );
};

export default App;
