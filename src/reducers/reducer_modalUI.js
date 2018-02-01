import update from 'immutability-helper';

import { UI_CONSTITUENT_CLICKED } from '../actions/modalUI';

// terminology: "constituents" are items in the modal UI pane;
// "elements" are selectable bits of content (e.g. score elements, divs, ...)

export default function(state = { constituents: new Set(), elements: new Set() }, action) {
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
	default: 
		console.log("!!Unknown action: ", action);
		return state;
	};
};
