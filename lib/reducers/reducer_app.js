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