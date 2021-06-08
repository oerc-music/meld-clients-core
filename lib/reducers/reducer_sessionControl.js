"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _immutabilityHelper = _interopRequireDefault(require("immutability-helper"));

var _index = require("../actions/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    newSessionUri: "",
    newSessionScore: "",
    muzicodesUpdated: false
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _index.MUZICODES_UPDATED:
      // console.log("Muzicodes has been updated.");
      return (0, _immutabilityHelper["default"])(state, {
        $merge: {
          "muzicodesUpdated": true
        }
      });

    case _index.CREATE_SESSION:
      // console.log("Created session: ", action.payload);
      return (0, _immutabilityHelper["default"])(state, {
        $merge: {
          "newSessionUri": action.payload.headers.location,
          "newSessionScore": action.payload.data["@graph"][0]["mo:performance_of"]["@id"]
        }
      });

    default:
      // console.log("Unknown action: ", action);
      return state;
  }
}

;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy9yZWR1Y2VyX3Nlc3Npb25Db250cm9sLmpzIl0sIm5hbWVzIjpbInN0YXRlIiwibmV3U2Vzc2lvblVyaSIsIm5ld1Nlc3Npb25TY29yZSIsIm11emljb2Rlc1VwZGF0ZWQiLCJhY3Rpb24iLCJ0eXBlIiwiTVVaSUNPREVTX1VQREFURUQiLCIkbWVyZ2UiLCJDUkVBVEVfU0VTU0lPTiIsInBheWxvYWQiLCJoZWFkZXJzIiwibG9jYXRpb24iLCJkYXRhIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUE7Ozs7QUFFZSxvQkFBNkY7QUFBQSxNQUFuRkEsS0FBbUYsdUVBQTNFO0FBQUNDLElBQUFBLGFBQWEsRUFBRSxFQUFoQjtBQUFvQkMsSUFBQUEsZUFBZSxFQUFFLEVBQXJDO0FBQXlDQyxJQUFBQSxnQkFBZ0IsRUFBRTtBQUEzRCxHQUEyRTtBQUFBLE1BQVJDLE1BQVE7O0FBQzFHLFVBQVFBLE1BQU0sQ0FBQ0MsSUFBZjtBQUNFLFNBQUtDLHdCQUFMO0FBQ0U7QUFDQSxhQUFPLG9DQUFPTixLQUFQLEVBQWM7QUFDbkJPLFFBQUFBLE1BQU0sRUFBRTtBQUFDLDhCQUFvQjtBQUFyQjtBQURXLE9BQWQsQ0FBUDs7QUFHRixTQUFLQyxxQkFBTDtBQUNFO0FBQ0EsYUFBTyxvQ0FBT1IsS0FBUCxFQUFjO0FBQ25CTyxRQUFBQSxNQUFNLEVBQUU7QUFDTiwyQkFBaUJILE1BQU0sQ0FBQ0ssT0FBUCxDQUFlQyxPQUFmLENBQXVCQyxRQURsQztBQUVOLDZCQUFtQlAsTUFBTSxDQUFDSyxPQUFQLENBQWVHLElBQWYsQ0FBb0IsUUFBcEIsRUFBOEIsQ0FBOUIsRUFBaUMsbUJBQWpDLEVBQXNELEtBQXREO0FBRmI7QUFEVyxPQUFkLENBQVA7O0FBTUY7QUFDRTtBQUNBLGFBQU9aLEtBQVA7QUFoQko7QUFtQkQ7O0FBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdXBkYXRlIGZyb20gJ2ltbXV0YWJpbGl0eS1oZWxwZXInO1xuXG5pbXBvcnQge0NSRUFURV9TRVNTSU9OLCBNVVpJQ09ERVNfVVBEQVRFRH0gZnJvbSAnLi4vYWN0aW9ucy9pbmRleCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IHtuZXdTZXNzaW9uVXJpOiBcIlwiLCBuZXdTZXNzaW9uU2NvcmU6IFwiXCIsIG11emljb2Rlc1VwZGF0ZWQ6IGZhbHNlfSwgYWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIE1VWklDT0RFU19VUERBVEVEOlxuICAgICAgLy8gY29uc29sZS5sb2coXCJNdXppY29kZXMgaGFzIGJlZW4gdXBkYXRlZC5cIik7XG4gICAgICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7XG4gICAgICAgICRtZXJnZToge1wibXV6aWNvZGVzVXBkYXRlZFwiOiB0cnVlfVxuICAgICAgfSk7XG4gICAgY2FzZSBDUkVBVEVfU0VTU0lPTjpcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwiQ3JlYXRlZCBzZXNzaW9uOiBcIiwgYWN0aW9uLnBheWxvYWQpO1xuICAgICAgcmV0dXJuIHVwZGF0ZShzdGF0ZSwge1xuICAgICAgICAkbWVyZ2U6IHtcbiAgICAgICAgICBcIm5ld1Nlc3Npb25VcmlcIjogYWN0aW9uLnBheWxvYWQuaGVhZGVycy5sb2NhdGlvbixcbiAgICAgICAgICBcIm5ld1Nlc3Npb25TY29yZVwiOiBhY3Rpb24ucGF5bG9hZC5kYXRhW1wiQGdyYXBoXCJdWzBdW1wibW86cGVyZm9ybWFuY2Vfb2ZcIl1bXCJAaWRcIl1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwiVW5rbm93biBhY3Rpb246IFwiLCBhY3Rpb24pO1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbn07XG4iXX0=