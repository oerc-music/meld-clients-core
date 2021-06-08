"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _immutabilityHelper = _interopRequireDefault(require("immutability-helper"));

var _querystring = require("querystring");

var _index = require("../actions/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var REGISTER_CLOCK = "REGISTER_CLOCK";

function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    mediaResources: {}
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var mediaResourcesToAdd = {};

  switch (action.type) {
    case _index.FETCH_GRAPH:
      // parse through graph looking for timed media resources
      // to add to our state for potential timed annotation tracking
      // n.b. will need fixing if we change our manifest structures
      action.payload["@graph"][0]["ldp:contains"].map(function (anno) {
        anno["oa:hasTarget"].map(function (target) {
          if ((target["@type"] === "meldterm:AudioManifestation" || target["@type"] === "meldterm:VideoManifestation") && !(target["@id"] in state["mediaResources"])) {
            mediaResourcesToAdd[target["@id"]] = {
              times: {},
              currentTime: 0
            };
          }
        });
      });
      return (0, _immutabilityHelper["default"])(state, {
        $merge: {
          mediaResources: mediaResourcesToAdd
        }
      });

    case REGISTER_CLOCK:
      // alternative, more flexible means to accomplish the result of the FETCH_GRAPH
      // action above (for use with generalised traversal)
      if (!(action.payload in state["mediaResources"])) {
        mediaResourcesToAdd[action.payload] = {
          times: {},
          currentTime: 0
        };
      }

      return (0, _immutabilityHelper["default"])(state, {
        $merge: {
          mediaResources: mediaResourcesToAdd
        }
      });

    case _index.PROCESS_ANNOTATION:
      mediaResourcesToAdd = state["mediaResources"]; // ensure targets are an array

      if (!Array.isArray(action.payload.targets)) {
        action.payload.targets = [action.payload.targets];
      }

      action.payload.targets.map(function (t) {
        // only interested if a) we have a timed media fragment and
        // b) we know about the media resource that this is a fragment of
        var targetUriComponents = t["@id"].split('#');
        var baseResource = targetUriComponents[0];

        if (targetUriComponents.length > 1) {
          var params = (0, _querystring.parse)(targetUriComponents[1]);

          if ("t" in params) {
            // have a timed media fragment
            if (baseResource in mediaResourcesToAdd) {
              // we know about this media resource
              // keep track of the annotation at this time
              mediaResourcesToAdd[baseResource]["times"][params["t"]] = action.payload.bodies;
            }
          }
        }
      });
      return (0, _immutabilityHelper["default"])(state, {
        $set: {
          "mediaResources": mediaResourcesToAdd
        }
      });

    case _index.TICK:
      return (0, _immutabilityHelper["default"])(state, {
        "mediaResources": _defineProperty({}, action.payload.uri, {
          $merge: {
            "currentTime": action.payload.time
          }
        })
      });

    default:
      return state;
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy9yZWR1Y2VyX3RpbWVzeW5jLmpzIl0sIm5hbWVzIjpbIlJFR0lTVEVSX0NMT0NLIiwic3RhdGUiLCJtZWRpYVJlc291cmNlcyIsImFjdGlvbiIsIm1lZGlhUmVzb3VyY2VzVG9BZGQiLCJ0eXBlIiwiRkVUQ0hfR1JBUEgiLCJwYXlsb2FkIiwibWFwIiwiYW5ubyIsInRhcmdldCIsInRpbWVzIiwiY3VycmVudFRpbWUiLCIkbWVyZ2UiLCJQUk9DRVNTX0FOTk9UQVRJT04iLCJBcnJheSIsImlzQXJyYXkiLCJ0YXJnZXRzIiwidCIsInRhcmdldFVyaUNvbXBvbmVudHMiLCJzcGxpdCIsImJhc2VSZXNvdXJjZSIsImxlbmd0aCIsInBhcmFtcyIsImJvZGllcyIsIiRzZXQiLCJUSUNLIiwidXJpIiwidGltZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxjQUFjLEdBQUcsZ0JBQXZCOztBQUVlLG9CQUFnRDtBQUFBLE1BQXRDQyxLQUFzQyx1RUFBOUI7QUFBQ0MsSUFBQUEsY0FBYyxFQUFFO0FBQWpCLEdBQThCO0FBQUEsTUFBUkMsTUFBUTtBQUM3RCxNQUFJQyxtQkFBbUIsR0FBRyxFQUExQjs7QUFDQSxVQUFRRCxNQUFNLENBQUNFLElBQWY7QUFDRSxTQUFLQyxrQkFBTDtBQUNFO0FBQ0E7QUFDQTtBQUNBSCxNQUFBQSxNQUFNLENBQUNJLE9BQVAsQ0FBZSxRQUFmLEVBQXlCLENBQXpCLEVBQTRCLGNBQTVCLEVBQTRDQyxHQUE1QyxDQUFnRCxVQUFDQyxJQUFELEVBQVU7QUFDeERBLFFBQUFBLElBQUksQ0FBQyxjQUFELENBQUosQ0FBcUJELEdBQXJCLENBQXlCLFVBQUNFLE1BQUQsRUFBWTtBQUNuQyxjQUFJLENBQUNBLE1BQU0sQ0FBQyxPQUFELENBQU4sS0FBb0IsNkJBQXBCLElBQ0RBLE1BQU0sQ0FBQyxPQUFELENBQU4sS0FBb0IsNkJBRHBCLEtBR0EsRUFBRUEsTUFBTSxDQUFDLEtBQUQsQ0FBTixJQUFpQlQsS0FBSyxDQUFDLGdCQUFELENBQXhCLENBSEosRUFHaUQ7QUFDL0NHLFlBQUFBLG1CQUFtQixDQUFDTSxNQUFNLENBQUMsS0FBRCxDQUFQLENBQW5CLEdBQXFDO0FBQUNDLGNBQUFBLEtBQUssRUFBRSxFQUFSO0FBQVlDLGNBQUFBLFdBQVcsRUFBRTtBQUF6QixhQUFyQztBQUNEO0FBQ0YsU0FQRDtBQVFELE9BVEQ7QUFVQSxhQUFPLG9DQUFPWCxLQUFQLEVBQWM7QUFBQ1ksUUFBQUEsTUFBTSxFQUFFO0FBQUNYLFVBQUFBLGNBQWMsRUFBRUU7QUFBakI7QUFBVCxPQUFkLENBQVA7O0FBQ0YsU0FBS0osY0FBTDtBQUNFO0FBQ0E7QUFDQSxVQUFJLEVBQUVHLE1BQU0sQ0FBQ0ksT0FBUCxJQUFrQk4sS0FBSyxDQUFDLGdCQUFELENBQXpCLENBQUosRUFBa0Q7QUFDaERHLFFBQUFBLG1CQUFtQixDQUFDRCxNQUFNLENBQUNJLE9BQVIsQ0FBbkIsR0FBc0M7QUFBQ0ksVUFBQUEsS0FBSyxFQUFFLEVBQVI7QUFBWUMsVUFBQUEsV0FBVyxFQUFFO0FBQXpCLFNBQXRDO0FBQ0Q7O0FBQ0QsYUFBTyxvQ0FBT1gsS0FBUCxFQUFjO0FBQUNZLFFBQUFBLE1BQU0sRUFBRTtBQUFDWCxVQUFBQSxjQUFjLEVBQUVFO0FBQWpCO0FBQVQsT0FBZCxDQUFQOztBQUNGLFNBQUtVLHlCQUFMO0FBQ0VWLE1BQUFBLG1CQUFtQixHQUFHSCxLQUFLLENBQUMsZ0JBQUQsQ0FBM0IsQ0FERixDQUVFOztBQUNBLFVBQUksQ0FBRWMsS0FBSyxDQUFDQyxPQUFOLENBQWNiLE1BQU0sQ0FBQ0ksT0FBUCxDQUFlVSxPQUE3QixDQUFOLEVBQThDO0FBQzVDZCxRQUFBQSxNQUFNLENBQUNJLE9BQVAsQ0FBZVUsT0FBZixHQUF5QixDQUFDZCxNQUFNLENBQUNJLE9BQVAsQ0FBZVUsT0FBaEIsQ0FBekI7QUFDRDs7QUFDRGQsTUFBQUEsTUFBTSxDQUFDSSxPQUFQLENBQWVVLE9BQWYsQ0FBdUJULEdBQXZCLENBQTJCLFVBQUNVLENBQUQsRUFBTztBQUNoQztBQUNBO0FBQ0EsWUFBTUMsbUJBQW1CLEdBQUdELENBQUMsQ0FBQyxLQUFELENBQUQsQ0FBU0UsS0FBVCxDQUFlLEdBQWYsQ0FBNUI7QUFDQSxZQUFNQyxZQUFZLEdBQUdGLG1CQUFtQixDQUFDLENBQUQsQ0FBeEM7O0FBQ0EsWUFBSUEsbUJBQW1CLENBQUNHLE1BQXBCLEdBQTZCLENBQWpDLEVBQW9DO0FBQ2xDLGNBQU1DLE1BQU0sR0FBRyx3QkFBTUosbUJBQW1CLENBQUMsQ0FBRCxDQUF6QixDQUFmOztBQUNBLGNBQUksT0FBT0ksTUFBWCxFQUFtQjtBQUNqQjtBQUNBLGdCQUFJRixZQUFZLElBQUlqQixtQkFBcEIsRUFBeUM7QUFDdkM7QUFDQTtBQUNBQSxjQUFBQSxtQkFBbUIsQ0FBQ2lCLFlBQUQsQ0FBbkIsQ0FBa0MsT0FBbEMsRUFBMkNFLE1BQU0sQ0FBQyxHQUFELENBQWpELElBQTBEcEIsTUFBTSxDQUFDSSxPQUFQLENBQWVpQixNQUF6RTtBQUNEO0FBQ0Y7QUFDRjtBQUNGLE9BaEJEO0FBaUJBLGFBQU8sb0NBQU92QixLQUFQLEVBQWM7QUFBQ3dCLFFBQUFBLElBQUksRUFBRTtBQUFDLDRCQUFrQnJCO0FBQW5CO0FBQVAsT0FBZCxDQUFQOztBQUNGLFNBQUtzQixXQUFMO0FBQ0UsYUFBTyxvQ0FBT3pCLEtBQVAsRUFBYztBQUNuQiw4Q0FDR0UsTUFBTSxDQUFDSSxPQUFQLENBQWVvQixHQURsQixFQUN3QjtBQUNwQmQsVUFBQUEsTUFBTSxFQUFFO0FBQ04sMkJBQWVWLE1BQU0sQ0FBQ0ksT0FBUCxDQUFlcUI7QUFEeEI7QUFEWSxTQUR4QjtBQURtQixPQUFkLENBQVA7O0FBU0Y7QUFDRSxhQUFPM0IsS0FBUDtBQTFESjtBQTRERCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB1cGRhdGUgZnJvbSAnaW1tdXRhYmlsaXR5LWhlbHBlcic7XG5pbXBvcnQge3BhcnNlfSBmcm9tICdxdWVyeXN0cmluZyc7XG5pbXBvcnQge0ZFVENIX0dSQVBILCBQUk9DRVNTX0FOTk9UQVRJT04sIFRJQ0t9IGZyb20gJy4uL2FjdGlvbnMvaW5kZXgnO1xuXG5jb25zdCBSRUdJU1RFUl9DTE9DSyA9IFwiUkVHSVNURVJfQ0xPQ0tcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0ge21lZGlhUmVzb3VyY2VzOiB7fX0sIGFjdGlvbikge1xuICBsZXQgbWVkaWFSZXNvdXJjZXNUb0FkZCA9IHt9O1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBGRVRDSF9HUkFQSDpcbiAgICAgIC8vIHBhcnNlIHRocm91Z2ggZ3JhcGggbG9va2luZyBmb3IgdGltZWQgbWVkaWEgcmVzb3VyY2VzXG4gICAgICAvLyB0byBhZGQgdG8gb3VyIHN0YXRlIGZvciBwb3RlbnRpYWwgdGltZWQgYW5ub3RhdGlvbiB0cmFja2luZ1xuICAgICAgLy8gbi5iLiB3aWxsIG5lZWQgZml4aW5nIGlmIHdlIGNoYW5nZSBvdXIgbWFuaWZlc3Qgc3RydWN0dXJlc1xuICAgICAgYWN0aW9uLnBheWxvYWRbXCJAZ3JhcGhcIl1bMF1bXCJsZHA6Y29udGFpbnNcIl0ubWFwKChhbm5vKSA9PiB7XG4gICAgICAgIGFubm9bXCJvYTpoYXNUYXJnZXRcIl0ubWFwKCh0YXJnZXQpID0+IHtcbiAgICAgICAgICBpZiAoKHRhcmdldFtcIkB0eXBlXCJdID09PSBcIm1lbGR0ZXJtOkF1ZGlvTWFuaWZlc3RhdGlvblwiIHx8XG4gICAgICAgICAgICAgIHRhcmdldFtcIkB0eXBlXCJdID09PSBcIm1lbGR0ZXJtOlZpZGVvTWFuaWZlc3RhdGlvblwiKVxuICAgICAgICAgICAgICAmJlxuICAgICAgICAgICAgICAhKHRhcmdldFtcIkBpZFwiXSBpbiBzdGF0ZVtcIm1lZGlhUmVzb3VyY2VzXCJdKSkge1xuICAgICAgICAgICAgbWVkaWFSZXNvdXJjZXNUb0FkZFt0YXJnZXRbXCJAaWRcIl1dID0ge3RpbWVzOiB7fSwgY3VycmVudFRpbWU6IDB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB1cGRhdGUoc3RhdGUsIHskbWVyZ2U6IHttZWRpYVJlc291cmNlczogbWVkaWFSZXNvdXJjZXNUb0FkZH19KTtcbiAgICBjYXNlIFJFR0lTVEVSX0NMT0NLOlxuICAgICAgLy8gYWx0ZXJuYXRpdmUsIG1vcmUgZmxleGlibGUgbWVhbnMgdG8gYWNjb21wbGlzaCB0aGUgcmVzdWx0IG9mIHRoZSBGRVRDSF9HUkFQSFxuICAgICAgLy8gYWN0aW9uIGFib3ZlIChmb3IgdXNlIHdpdGggZ2VuZXJhbGlzZWQgdHJhdmVyc2FsKVxuICAgICAgaWYgKCEoYWN0aW9uLnBheWxvYWQgaW4gc3RhdGVbXCJtZWRpYVJlc291cmNlc1wiXSkpIHtcbiAgICAgICAgbWVkaWFSZXNvdXJjZXNUb0FkZFthY3Rpb24ucGF5bG9hZF0gPSB7dGltZXM6IHt9LCBjdXJyZW50VGltZTogMH07XG4gICAgICB9XG4gICAgICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7JG1lcmdlOiB7bWVkaWFSZXNvdXJjZXM6IG1lZGlhUmVzb3VyY2VzVG9BZGR9fSk7XG4gICAgY2FzZSBQUk9DRVNTX0FOTk9UQVRJT046XG4gICAgICBtZWRpYVJlc291cmNlc1RvQWRkID0gc3RhdGVbXCJtZWRpYVJlc291cmNlc1wiXTtcbiAgICAgIC8vIGVuc3VyZSB0YXJnZXRzIGFyZSBhbiBhcnJheVxuICAgICAgaWYgKCEoQXJyYXkuaXNBcnJheShhY3Rpb24ucGF5bG9hZC50YXJnZXRzKSkpIHtcbiAgICAgICAgYWN0aW9uLnBheWxvYWQudGFyZ2V0cyA9IFthY3Rpb24ucGF5bG9hZC50YXJnZXRzXVxuICAgICAgfVxuICAgICAgYWN0aW9uLnBheWxvYWQudGFyZ2V0cy5tYXAoKHQpID0+IHtcbiAgICAgICAgLy8gb25seSBpbnRlcmVzdGVkIGlmIGEpIHdlIGhhdmUgYSB0aW1lZCBtZWRpYSBmcmFnbWVudCBhbmRcbiAgICAgICAgLy8gYikgd2Uga25vdyBhYm91dCB0aGUgbWVkaWEgcmVzb3VyY2UgdGhhdCB0aGlzIGlzIGEgZnJhZ21lbnQgb2ZcbiAgICAgICAgY29uc3QgdGFyZ2V0VXJpQ29tcG9uZW50cyA9IHRbXCJAaWRcIl0uc3BsaXQoJyMnKTtcbiAgICAgICAgY29uc3QgYmFzZVJlc291cmNlID0gdGFyZ2V0VXJpQ29tcG9uZW50c1swXTtcbiAgICAgICAgaWYgKHRhcmdldFVyaUNvbXBvbmVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IHBhcnNlKHRhcmdldFVyaUNvbXBvbmVudHNbMV0pO1xuICAgICAgICAgIGlmIChcInRcIiBpbiBwYXJhbXMpIHtcbiAgICAgICAgICAgIC8vIGhhdmUgYSB0aW1lZCBtZWRpYSBmcmFnbWVudFxuICAgICAgICAgICAgaWYgKGJhc2VSZXNvdXJjZSBpbiBtZWRpYVJlc291cmNlc1RvQWRkKSB7XG4gICAgICAgICAgICAgIC8vIHdlIGtub3cgYWJvdXQgdGhpcyBtZWRpYSByZXNvdXJjZVxuICAgICAgICAgICAgICAvLyBrZWVwIHRyYWNrIG9mIHRoZSBhbm5vdGF0aW9uIGF0IHRoaXMgdGltZVxuICAgICAgICAgICAgICBtZWRpYVJlc291cmNlc1RvQWRkW2Jhc2VSZXNvdXJjZV1bXCJ0aW1lc1wiXVtwYXJhbXNbXCJ0XCJdXSA9IGFjdGlvbi5wYXlsb2FkLmJvZGllc1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7JHNldDoge1wibWVkaWFSZXNvdXJjZXNcIjogbWVkaWFSZXNvdXJjZXNUb0FkZH19KTtcbiAgICBjYXNlIFRJQ0s6XG4gICAgICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7XG4gICAgICAgIFwibWVkaWFSZXNvdXJjZXNcIjoge1xuICAgICAgICAgIFthY3Rpb24ucGF5bG9hZC51cmldOiB7XG4gICAgICAgICAgICAkbWVyZ2U6IHtcbiAgICAgICAgICAgICAgXCJjdXJyZW50VGltZVwiOiBhY3Rpb24ucGF5bG9hZC50aW1lLFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufVxuIl19