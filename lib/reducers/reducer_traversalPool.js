"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _immutabilityHelper = _interopRequireDefault(require("immutability-helper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var REGISTER_TRAVERSAL = "REGISTER_TRAVERSAL";
var RUN_TRAVERSAL = "RUN_TRAVERSAL";
var TRAVERSAL_FAILED = "TRAVERSAL_FAILED";
var TRAVERSAL_UNNECCESSARY = "TRAVERSAL_UNNECCESSARY";
var FETCH_GRAPH_DOCUMENT = "FETCH_GRAPH_DOCUMENT";
var INIT_STATE = {
  running: 0,
  pool: {},
  graphDocs: []
};

function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INIT_STATE;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var payload = action.payload;

  switch (action.type) {
    case REGISTER_TRAVERSAL:
      if (!state.graphDocs.includes(payload.docUri)) {
        return (0, _immutabilityHelper["default"])(state, {
          pool: {
            $merge: _defineProperty({}, payload.docUri, payload.params)
          }
        });
      } else {//console.log("REGISTER_TRAVERSAL: Alreaady seen this resource, ignoring: ", payload.docUri);
      }

    case RUN_TRAVERSAL:
      if (payload.docUri in state.pool) {
        return (0, _immutabilityHelper["default"])(state, {
          pool: {
            $unset: [payload.docUri]
          },
          running: {
            $set: state.running + 1
          },
          graphDocs: {
            $push: [payload.docUri]
          }
        });
      } else {
        //console.log("WARNING: Traversal on document not included in traversal pool!", payload.docUri);
        return state;
      }

      break;

    case TRAVERSAL_FAILED:
    case TRAVERSAL_UNNECCESSARY:
    case FETCH_GRAPH_DOCUMENT:
      // new graph fragment has arrived, i.e. a traversal hop has completed
      return (0, _immutabilityHelper["default"])(state, {
        running: {
          $set: state.running - 1
        }
      });

    default:
      return state;
  }
}