"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _immutabilityHelper = _interopRequireDefault(require("immutability-helper"));

var _meldActions = require("../actions/meldActions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    "audioCuePos": null,
    "videoCuePos": null
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _meldActions.CUE_AUDIO_HANDLED:
      //		console.log("HELLO FOM APP REDUCER");
      return (0, _immutabilityHelper["default"])(state, {
        $set: {
          "audioCuePos": action.payload
        }
      });

    case _meldActions.CUE_VIDEO_HANDLED:
      return (0, _immutabilityHelper["default"])(state, {
        $set: {
          "videoCuePos": action.payload
        }
      });

    default:
      return state;
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy9yZWR1Y2VyX2FwcC5qcyJdLCJuYW1lcyI6WyJzdGF0ZSIsImFjdGlvbiIsInR5cGUiLCJDVUVfQVVESU9fSEFORExFRCIsIiRzZXQiLCJwYXlsb2FkIiwiQ1VFX1ZJREVPX0hBTkRMRUQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUVlLG9CQUFzRTtBQUFBLE1BQTVEQSxLQUE0RCx1RUFBcEQ7QUFBQyxtQkFBZSxJQUFoQjtBQUFzQixtQkFBZTtBQUFyQyxHQUFvRDtBQUFBLE1BQVJDLE1BQVE7O0FBQ25GLFVBQVFBLE1BQU0sQ0FBQ0MsSUFBZjtBQUNFLFNBQUtDLDhCQUFMO0FBQ0o7QUFDTSxhQUFPLG9DQUFPSCxLQUFQLEVBQWM7QUFBQ0ksUUFBQUEsSUFBSSxFQUFFO0FBQUMseUJBQWVILE1BQU0sQ0FBQ0k7QUFBdkI7QUFBUCxPQUFkLENBQVA7O0FBQ0YsU0FBS0MsOEJBQUw7QUFDRSxhQUFPLG9DQUFPTixLQUFQLEVBQWM7QUFBQ0ksUUFBQUEsSUFBSSxFQUFFO0FBQUMseUJBQWVILE1BQU0sQ0FBQ0k7QUFBdkI7QUFBUCxPQUFkLENBQVA7O0FBQ0Y7QUFDRSxhQUFPTCxLQUFQO0FBUEo7QUFTRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB1cGRhdGUgZnJvbSAnaW1tdXRhYmlsaXR5LWhlbHBlcic7XG5pbXBvcnQge0NVRV9BVURJT19IQU5ETEVELCBDVUVfVklERU9fSEFORExFRH0gZnJvbSAnLi4vYWN0aW9ucy9tZWxkQWN0aW9ucyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IHtcImF1ZGlvQ3VlUG9zXCI6IG51bGwsIFwidmlkZW9DdWVQb3NcIjogbnVsbH0sIGFjdGlvbikge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBDVUVfQVVESU9fSEFORExFRDpcbi8vXHRcdGNvbnNvbGUubG9nKFwiSEVMTE8gRk9NIEFQUCBSRURVQ0VSXCIpO1xuICAgICAgcmV0dXJuIHVwZGF0ZShzdGF0ZSwgeyRzZXQ6IHtcImF1ZGlvQ3VlUG9zXCI6IGFjdGlvbi5wYXlsb2FkfX0pO1xuICAgIGNhc2UgQ1VFX1ZJREVPX0hBTkRMRUQ6XG4gICAgICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7JHNldDoge1widmlkZW9DdWVQb3NcIjogYWN0aW9uLnBheWxvYWR9fSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufVxuIl19