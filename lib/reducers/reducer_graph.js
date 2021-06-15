"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _immutabilityHelper = _interopRequireDefault(require("immutability-helper"));

var _jsum = _interopRequireDefault(require("jsum"));

var _index = require("../actions/index");

var _meldActions = require("../actions/meldActions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var INIT_STATE = {
  //    graph: {  
  //        annoGraph: {}, 
  //        targetsById: {}, 
  //        targetsByType: {}
  //    },
  etags: {},
  nextSession: "",
  info: {},
  graph: [],
  graphDocs: [],
  objectives: [],
  outcomes: [],
  outcomesHash: "",
  allObjectivesApplied: false
};

function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INIT_STATE;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _index.FETCH_GRAPH:
      var byId = {};
      var byType = {};
      var payload = action.payload;

      if (typeof payload === "string") {
        payload = JSON.parse(payload);
      }

      payload = (0, _index.ensureArray)(payload, "@graph");
      payload = payload["@graph"][0];

      if ("ldp:contains" in payload) {
        payload = (0, _index.ensureArray)(payload, "ldp:contains");
        payload["ldp:contains"].map(function (a) {
          if ("meld:state" in a && a["meld:state"]["@id"] == "meld:processed") {
            // Decide whether we want to render the processed annotation
            // ... and modify its motivation if necessary to signal its new purpose
            // This is required for annotations that both have renderings (should always show)
            // and side effects (should only happen once)
            if (a["oa:motivatedBy"]["@id"] === "motivation:muzicodeTriggered") {
              a["oa:motivatedBy"]["@id"] = "motivation:archivedMuzicodeTrigger";
              delete a["meld:state"];
            } else {
              // We can skip this processed annotation
              return;
            }
          }

          a = (0, _index.ensureArray)(a, "oa:hasTarget");
          a["oa:hasTarget"].map(function (targetResource) {
            // lookup target IDs to get types and component annotations
            if (targetResource["@id"] in byId) {
              byId[targetResource["@id"]]["annotations"].push(a);
            } else {
              byId[targetResource["@id"]] = {
                "type": targetResource["@type"],
                "annotations": [a]
              };
            } // lookup target type to get target ID


            if (targetResource["@type"] in byType) {
              byType[targetResource["@type"]].push(_defineProperty({}, targetResource["@id"], true));
            } else {
              byType[targetResource["@type"]] = [_defineProperty({}, targetResource["@id"], true)];
            }
          });
        });
      } else {
        console.log("Graph contains no annotations: ", payload);
      }

      return (0, _immutabilityHelper["default"])(state, {
        annoGraph: {
          $set: payload
        },
        targetsById: {
          $set: byId
        },
        targetsByType: {
          $set: byType
        }
      });

    case _index.SESSION_GRAPH_ETAG:
      return (0, _immutabilityHelper["default"])(state, {
        etags: {
          $set: _defineProperty({}, action.payload.uri, action.payload.etag)
        }
      });

    case _meldActions.QUEUE_NEXT_SESSION:
      // console.log("Setting next session: ", action.payload);
      return (0, _immutabilityHelper["default"])(state, {
        nextSession: {
          $set: action.payload
        }
      });

    case _index.FETCH_WORK:
      if (action.payload.info) {
        return (0, _immutabilityHelper["default"])(state, {
          info: {
            $merge: _defineProperty({}, action.payload.target["@id"], action.payload.info)
          }
        });
      }

      break;

    case _index.SET_TRAVERSAL_OBJECTIVES:
      // register the set of objectives provided by the MELD application
      // and initialise the outcomes in a corresponding array.
      // Typically run once on mount.
      return (0, _immutabilityHelper["default"])(state, {
        objectives: {
          $set: action.payload
        },
        outcomes: {
          $set: new Array(action.payload.length)
        }
      });

    case _index.FETCH_GRAPH_DOCUMENT:
      // new graph fragment has arrived. If we don't have it from a previous traversal, add it to our graph.
      if (!state.graphDocs.includes(action.payload.uri)) {
        // console.log(state.graph, state.graphDocs, action)
        return (0, _immutabilityHelper["default"])(state, {
          graph: {
            $push: action.payload.data
          },
          graphDocs: {
            $push: [action.payload.uri]
          }
        });
      } else {//console.log("FETCH_GRAPH_DOCUMENT: ignoring as already seen: ", action.payload.uri);
      }

      break;

    case _index.APPLY_TRAVERSAL_OBJECTIVE:
      // an objective has been applied against the graph. Store the outcome at the
      // appropriate index.
      var updatedOutcomes = state.outcomes;
      updatedOutcomes[action.payload.ix] = action.payload.framed;

      var updatedOutcomesHash = _jsum["default"].digest(updatedOutcomes, 'md5', 'hex');

      if (action.payload.ix === state.objectives.length - 1) {
        console.log("About to switch on allObjectivesApplied with", updatedOutcomes, state);
      }

      return (0, _immutabilityHelper["default"])(state, {
        outcomes: {
          $set: updatedOutcomes
        },
        outcomesHash: {
          $set: updatedOutcomesHash
        },
        allObjectivesApplied: {
          $set: action.payload.ix === state.objectives.length - 1 ? true : false
        }
      });

    default:
      return state;
  }
}