"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addReducerSet = addReducerSet;
exports.reducers = void 0;

var _redux = require("redux");

var _reducer_graph = _interopRequireDefault(require("./reducer_graph"));

var _reducer_score = require("./reducer_score");

var _reducer_tei = _interopRequireDefault(require("./reducer_tei"));

var _reducer_app = _interopRequireDefault(require("./reducer_app"));

var _reducer_sessionControl = _interopRequireDefault(require("./reducer_sessionControl"));

var _reducer_modalUI = _interopRequireDefault(require("./reducer_modalUI"));

var _reducer_timesync = _interopRequireDefault(require("./reducer_timesync"));

var _reducer_traversalPool = _interopRequireDefault(require("./reducer_traversalPool"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var reducerSets = {
  graph: _reducer_graph["default"],
  score: _reducer_score.ScoreReducer,
  tei: _reducer_tei["default"],
  app: _reducer_app["default"],
  sessionControl: _reducer_sessionControl["default"],
  modalUI: _reducer_modalUI["default"],
  traversalPool: _reducer_traversalPool["default"],
  timesync: _reducer_timesync["default"]
};
var reducers = (0, _redux.combineReducers)(reducerSets);
exports.reducers = reducers;

function addReducerSet(reducerSetName, reducerSet) {
  reducerSets[reducerSetName] = reducerSet;
  exports.reducers = reducers = (0, _redux.combineReducers)(reducerSets);
  return reducers;
}