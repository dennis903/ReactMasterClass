import React, {useState} from 'react';
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

function Coin() {
	const [loading, isLoading] = useState(true);
	const { coinId } = useParams<RouteParams>();
	const {state} = useLocation() as RouteLocation;

	console.log(state);
	return (
		<Container>
			<Header>
				<Title>
					{state?.name || <Loader>Loading...</Loader>}
				</Title>
			</Header>
			{
				loading ? <Loader>Loading...</Loader> : null
			}
		</Container>
	)
}

export default Coin;
