import update from 'immutability-helper';
import { CREATE_SESSION } from '../actions/index';

export default function(state = {newSessionUri:"", newSessionScore:""}, action) {
	switch (action.type) {
	case CREATE_SESSION:
		console.log("Created session: ", action.payload);
		return update(state, { $set: { "newSessionUri" : action.payload.headers.location} });
	default: 
		console.log("Unknown action: ", action);
		return state;
	};
};
