import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { useParams, useLocation }  from 'react-router';

type RouteParams = { //interface를 쓰면 왜 안됌??
	coinId: string;
}

type RouteLocation = {
	state:{
		name:string;
	};
}
const Container = styled.div`
	padding: 0px 20px;
	max-width: 480px;
	margin: 0 auto;
`;

const Title = styled.h1 `
	color: ${(props) => props.theme.accentColor};
	font-size: 30px;
`

const Header = styled.header`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 20px 0px;
`;

const Loader = styled.span `
	text-align: center;
	display: block;
`


interface IInfoData {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
	description: string;
	message: string;
	open_source: boolean;
	started_at: string;
	development_status: string;
	hardware_wallet: boolean;
	proof_type: string;
	org_structure: string;
	hash_algorithm: string;
	first_data_at: string;
	last_data_at: string;
}

interface IPriceData {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	circulating_supply: number;
	total_supply: number;
	max_supply: number;
	beta_value: number;
	first_data_at: string;
	last_updated: string;
	quotes: {
		USD: {
			price: 	number;
			volume_24h: 	number;
			volume_24h_change_24h: 	number;
			market_cap: 	number;
			market_cap_change_24h: 	number;
			percent_change_15m: 	number;
			percent_change_30m: 	number;
			percent_change_1h: 	number;
			percent_change_6h: 	number;
			percent_change_12h: 	number;
			percent_change_24h: 	number;
			percent_change_7d: 	number;
			percent_change_30d: 	number;
			percent_change_1y: 	number;
			ath_price: 	number;
			ath_date: 	string;
			percent_from_price_ath: 	number;
		}
	};
}

function Coin() {
	const [loading,setLoading] = useState(true);
	const { coinId } = useParams<RouteParams>();
	const { state } = useLocation() as RouteLocation;
	const [infoData, setInfoData] = useState<IInfoData>();
	const [priceData, setPriceData] = useState<IPriceData>();
	useEffect(() => {
		async function fetchCoin () {
			const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
			const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
			setInfoData(infoData);
			setPriceData(priceData);
			setLoading(false);
		}
		fetchCoin();
	},[]);
	return (
		<Container>
			<Header>
				<Title>
					{state?.name || <Loader>Loading...</Loader>}
				</Title>
			</Header>
			{
				loading ? <Loader>Loading...</Loader> : priceData.quotes.USD.ath_date
			}
		</Container>
	)
}

export default Coin;
