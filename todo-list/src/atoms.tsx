import { atom, selector } from "recoil";

export interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DONE" | "DOING";
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    return [
      toDos.filter((todo) => todo.category === 'DOING'),
      toDos.filter((todo) => todo.category === 'DONE'),
      toDos.filter((todo) => todo.category === 'TO_DO')
    ]
  }
})