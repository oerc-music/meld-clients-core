import { combineReducers } from 'redux';
import GraphReducer from './reducer_graph';
import { ScoreReducer } from './reducer_score';
import TEIReducer from './reducer_tei';
import AppReducer from './reducer_app';
import SessionControlReducer from './reducer_sessionControl';
import ModalUIReducer from './reducer_modalUI';
import TimeSyncReducer from './reducer_timesync';
import TraversalPoolReducer from './reducer_traversalPool';
var reducerSets = {
  graph: GraphReducer,
  score: ScoreReducer,
  tei: TEIReducer,
  app: AppReducer,
  sessionControl: SessionControlReducer,
  modalUI: ModalUIReducer,
  traversalPool: TraversalPoolReducer,
  timesync: TimeSyncReducer
};
export var reducers = combineReducers(reducerSets);
export function addReducerSet(reducerSetName, reducerSet) {
  reducerSets[reducerSetName] = reducerSet;
  reducers = combineReducers(reducerSets);
  return reducers;
}