import axios from 'axios';

export const FETCH_SCORE = 'FETCH_SCORE';
export const FETCH_TEI = 'FETCH_TEI';
export const FETCH_GRAPH = 'FETCH_GRAPH';

export function fetchScore(uri) { 
	const promise = axios.get(uri);
	return { 
		type: FETCH_SCORE,
		payload: promise 
	}
}

export function fetchTEI(uri) { 
	console.log("FETCH_TEI ACTION on URI: ", uri);
	const promise = new CETEI().getHTML5(uri);
	return {
		type: FETCH_TEI,
		payload: promise
	}
}

export function fetchGraph(uri) {
	console.log("FETCH_GRAPH ACTION ON URI: ", uri);
	const promise = axios.get(uri);
	return { 
		type: FETCH_GRAPH,
		payload: promise
	}
}
