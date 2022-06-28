import React, { MouseEvent } from "react";
import { IToDo, toDoState } from "./atoms";
import { useSetRecoilState } from "recoil";

function Todo({ text, category, id }: IToDo) {

  const setTodos = useSetRecoilState(toDoState);

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name }
    } = event;
    setTodos((oldTodos) => {
      const targetIndex = oldTodos.findIndex((todo) => todo.id === id);
      const newTodo = {
        text: text,
        category: name as any,
        id: id
      }
      return (
        [
          ...oldTodos.slice(0, targetIndex),
          newTodo,
          ...oldTodos.slice(targetIndex + 1)
        ]);
    })
  }

  return (
    <li>
      <span>{text}</span>
      {category !== 'DOING' && <button name="DOING" onClick={onClick}>Doing</button>}
      {category !== 'TO_DO' && <button name="TO_DO" onClick={onClick}>To Do</button>}
      {category !== 'DONE' && <button name="DONE" onClick={onClick}>Done</button>}
    </li>
  );
}

export default Todo;
