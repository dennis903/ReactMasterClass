const BASE_URL = 'https://api.coinpaprika.com/v1'
const REPLACED_URL = 'https://ohlcv-api.nomadcoders.workers.dev'

export function fetchCoins () {
	return fetch(`${BASE_URL}/coins`).then(
		(response) => response.json()
	);
}

export function fetchCoinInfo (coinId:string | undefined) {
	return fetch(`${BASE_URL}/coins/${coinId}`).then(
		(response) => response.json()
	)
}

export function fetchTickersInfo (coinId:string | undefined) {
	return fetch(`${BASE_URL}/tickers/${coinId}`).then(
		(response) => response.json()
	)
}

export function fetchCoinHistory (coinId:string | undefined) {
	return fetch(`${REPLACED_URL}?coinId=${coinId}`).then(
		(response) => response.json()
	)
}