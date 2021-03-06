import React from 'react'
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchCoins } from '../api';
import { isDarkTheme } from '../atom';
import { useSetRecoilState } from 'recoil';


const Title = styled.h1 `
	color: ${(props) => props.theme.accentColor};
	font-size: 30px;
`

const Container = styled.div`
	padding: 0px 20px;
	max-width: 480px;
	margin: 0 auto;
`;

const Header = styled.header`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 20px 0px;
`;

const CoinList = styled.ul`
	text-decoration: none;
`

const CoinElement = styled.li`
	margin: 20px;
	padding: 20px;
	border-radius: 15px;
  background-color: ${props => props.theme.textColor};
	color: ${props => props.theme.backgroundColor};
	a {
		transition: color 0.2s ease-in;
		display: flex;
		align-items: center;
		&:hover {
			color: ${props => props.theme.accentColor}
		}
	}
`

const Loader = styled.span `
	text-align: center;
	display: block;
`

const Img = styled.img `
	width: 30px;
	height: 30px;
	margin-right: 5px;
`;

interface CoinInterface {
	id: string,
	name: string,
	symbol: string,
	rank: number,
	is_new: boolean,
	is_active: boolean,
	type: string,
}

function Coins() {
	const { isLoading, data } = useQuery<CoinInterface[]>("allCoins", fetchCoins);
	const setDarkMode = useSetRecoilState(isDarkTheme);
	const changeDarkMode = () => (setDarkMode((prev) => !prev));

	return (
		<Container>
			<Header>
				<Title>
					코인
				</Title>
				<button onClick={changeDarkMode}>toggle mode</button>
			</Header>
			{
				isLoading ? <Loader>Loading...</Loader> : 
					<CoinList>
						{data?.slice(0, 20).map(coin => 
							<CoinElement key={coin.id}>
								<Link to={`/${coin.id}`}
											state={{
												name: coin.name,
											}}
								>
									<Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}></Img>
									{coin.name} &rarr;
								</Link>
							</CoinElement>)}
					</CoinList>
			}
		</Container>
	)
}

export default Coins
