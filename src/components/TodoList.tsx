import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import {
  Todo,
  addTodo,
  deleteTodo,
  toggleTodo,
  editTodo,
  setEditing,
} from "../features/TodoTask";

import { FaTrashCanArrowUp } from "react-icons/fa6";

import { FaPencil } from "react-icons/fa6";

const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();
  const [newValue, setNewValue] = useState("");
  const [editedTodo, setEditedTodo] = useState("");

  const handleAddTodo = () => {
    const newTodo: Todo = {
      id: Math.floor(Math.random() * 1000),
      title: newValue,
      completed: false,
    };
    if (newValue !== "") {
      dispatch(addTodo(newTodo));
      setNewValue("");
    }
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const handleToggleTodo = (id: number) => {
    dispatch(toggleTodo(id));
  };

  const handleEditTodo = (id: number) => {
    const editedTitle = editedTodo.trim();
    if (editedTitle !== "") {
      dispatch(editTodo({ id, title: editedTitle }));
    }
    dispatch(setEditing(-1));
  };

  const handleSetEditing = (id: number, title: string) => {
    setEditedTodo(title);
    dispatch(setEditing(id));
  };

  return (
    <div className="w-72 mx-auto ">
      <div className="bg-white rounded-md px-1 mt-5 py-2 drop-shadow-sm">
        <input
          type="text"
          required
          value={newValue}
          onChange={(e) => {
            setNewValue(e.target.value);
          }}
          className="bg-gray-50 h-7 rounded-md  outline-none border-none"
          placeholder="Add a new TODO"
        />
        <button
          type="submit"
          onClick={handleAddTodo}
          className="bg-blue-600 rounded-md h-7 px-3 text-sm text-white"
        >
          ADD
        </button>
      </div>

      <ul className="text-center">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex flex-row justify-between gap-3 bg-white rounded-md  mt-5 py-2 px-2 drop-shadow-sm "
          >
            {todo.editing ? (
              <div>
                <input
                  className="outline-none border-none"
                  type="text"
                  value={editedTodo}
                  onChange={(e) => setEditedTodo(e.target.value)}
                />
                <button
                  onClick={() => handleEditTodo(todo.id)}
                  className=" text-white  bg-blue-600 rounded-md h-7 px-3 text-sm text-white-6 "
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex flex-row items-center">
                <input
                  className="w-5 h-5 mr-2 cursor-pointer"
                  type="checkbox"
                  onChange={() => handleToggleTodo(todo.id)}
                />
                <span
                  className="w-12 mt-0"
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.title}
                </span>
              </div>
            )}
            <div className="flex flex-row items-end gap-5">
              {!todo.editing && (
                <div
                  onClick={() => handleSetEditing(todo.id, todo.title)}
                  className="cursor-pointer w-6 h-6  text-center "
                >
                  <FaPencil className="w-6 h-6 text-blue-600" />
                </div>
              )}
              <div onClick={() => handleDeleteTodo(todo.id)}>
                <FaTrashCanArrowUp className="w-6 h-6 text-blue-600 cursor-pointer" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
