import update from 'immutability-helper';
import { parse } from 'querystring';
import { FETCH_GRAPH, PROCESS_ANNOTATION, TICK } from '../actions/index';
const REGISTER_CLOCK = "REGISTER_CLOCK";
export default function (state = {
  mediaResources: {}
}, action) {
  let mediaResourcesToAdd = {};

  switch (action.type) {
    case FETCH_GRAPH:
      // parse through graph looking for timed media resources
      // to add to our state for potential timed annotation tracking
      // n.b. will need fixing if we change our manifest structures
      action.payload["@graph"][0]["ldp:contains"].map(anno => {
        anno["oa:hasTarget"].map(target => {
          if ((target["@type"] === "meldterm:AudioManifestation" || target["@type"] === "meldterm:VideoManifestation") && !(target["@id"] in state["mediaResources"])) {
            mediaResourcesToAdd[target["@id"]] = {
              times: {},
              currentTime: 0
            };
          }
        });
      });
      return update(state, {
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

      return update(state, {
        $merge: {
          mediaResources: mediaResourcesToAdd
        }
      });

    case PROCESS_ANNOTATION:
      mediaResourcesToAdd = state["mediaResources"]; // ensure targets are an array

      if (!Array.isArray(action.payload.targets)) {
        action.payload.targets = [action.payload.targets];
      }

      action.payload.targets.map(t => {
        // only interested if a) we have a timed media fragment and
        // b) we know about the media resource that this is a fragment of
        const targetUriComponents = t["@id"].split('#');
        const baseResource = targetUriComponents[0];

        if (targetUriComponents.length > 1) {
          const params = parse(targetUriComponents[1]);

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
      return update(state, {
        $set: {
          "mediaResources": mediaResourcesToAdd
        }
      });

    case TICK:
      return update(state, {
        "mediaResources": {
          [action.payload.uri]: {
            $merge: {
              "currentTime": action.payload.time
            }
          }
        }
      });

    default:
      return state;
  }
}