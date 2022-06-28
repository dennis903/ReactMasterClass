import React from "react";
import { useRecoilValue } from "recoil";
import { toDoSelector } from "./atoms";
import CreateTodo from "./CreateTodo";
import Todo from "./Todo";

function TodoList() {
  const [doing, done, todo] = useRecoilValue(toDoSelector);
  return (
    <div>
      <h1>Todos</h1>
      <hr />
      <CreateTodo />
      <hr />
      <h2>To do</h2>
      <ul>
        {todo.map((e) => (
          <Todo key={e.id} {...e} />
        ))}
      </ul>
      <hr />
      <h2>Doing</h2>
      <ul>
        {doing.map((e) => (
          <Todo key={e.id} {...e} />
        ))}
      </ul>
      <hr />
      <h2>Done</h2>
      <ul>
        {done.map((e) => (
          <Todo key={e.id} {...e} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
