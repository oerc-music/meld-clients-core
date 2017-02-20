import { FETCH_TEI } from '../actions/index'

export default function(state = null, action) {
	switch(action.type) { 
	case FETCH_TEI:
		console.log("TEI reducer: ", action);
		return action.payload;
	default:
		return state;
	};
};
