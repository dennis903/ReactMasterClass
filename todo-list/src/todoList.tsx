import React from 'react'
import { useForm } from 'react-hook-form';
import { atom, useRecoilState } from 'recoil';

const toDoState = atom<IToDo[]>({
	key: "toDo",
	default: []
})

interface IForm {
	toDo: string;
}

interface IToDo {
	text: string;
	id: number;
	category: "TO_DO" | "DONE" | "DOING";
}

function TodoList() {
	const [toDos, setToDos] = useRecoilState((toDoState));
	const {
		register, handleSubmit
	} = useForm<IForm>();

	const handleValid = ({toDo}: IForm) => {
		setToDos(oldToDos => [{text: toDo, id: Date.now(), category: "TO_DO"}, ...oldToDos])
		console.log(toDos);
	}

	return (
		<div>
			<h1>Todos</h1>
			<hr />
			<form onSubmit={handleSubmit(handleValid)}>
				<input
					{...register("toDo")}
				/>
			</form>
		</div>
	)
}

export default TodoList;
