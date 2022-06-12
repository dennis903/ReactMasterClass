import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import axios from 'axios';
import {Link} from 'react-router-dom';

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
		&:hover {
			color: ${props => props.theme.accentColor}
		}
	}
`


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
	const [coins, setCoins] = useState<CoinInterface[]>([]);

	useEffect (() => {
		async function fetchCoins () {
			const response = await fetch('https://api.coinpaprika.com/v1/coins');
			console.log(response);
		}
		fetchCoins();
	}, []);


	return (
		<Container>
			<Header>
				<Title>
					코인
				</Title>
			</Header>
			<CoinList>
				{coins.map(coin => 
					<CoinElement key={coin.id}>
						<Link to={`/:${coin.name}`}>{coin.name}</Link>
					</CoinElement>)}
			</CoinList>
		</Container>
	)
}

export default Coins
