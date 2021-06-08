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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy9yZWR1Y2VyX21vZGFsVUkuanMiXSwibmFtZXMiOlsic3RhdGUiLCJjb25zdGl0dWVudHMiLCJTZXQiLCJlbGVtZW50cyIsIm1vZGUiLCJhY3Rpb24iLCJuZXdTdGF0ZSIsInR5cGUiLCJVSV9DT05TVElUVUVOVF9DTElDS0VEIiwiaGFzIiwicGF5bG9hZCIsIlNFVF9NT0RFIiwiQ0xFQVJfQ09OU1RJVFVFTlRTIiwiQ0xFQVJfRUxFTUVOVFMiLCJQT1BfRUxFTUVOVFMiLCJzbGljZSIsImxlbmd0aCIsIkVMRU1FTlRfQ0xJQ0tFRCIsImVsZW1lbnRUeXBlIiwiZWxlbWVudElkIiwiaW5jbHVkZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFFQTs7Ozs7O0FBU0E7QUFDQTtBQUVlLG9CQUE2RTtBQUFBLE1BQW5FQSxLQUFtRSx1RUFBM0Q7QUFBQ0MsSUFBQUEsWUFBWSxFQUFFLElBQUlDLEdBQUosRUFBZjtBQUEwQkMsSUFBQUEsUUFBUSxFQUFFLEVBQXBDO0FBQXdDQyxJQUFBQSxJQUFJLEVBQUU7QUFBOUMsR0FBMkQ7QUFBQSxNQUFSQyxNQUFRO0FBQzFGLE1BQUlDLFFBQUo7O0FBQ0EsVUFBUUQsTUFBTSxDQUFDRSxJQUFmO0FBQ0UsU0FBS0MsK0JBQUw7QUFDRTtBQUNBLFVBQUksQ0FBQ1IsS0FBSyxDQUFDQyxZQUFOLENBQW1CUSxHQUFuQixDQUF1QkosTUFBTSxDQUFDSyxPQUE5QixDQUFMLEVBQTZDO0FBQzNDSixRQUFBQSxRQUFRLEdBQUcsb0NBQU9OLEtBQVAsRUFBYztBQUN2QkMsVUFBQUEsWUFBWSxFQUFFO0FBQ1osb0JBQVEsQ0FBQ0ksTUFBTSxDQUFDSyxPQUFSO0FBREk7QUFEUyxTQUFkLENBQVg7QUFLRDs7QUFDRCxhQUFPSixRQUFQOztBQUNGLFNBQUtLLGlCQUFMO0FBQ0U7QUFDQTtBQUNBLGFBQU8sb0NBQU9YLEtBQVAsRUFBYztBQUNuQkksUUFBQUEsSUFBSSxFQUFFO0FBQUMsa0JBQVFDLE1BQU0sQ0FBQ0s7QUFBaEI7QUFEYSxPQUFkLENBQVA7O0FBR0YsU0FBS0UsMkJBQUw7QUFDRTtBQUNBLGFBQU8sb0NBQU9aLEtBQVAsRUFBYztBQUNuQkMsUUFBQUEsWUFBWSxFQUFFO0FBQUMsa0JBQVEsSUFBSUMsR0FBSjtBQUFUO0FBREssT0FBZCxDQUFQOztBQUdGLFNBQUtXLHVCQUFMO0FBQ0U7QUFDQSxhQUFPLG9DQUFPYixLQUFQLEVBQWM7QUFDbkJHLFFBQUFBLFFBQVEsc0JBQ0xFLE1BQU0sQ0FBQ0ssT0FERixFQUNZO0FBQUMsa0JBQVE7QUFBVCxTQURaO0FBRFcsT0FBZCxDQUFQOztBQUtGLFNBQUtJLHFCQUFMO0FBQ0U7QUFDQSxVQUFNWCxRQUFRLEdBQUdILEtBQUssQ0FBQ0csUUFBTixDQUFlRSxNQUFNLENBQUNLLE9BQXRCLENBQWpCLENBRkYsQ0FHRTs7QUFDQSxhQUFPLG9DQUFPVixLQUFQLEVBQWM7QUFDbkJHLFFBQUFBLFFBQVEsc0JBQ0xFLE1BQU0sQ0FBQ0ssT0FERixFQUNZO0FBQ2hCLGtCQUFRUCxRQUFRLENBQUNZLEtBQVQsQ0FBZSxDQUFmLEVBQWtCWixRQUFRLENBQUNhLE1BQVQsR0FBa0IsQ0FBcEM7QUFEUSxTQURaO0FBRFcsT0FBZCxDQUFQO0FBTUk7O0FBQ04sU0FBS0Msd0JBQUw7QUFDRTtBQUNBWCxNQUFBQSxRQUFRLEdBQUcsb0NBQU9OLEtBQVAsRUFBYyxFQUFkLENBQVg7O0FBQ0EsVUFBSSxFQUFFSyxNQUFNLENBQUNLLE9BQVAsQ0FBZVEsV0FBZixJQUE4QmxCLEtBQUssQ0FBQ0csUUFBdEMsQ0FBSixFQUFxRDtBQUNuRDtBQUNBLGVBQU8sb0NBQU9ILEtBQVAsRUFBYztBQUNuQkcsVUFBQUEsUUFBUSxFQUFFO0FBQ1IsMENBQ0dFLE1BQU0sQ0FBQ0ssT0FBUCxDQUFlUSxXQURsQixFQUNnQyxDQUFDYixNQUFNLENBQUNLLE9BQVAsQ0FBZVMsU0FBaEIsQ0FEaEM7QUFEUTtBQURTLFNBQWQsQ0FBUDtBQU9EOztBQUNELFVBQUluQixLQUFLLENBQUNHLFFBQU4sQ0FBZUUsTUFBTSxDQUFDSyxPQUFQLENBQWVRLFdBQTlCLEVBQTJDRSxRQUEzQyxDQUFvRGYsTUFBTSxDQUFDSyxPQUFQLENBQWVTLFNBQW5FLENBQUosRUFBbUY7QUFDakY7QUFDQTtBQUNBLGVBQU8sb0NBQU9uQixLQUFQLEVBQWM7QUFDbkJHLFVBQUFBLFFBQVEsc0JBQ0xFLE1BQU0sQ0FBQ0ssT0FBUCxDQUFlUSxXQURWLEVBQ3dCO0FBQzVCLG9CQUFRLENBQUNiLE1BQU0sQ0FBQ0ssT0FBUCxDQUFlUyxTQUFoQjtBQURvQixXQUR4QjtBQURXLFNBQWQsQ0FBUDtBQU9ELE9BVkQsTUFVTztBQUNMO0FBQ0E7QUFDQSxlQUFPLG9DQUFPbkIsS0FBUCxFQUFjO0FBQ25CRyxVQUFBQSxRQUFRLHNCQUNMRSxNQUFNLENBQUNLLE9BQVAsQ0FBZVEsV0FEVixFQUN3QjtBQUM1Qix3QkFBWSxDQUFDYixNQUFNLENBQUNLLE9BQVAsQ0FBZVMsU0FBaEI7QUFEZ0IsV0FEeEI7QUFEVyxTQUFkLENBQVA7QUFPRDs7QUFDSDtBQUNFO0FBQ0EsYUFBT25CLEtBQVA7QUE1RUo7QUErRUQ7O0FBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdXBkYXRlIGZyb20gJ2ltbXV0YWJpbGl0eS1oZWxwZXInO1xuXG5pbXBvcnQge1xuICBDTEVBUl9DT05TVElUVUVOVFMsXG4gIENMRUFSX0VMRU1FTlRTLFxuICBFTEVNRU5UX0NMSUNLRUQsXG4gIFBPUF9FTEVNRU5UUyxcbiAgU0VUX01PREUsXG4gIFVJX0NPTlNUSVRVRU5UX0NMSUNLRURcbn0gZnJvbSAnLi4vYWN0aW9ucy9tb2RhbFVJJztcblxuLy8gdGVybWlub2xvZ3k6IFwiY29uc3RpdHVlbnRzXCIgYXJlIGl0ZW1zIGluIHRoZSBtb2RhbCBVSSBwYW5lO1xuLy8gXCJlbGVtZW50c1wiIGFyZSBzZWxlY3RhYmxlIGJpdHMgb2YgY29udGVudCAoZS5nLiBzY29yZSBlbGVtZW50cywgYW5ub3RhdGlvbiBnbHlwaHMsIC4uLilcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0ge2NvbnN0aXR1ZW50czogbmV3IFNldCgpLCBlbGVtZW50czoge30sIG1vZGU6IFwiXCJ9LCBhY3Rpb24pIHtcbiAgbGV0IG5ld1N0YXRlO1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBVSV9DT05TVElUVUVOVF9DTElDS0VEOlxuICAgICAgLy8gY29uc29sZS5sb2coXCJVSSBjb25zdGl0dWVudCBjbGlja2VkOiBcIiwgYWN0aW9uLnBheWxvYWQpO1xuICAgICAgaWYgKCFzdGF0ZS5jb25zdGl0dWVudHMuaGFzKGFjdGlvbi5wYXlsb2FkKSkge1xuICAgICAgICBuZXdTdGF0ZSA9IHVwZGF0ZShzdGF0ZSwge1xuICAgICAgICAgIGNvbnN0aXR1ZW50czoge1xuICAgICAgICAgICAgXCIkYWRkXCI6IFthY3Rpb24ucGF5bG9hZF1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ld1N0YXRlO1xuICAgIGNhc2UgU0VUX01PREU6XG4gICAgICAvLyBuLmIuIGFsc28gY2xlYXJzIG91dCBhbGwgc2VsZWN0ZWQgY29uc3RpdHVlbnRzXG4gICAgICAvLyBjb25zb2xlLmxvZyhcIlNldHRpbmcgbW9kZTogXCIsIGFjdGlvbi5wYXlsb2FkKTtcbiAgICAgIHJldHVybiB1cGRhdGUoc3RhdGUsIHtcbiAgICAgICAgbW9kZToge1wiJHNldFwiOiBhY3Rpb24ucGF5bG9hZH1cbiAgICAgIH0pO1xuICAgIGNhc2UgQ0xFQVJfQ09OU1RJVFVFTlRTOlxuICAgICAgLy8gY29uc29sZS5sb2coXCJDbGVhcmluZyBjb25zdGl0dWVudHNcIik7XG4gICAgICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7XG4gICAgICAgIGNvbnN0aXR1ZW50czoge1wiJHNldFwiOiBuZXcgU2V0KCl9XG4gICAgICB9KTtcbiAgICBjYXNlIENMRUFSX0VMRU1FTlRTOlxuICAgICAgLy8gY29uc29sZS5sb2coXCJDbGVhcmluZyBlbGVtZW50c1wiKTtcbiAgICAgIHJldHVybiB1cGRhdGUoc3RhdGUsIHtcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICBbYWN0aW9uLnBheWxvYWRdOiB7XCIkc2V0XCI6IFtdfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICBjYXNlIFBPUF9FTEVNRU5UUzpcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwiUG9wcGluZyBvbGRlc3QgZWxlbWVudCBzZWxlY3Rpb25cIik7XG4gICAgICBjb25zdCBlbGVtZW50cyA9IHN0YXRlLmVsZW1lbnRzW2FjdGlvbi5wYXlsb2FkXTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwiU3RhdGU6IFwiLCBzdGF0ZSwgXCIgQWN0aW9uOiBcIiwgYWN0aW9uKVxuICAgICAgcmV0dXJuIHVwZGF0ZShzdGF0ZSwge1xuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgIFthY3Rpb24ucGF5bG9hZF06IHtcbiAgICAgICAgICAgIFwiJHNldFwiOiBlbGVtZW50cy5zbGljZSgwLCBlbGVtZW50cy5sZW5ndGggLSAxKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7IC8vIG4uYi4gc2xpY2UgaXMgbm9uLW11dGF0aW5nLCBzbyByZWR1Y2VyLXNhZmUuXG4gICAgY2FzZSBFTEVNRU5UX0NMSUNLRUQ6XG4gICAgICAvLyBjb25zb2xlLmxvZyhcIkVsZW1lbnQgY2xpY2tlZDpcIiwgYWN0aW9uKTtcbiAgICAgIG5ld1N0YXRlID0gdXBkYXRlKHN0YXRlLCB7fSk7XG4gICAgICBpZiAoIShhY3Rpb24ucGF5bG9hZC5lbGVtZW50VHlwZSBpbiBzdGF0ZS5lbGVtZW50cykpIHtcbiAgICAgICAgLy8gaWYgd2UgZG9uJ3QgeWV0IGhhdmUgdGhpcyBlbGVtZW50IHR5cGUsIHN0YXJ0IHJlY29yZGluZyBpdFxuICAgICAgICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7XG4gICAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIFwiJG1lcmdlXCI6IHtcbiAgICAgICAgICAgICAgW2FjdGlvbi5wYXlsb2FkLmVsZW1lbnRUeXBlXTogW2FjdGlvbi5wYXlsb2FkLmVsZW1lbnRJZF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICBpZiAoc3RhdGUuZWxlbWVudHNbYWN0aW9uLnBheWxvYWQuZWxlbWVudFR5cGVdLmluY2x1ZGVzKGFjdGlvbi5wYXlsb2FkLmVsZW1lbnRJZCkpIHtcbiAgICAgICAgLy8gd2UgYWxyZWFkeSBoYXZlIHRoaXMgcGFydGljdWxhciBlbGVtZW50LFxuICAgICAgICAvLyBtYWtlIGl0IHRoZSBvbmx5IHNlbGVjdGlvblxuICAgICAgICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7XG4gICAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIFthY3Rpb24ucGF5bG9hZC5lbGVtZW50VHlwZV06IHtcbiAgICAgICAgICAgICAgXCIkc2V0XCI6IFthY3Rpb24ucGF5bG9hZC5lbGVtZW50SWRdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gYWRkIHRoaXMgZWxlbWVudCBhcyB0aGUgbmV3IGZyb250IG9mIHRoZSBsaXN0XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiISEhXCIsIGFjdGlvbi5wYXlsb2FkKVxuICAgICAgICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7XG4gICAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIFthY3Rpb24ucGF5bG9hZC5lbGVtZW50VHlwZV06IHtcbiAgICAgICAgICAgICAgXCIkdW5zaGlmdFwiOiBbYWN0aW9uLnBheWxvYWQuZWxlbWVudElkXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICBkZWZhdWx0OlxuICAgICAgLy8gY29uc29sZS5sb2coXCJyZWR1Y2VyX21vZGFsVUk6IFVua25vd24gYWN0aW9uOiBcIiwgYWN0aW9uKTtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG59O1xuIl19