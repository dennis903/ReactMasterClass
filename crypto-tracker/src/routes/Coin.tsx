import React from 'react'
import { useParams }  from 'react-router';

type RouteParams = { //interface를 쓰면 왜 안됌??
	coinId: string;
}

function Coin() {
	const { coinId } = useParams<RouteParams>();
	return (
		<div>
			<h1>Coin: {coinId}</h1>
		</div>
	)
}

export default Coin;
