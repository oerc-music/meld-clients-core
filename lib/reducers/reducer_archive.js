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