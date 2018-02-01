import update from 'immutability-helper';

import { UI_CONSTITUENT_CLICKED, SET_MODE, CLEAR_CONSTITUENTS } from '../actions/modalUI';

// terminology: "constituents" are items in the modal UI pane;
// "elements" are selectable bits of content (e.g. score elements, divs, ...)

export default function(state = { constituents: new Set(), elements: new Set(), mode: "" }, action) {
	let newState;
	switch (action.type) {
	case UI_CONSTITUENT_CLICKED:
		console.log("UI constituent clicked: ", action.payload);
		if (state.constituents.has(action.payload)) { 
			newState = update(state, { 
				constituents: { 
					"$remove": [ action.payload ]
				} 
			});
		} else { 
			newState = update(state, { 
				constituents: { 
					"$add": [ action.payload ]
				} 
			});
		}
		return newState;
	case SET_MODE:
		// n.b. also clears out all selected constituents
		console.log("Setting mode: ", action.payload);
		return update(state, {
			 mode: { "$set": action.payload }, 
			 constituents: new Set()
		})
	case CLEAR_CONSTITUENTS:
		console.log("Clearing constituents");
		return update(state, { constituents: new Set() })
	default: 
		console.log("reducer_modalUI: Unknown action: ", action);
		return state;
	};
};
