import React from 'react';
import { useRecoilValue } from 'recoil';
import { isDarkTheme } from './atoms';
import GlobalStyle from './GlobalStyle';
import TodoList from './todoList';

function App() {
	const isDark = useRecoilValue(isDarkTheme);
  return (
    <>
				<GlobalStyle />
				<TodoList />
    </>
  );
}

export default App;
