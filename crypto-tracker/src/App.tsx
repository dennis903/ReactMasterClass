import Router from './routes/Router';
import React from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './theme'; 
import { useRecoilValue } from 'recoil';
import { isDarkTheme } from './atom'; 
import GlobalStyle from './GlobalStyle';

function App() {
	const isDark = useRecoilValue(isDarkTheme);
  return (
    <>
			<ThemeProvider theme={isDark ? darkTheme : lightTheme}>
				<GlobalStyle />
				<Router />
				<ReactQueryDevtools initialIsOpen={true}/>
			</ThemeProvider>
    </>
  );
}

export default App;
