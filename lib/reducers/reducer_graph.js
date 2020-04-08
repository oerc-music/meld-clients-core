import update from 'immutability-helper';
import JSum from 'jsum';
import { APPLY_TRAVERSAL_OBJECTIVE, ensureArray, FETCH_GRAPH, FETCH_GRAPH_DOCUMENT, FETCH_WORK, SESSION_GRAPH_ETAG, SET_TRAVERSAL_OBJECTIVES } from '../actions/index';
import { QUEUE_NEXT_SESSION } from '../actions/meldActions';
const INIT_STATE = {
  //    graph: {  
  //        annoGraph: {}, 
  //        targetsById: {}, 
  //        targetsByType: {}
  //    },
  etags: {},
  nextSession: "",
  info: {},
  graph: [],
  objectives: [],
  outcomes: [],
  outcomesHash: ""
};
export default function (state = INIT_STATE, action) {
  switch (action.type) {
    case FETCH_GRAPH:
      let byId = {};
      let byType = {};
      let payload = action.payload;

      if (typeof payload === "string") {
        payload = JSON.parse(payload);
      } // console.log("Hello from FETCH_GRAPH. Action is: ", action);


      payload = ensureArray(payload, "@graph"); // console.log("Looking at ", payload);

      payload = payload["@graph"][0];

      if ("ldp:contains" in payload) {
        payload = ensureArray(payload, "ldp:contains");
        payload["ldp:contains"].map(a => {
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

          a = ensureArray(a, "oa:hasTarget");
          a["oa:hasTarget"].map(targetResource => {
            // lookup target IDs to get types and component annotations
            if (targetResource["@id"] in byId) {
              // console.log("Trying to push:", byId[targetResource["@id"]]["annotations"]);
              byId[targetResource["@id"]]["annotations"].push(a);
            } else {
              byId[targetResource["@id"]] = {
                "type": targetResource["@type"],
                "annotations": [a]
              };
            } // lookup target type to get target ID


            if (targetResource["@type"] in byType) {
              byType[targetResource["@type"]].push({
                [targetResource["@id"]]: true
              });
            } else {
              byType[targetResource["@type"]] = [{
                [targetResource["@id"]]: true
              }];
            }
          });
        });
      } else {
        console.log("Graph contains no annotations: ", payload);
      }

      return update(state, {
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

    case SESSION_GRAPH_ETAG:
      return update(state, {
        etags: {
          $set: {
            [action.payload.uri]: action.payload.etag
          }
        }
      });

    case QUEUE_NEXT_SESSION:
      // console.log("Setting next session: ", action.payload);
      return update(state, {
        nextSession: {
          $set: action.payload
        }
      });

    case FETCH_WORK:
      if (action.payload.info) {
        return update(state, {
          info: {
            $merge: {
              [action.payload.target["@id"]]: action.payload.info
            }
          }
        });
      }

      break;

    case SET_TRAVERSAL_OBJECTIVES:
      // register the set of objectives provided by the MELD application
      // and initialise the outcomes in a corresponding array.
      // Typically run once on mount.
      return update(state, {
        objectives: {
          $set: action.payload
        },
        outcomes: {
          $set: new Array(action.payload.length)
        }
      });

    case FETCH_GRAPH_DOCUMENT:
      // new graph fragment has arrived. Add it to our graph.
      return update(state, {
        graph: {
          $push: action.payload
        }
      });

    case APPLY_TRAVERSAL_OBJECTIVE:
      // an objective has been applied against the graph. Store the outcome at the
      // appropriate index.
      let updatedOutcomes = state.outcomes;
      updatedOutcomes[action.payload.ix] = action.payload.framed;
      let updatedOutcomesHash = JSum.digest(updatedOutcomes, 'md5', 'hex');
      return update(state, {
        outcomes: {
          $set: updatedOutcomes
        },
        outcomesHash: {
          $set: updatedOutcomesHash
        }
      });

    default:
      return state;
  }
}