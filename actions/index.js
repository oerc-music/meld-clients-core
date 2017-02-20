import axios from 'axios';

export const FETCH_SCORE = 'FETCH_SCORE';
export const FETCH_TEI = 'FETCH_TEI';

export function fetchScore(meiUri) { 
	const promise = axios.get(meiUri);
	return { 
		type: FETCH_SCORE,
		payload: promise 
	}
}

export function fetchTEI(teiUri) { 
	console.log("FETCH_TEI ACTION on URI: ", teiUri);
	const promise = new CETEI().getHTML5(teiUri);
	return {
		type: FETCH_TEI,
		payload: promise
	}
}
