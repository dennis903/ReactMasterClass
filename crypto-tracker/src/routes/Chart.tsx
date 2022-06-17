import React from 'react'
import {useQuery} from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from 'apexcharts';

interface IChartProps {
	coinId?: string;
}

interface IHistorical {
	close: string;
	high: string;
	low: string;
	market_cap: number;
	open: string;
	time_close: number;
	time_open: number;
	volume: string;
}

function Chart({ coinId } : IChartProps) {
	const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));
	console.log(data);
	return (
		<div>
			{isLoading ? "Loading chart..." : <ApexChart type="line" />}
		</div>
	)
}

export default Chart
