"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _immutabilityHelper = _interopRequireDefault(require("immutability-helper"));

var _modalUI = require("../actions/modalUI");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// terminology: "constituents" are items in the modal UI pane;
// "elements" are selectable bits of content (e.g. score elements, annotation glyphs, ...)
function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    constituents: new Set(),
    elements: {},
    mode: ""
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var newState;

  switch (action.type) {
    case _modalUI.UI_CONSTITUENT_CLICKED:
      // console.log("UI constituent clicked: ", action.payload);
      if (!state.constituents.has(action.payload)) {
        newState = (0, _immutabilityHelper["default"])(state, {
          constituents: {
            "$add": [action.payload]
          }
        });
      }

      return newState;

    case _modalUI.SET_MODE:
      // n.b. also clears out all selected constituents
      // console.log("Setting mode: ", action.payload);
      return (0, _immutabilityHelper["default"])(state, {
        mode: {
          "$set": action.payload
        }
      });

    case _modalUI.CLEAR_CONSTITUENTS:
      // console.log("Clearing constituents");
      return (0, _immutabilityHelper["default"])(state, {
        constituents: {
          "$set": new Set()
        }
      });

    case _modalUI.CLEAR_ELEMENTS:
      // console.log("Clearing elements");
      return (0, _immutabilityHelper["default"])(state, {
        elements: _defineProperty({}, action.payload, {
          "$set": []
        })
      });

    case _modalUI.POP_ELEMENTS:
      // console.log("Popping oldest element selection");
      var elements = state.elements[action.payload]; // console.log("State: ", state, " Action: ", action)

      return (0, _immutabilityHelper["default"])(state, {
        elements: _defineProperty({}, action.payload, {
          "$set": elements.slice(0, elements.length - 1)
        })
      });
    // n.b. slice is non-mutating, so reducer-safe.

    case _modalUI.ELEMENT_CLICKED:
      // console.log("Element clicked:", action);
      newState = (0, _immutabilityHelper["default"])(state, {});

      if (!(action.payload.elementType in state.elements)) {
        // if we don't yet have this element type, start recording it
        return (0, _immutabilityHelper["default"])(state, {
          elements: {
            "$merge": _defineProperty({}, action.payload.elementType, [action.payload.elementId])
          }
        });
      }

      if (state.elements[action.payload.elementType].includes(action.payload.elementId)) {
        // we already have this particular element,
        // make it the only selection
        return (0, _immutabilityHelper["default"])(state, {
          elements: _defineProperty({}, action.payload.elementType, {
            "$set": [action.payload.elementId]
          })
        });
      } else {
        // add this element as the new front of the list
        // console.log("!!!", action.payload)
        return (0, _immutabilityHelper["default"])(state, {
          elements: _defineProperty({}, action.payload.elementType, {
            "$unshift": [action.payload.elementId]
          })
        });
      }

    default:
      // console.log("reducer_modalUI: Unknown action: ", action);
      return state;
  }
}

;