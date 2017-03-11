import update from 'immutability-helper';
import { FETCH_TEI, FETCH_COMPONENT_TARGET } from '../actions/index'

const ASSOCIATED = "http://example.com/must-revisit-these/associatedWith";

export default function(state = {TEI: "", scrollTop:0}, action) {
	switch(action.type) { 
	case FETCH_TEI:
		console.log("TEI reducer: ", action);
		return update(state, { $set: {TEI: action.payload} });
	case FETCH_COMPONENT_TARGET:
		// find associated TEI
		const target = action.payload["@graph"][0];
		console.log("TEI REDUCER sees: ", target);
	default:
		return state;
	};
};
