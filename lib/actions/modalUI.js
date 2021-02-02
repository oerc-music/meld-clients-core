"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.constituentClicked = constituentClicked;
exports.setMode = setMode;
exports.clearConstituents = clearConstituents;
exports.clearElements = clearElements;
exports.popElements = popElements;
exports.UI_CONSTITUENT_CLICKED = exports.SET_MODE = exports.ELEMENT_CLICKED = exports.POP_ELEMENTS = exports.CLEAR_ELEMENTS = exports.CLEAR_CONSTITUENTS = void 0;
var CLEAR_CONSTITUENTS = "CLEAR_CONSTITUENTS";
exports.CLEAR_CONSTITUENTS = CLEAR_CONSTITUENTS;
var CLEAR_ELEMENTS = "CLEAR_ELEMENTS";
exports.CLEAR_ELEMENTS = CLEAR_ELEMENTS;
var POP_ELEMENTS = "POP_ELEMENTS";
exports.POP_ELEMENTS = POP_ELEMENTS;
var ELEMENT_CLICKED = "ELEMENT_CLICKED";
exports.ELEMENT_CLICKED = ELEMENT_CLICKED;
var SET_MODE = "SET_MODE";
exports.SET_MODE = SET_MODE;
var UI_CONSTITUENT_CLICKED = "UI_CONSTITUENT_CLICKED";
exports.UI_CONSTITUENT_CLICKED = UI_CONSTITUENT_CLICKED;

function constituentClicked(e) {
  var constituentid = e.target.closest(".constituent").getAttribute("id");
  return {
    type: UI_CONSTITUENT_CLICKED,
    payload: constituentid
  };
}

function setMode(mode) {
  return {
    type: SET_MODE,
    payload: mode
  };
}

function clearConstituents() {
  return {
    type: CLEAR_CONSTITUENTS
  };
}

function clearElements(elementType) {
  return {
    type: CLEAR_ELEMENTS,
    payload: elementType
  };
}

function popElements(elementType) {
  return {
    type: POP_ELEMENTS,
    payload: elementType
  };
}