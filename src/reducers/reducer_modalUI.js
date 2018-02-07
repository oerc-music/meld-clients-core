import update from 'immutability-helper';

import { 
	CLEAR_CONSTITUENTS, 
	CLEAR_ELEMENTS,
	ELEMENT_CLICKED, 
	POP_ELEMENTS,
	SET_MODE, 
	UI_CONSTITUENT_CLICKED
} from '../actions/modalUI';

// terminology: "constituents" are items in the modal UI pane;
// "elements" are selectable bits of content (e.g. score elements, divs, ...)

export default function(state = { constituents: new Set(), elements: [], mode: "" }, action) {
	let newState;
	let tmpState;
	switch (action.type) {
	case UI_CONSTITUENT_CLICKED:
		console.log("UI constituent clicked: ", action.payload);
		if (!state.constituents.has(action.payload)) { 
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
			 mode: { "$set": action.payload }
		})
	case CLEAR_CONSTITUENTS:
		console.log("Clearing constituents");
		return update(state, { 
			constituents: { "$set": new Set() }
		})
	case CLEAR_ELEMENTS:
		console.log("Clearing elements");
		return update(state, { 
			elements: { "$set": [] }
		})
	case POP_ELEMENTS:
		console.log("Popping oldest element selection");
		return update(state, { 
			elements: {"$set": state.elements.slice(0,state.elements.length-1)}
		}) // n.b. slice is non-mutating, so reducer-safe. 
	case ELEMENT_CLICKED:
		console.log("Element clicked:", action);
		if (state.elements.includes(action.payload)) { 
			// we already had this element, so remove it before re-adding
			// (as we need to promote to front)
			tmpState = update(state, { 
				elements: { "$set": state.elements.filter(e => e !== action.payload) }
			});
		} else { tmpState = update(state, {}) }
		// add this element as the new front of the list 
		newState = update(tmpState, { 
			elements: { 
				"$unshift": [ action.payload ]
			} 
		});
		return newState;
		return state;
	default: 
		console.log("reducer_modalUI: Unknown action: ", action);
		return state;
	};
};
