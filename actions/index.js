export function fetchScore(uri) { 
	return { 
		type: 'SCORE_FETCHED',
		payload: uri
	}
}
