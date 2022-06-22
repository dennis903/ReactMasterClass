import React from 'react';
import { fetchCoinInfo, fetchTickersInfo } from '../api';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { Routes, Route, useParams, useLocation, Link, useMatch }  from 'react-router-dom';
import Price from './Price';
import Chart from './Chart';

type RouteParams = { //interface를 쓰면 왜 안됌??
	coinId: string;
}

type RouteState = {
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
const Overview = styled.div`
	display: flex;
	justify-content: space-between;
	background-color: rgba(0, 0, 0, 0.5);
	padding: 10px 20px;
	border-radius: 10px;
`

const OverviewItem = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: 12px;
	span:first-child {
		margin-bottom: 5px;
	}
`

const Description = styled.p`
	margin: 20px 0px;
	padding: 10px;
`

const Tabs = styled.div `
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	margin: 25px 0px;
	gap: 10px;
`

const Tab = styled.span<{isActive: boolean}> `
	text-align: center;
	text-transform: uppercase;
	font-size: 12px;
	font-weight: 400;
	background-color: rgba(0, 0, 0, 0.5);
	padding: 7px 0px;
	border-radius: 10px;
	color: ${props => props.isActive ? props.theme.accentColor : props.theme.textColor};
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
	const { coinId } = useParams<RouteParams>();
	const { state } = useLocation() as RouteState;
	const priceMatch = useMatch('/:coinId/price');
	const chartMatch = useMatch('/:coinId/chart');
	const {isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(["infoData", coinId], () => fetchCoinInfo(coinId));
	const {isLoading: priceLoading, data: priceData } = useQuery<IPriceData>(
		["priceData", coinId], 
		() => fetchTickersInfo(coinId),
		{
			refetchInterval: 5000,
		}
		);
	const loading = infoLoading || priceLoading;
	if (infoData === undefined || priceData === undefined)
		return null;
	return (
		<Container>
			<Header>
				<Title>
					{state?.name ? state.name : loading ? "Loading..." : infoData?.name}
				</Title>
			</Header>
			{
				loading ? <Loader>Loading...</Loader> : (
					<>
						<Overview>
							<OverviewItem>
								<span>Rank:</span>
								<span>{infoData?.rank}</span>
							</OverviewItem>
							<OverviewItem>
								<span>SYMBOL:</span>
								<span>{infoData?.symbol}</span>
							</OverviewItem>
							<OverviewItem>
								<span>PRICE:</span>
								<span>{Math.ceil(priceData?.quotes.USD.price)}</span>
							</OverviewItem>
						</Overview>
						<Description>
							<span>{infoData?.description}</span>
						</Description>
						<Overview>
							<OverviewItem>
								<span>TOTAL SUPPLY: </span>
								<span>{priceData?.total_supply}</span>
							</OverviewItem>
							<OverviewItem>
								<span>Max SUPPLY:</span>
								<span>{priceData?.max_supply}</span>
							</OverviewItem>
						</Overview>
						<Tabs>
							<Tab isActive={priceMatch !== null}><Link to="price">price</Link></Tab>
							<Tab isActive={chartMatch !== null}><Link to="chart">chart</Link></Tab>
						</Tabs>
						<Routes>
							<Route path="chart" element={<Chart coinId={coinId}/>}/>
							<Route path="price" element={<Price />}/>
						</Routes>
					</>
				)
			}
		</Container>
	)
}

export default Coin;
