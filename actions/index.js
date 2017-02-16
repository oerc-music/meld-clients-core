import axios from 'axios';

export const FETCH_SCORE = 'FETCH_SCORE';

export function fetchScore(meiUri) { 
	const request = axios.get(meiUri);
	return { 
		type: FETCH_SCORE,
		payload: request
	}
}
