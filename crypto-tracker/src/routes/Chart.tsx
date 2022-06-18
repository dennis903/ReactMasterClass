import React from 'react'
import {useQuery} from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';

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

interface ISeries {
	name: string;
	data: IHistorical;
}

function Chart({ coinId } : IChartProps) {
	const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));
	const Series: ISeries[] =
		[
			{
				name: 'Price',
				data: data?.map(e => e.close)
			}
		]
	return (
		<div>
			{isLoading ? "Loading chart..." : <ApexChart 
				type="line"
				series={Series}
				options={{
					theme: {
						mode: "dark",
					},
					chart: {
						height: 300,
						width: 500,
						toolbar: {
							show: false,
						},
						background: "transparent",
					},
					grid: { show: false },
					stroke: {
						curve: "smooth",
						width: 4,
					},
					yaxis: {
						show: false,
					},
					xaxis: {
						axisBorder: { show: false },
						axisTicks: { show: false },
						labels: { show: false },
					},
				}}
			/>}
		</div>
	)
}

export default Chart
