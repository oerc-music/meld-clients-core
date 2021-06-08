"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _immutabilityHelper = _interopRequireDefault(require("immutability-helper"));

var _meldActions = require("../actions/meldActions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    processedAnnotations: {}
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  if (action.type === _meldActions.ANNOTATION_SKIPPED) {
    return (0, _immutabilityHelper["default"])(state, {
      processedAnnotations: {
        $merge: _defineProperty({}, action.payload["@id"], action.payload)
      }
    });
  } else {
    return state;
  }
}

;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy9yZWR1Y2VyX2FyY2hpdmUuanMiXSwibmFtZXMiOlsic3RhdGUiLCJwcm9jZXNzZWRBbm5vdGF0aW9ucyIsImFjdGlvbiIsInR5cGUiLCJBTk5PVEFUSU9OX1NLSVBQRUQiLCIkbWVyZ2UiLCJwYXlsb2FkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUE7Ozs7OztBQUVlLG9CQUFzRDtBQUFBLE1BQTVDQSxLQUE0Qyx1RUFBcEM7QUFBQ0MsSUFBQUEsb0JBQW9CLEVBQUU7QUFBdkIsR0FBb0M7QUFBQSxNQUFSQyxNQUFROztBQUNuRSxNQUFJQSxNQUFNLENBQUNDLElBQVAsS0FBZ0JDLCtCQUFwQixFQUF3QztBQUN0QyxXQUFPLG9DQUFPSixLQUFQLEVBQWM7QUFDbkJDLE1BQUFBLG9CQUFvQixFQUFFO0FBQ3BCSSxRQUFBQSxNQUFNLHNCQUNISCxNQUFNLENBQUNJLE9BQVAsQ0FBZSxLQUFmLENBREcsRUFDcUJKLE1BQU0sQ0FBQ0ksT0FENUI7QUFEYztBQURILEtBQWQsQ0FBUDtBQU9ELEdBUkQsTUFRTztBQUNMLFdBQU9OLEtBQVA7QUFDRDtBQUVGOztBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHVwZGF0ZSBmcm9tICdpbW11dGFiaWxpdHktaGVscGVyJztcblxuaW1wb3J0IHtBTk5PVEFUSU9OX1NLSVBQRUR9IGZyb20gJy4uL2FjdGlvbnMvbWVsZEFjdGlvbnMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUgPSB7cHJvY2Vzc2VkQW5ub3RhdGlvbnM6IHt9fSwgYWN0aW9uKSB7XG4gIGlmIChhY3Rpb24udHlwZSA9PT0gQU5OT1RBVElPTl9TS0lQUEVEKSB7XG4gICAgcmV0dXJuIHVwZGF0ZShzdGF0ZSwge1xuICAgICAgcHJvY2Vzc2VkQW5ub3RhdGlvbnM6IHtcbiAgICAgICAgJG1lcmdlOiB7XG4gICAgICAgICAgW2FjdGlvbi5wYXlsb2FkW1wiQGlkXCJdXTogYWN0aW9uLnBheWxvYWRcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG59O1xuIl19