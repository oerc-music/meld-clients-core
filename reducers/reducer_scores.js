export default function(state = null, action) { 
	switch(action.type) {
	case 'SCORE_FETCHED':
		return action.payload;
	default: 
		return state
	};
};
