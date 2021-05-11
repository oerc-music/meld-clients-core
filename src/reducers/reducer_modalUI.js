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
// "elements" are selectable bits of content (e.g. score elements, annotation glyphs, ...)

export default function (state = {constituents: new Set(), elements: {}, mode: ""}, action) {
  let newState;
  switch (action.type) {
    case UI_CONSTITUENT_CLICKED:
      // console.log("UI constituent clicked: ", action.payload);
      if (!state.constituents.has(action.payload)) {
        newState = update(state, {
          constituents: {
            "$add": [action.payload]
          }
        });
      }
      return newState;
    case SET_MODE:
      // n.b. also clears out all selected constituents
      // console.log("Setting mode: ", action.payload);
      return update(state, {
        mode: {"$set": action.payload}
      });
    case CLEAR_CONSTITUENTS:
      // console.log("Clearing constituents");
      return update(state, {
        constituents: {"$set": new Set()}
      });
    case CLEAR_ELEMENTS:
      // console.log("Clearing elements");
      return update(state, {
        elements: {
          [action.payload]: {"$set": []}
        }
      });
    case POP_ELEMENTS:
      // console.log("Popping oldest element selection");
      const elements = state.elements[action.payload];
      // console.log("State: ", state, " Action: ", action)
      return update(state, {
        elements: {
          [action.payload]: {
            "$set": elements.slice(0, elements.length - 1)
          }
        }
      }); // n.b. slice is non-mutating, so reducer-safe.
    case ELEMENT_CLICKED:
      // console.log("Element clicked:", action);
      newState = update(state, {});
      if (!(action.payload.elementType in state.elements)) {
        // if we don't yet have this element type, start recording it
        return update(state, {
          elements: {
            "$merge": {
              [action.payload.elementType]: [action.payload.elementId]
            }
          }
        })
      }
      if (state.elements[action.payload.elementType].includes(action.payload.elementId)) {
        // we already have this particular element,
        // make it the only selection
        return update(state, {
          elements: {
            [action.payload.elementType]: {
              "$set": [action.payload.elementId]
            }
          }
        })
      } else {
        // add this element as the new front of the list
        // console.log("!!!", action.payload)
        return update(state, {
          elements: {
            [action.payload.elementType]: {
              "$unshift": [action.payload.elementId]
            }
          }
        })
      }
    default:
      // console.log("reducer_modalUI: Unknown action: ", action);
      return state;
  }

};
