import {FETCH_SCORE} from '../actions/index'

export default function(state = null, action) { 
	switch(action.type) {
	case FETCH_SCORE:
		console.log("Reducer saw: ", action.payload.data);
		return new verovio.toolkit().renderData(action.payload.data, {});
	default: 
		return state
	};
};
