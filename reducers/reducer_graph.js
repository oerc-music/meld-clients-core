import { FETCH_GRAPH } from '../actions/index'

export default function(state = null, action) { 
	switch (action.type) { 
	case FETCH_GRAPH:
		return action.payload;
	default:
		return state;
	}
}
