import React from 'react'
import {useQuery} from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';
import { useRecoilValue } from 'recoil';
import { isDarkTheme } from '../atom';

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
	const {isLoading, data : chartData} = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));
	const isDark = useRecoilValue(isDarkTheme);
	const chart = {
		'series' : [
			{
				name: 'price',
				data: chartData?.map((price: any) => price.close) as number[]
			}
		],
	}
	return (
		<div>
			{isLoading ? "Loading chart..." : <ApexChart 
				type="line"
				series={chart.series}
				options={{
					theme: {
						mode: isDark ? "dark" : "light",
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
