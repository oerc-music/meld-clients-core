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