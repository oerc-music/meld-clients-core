import { FETCH_GRAPH } from '../actions/index'

export default function(state = null, action) { 
	console.log("HELLO FROM FETCH_GRAPH", action.type)
	switch (action.type) { 
	case FETCH_GRAPH:
		return action.payload.data;
	default:
		return state;
	}
}
