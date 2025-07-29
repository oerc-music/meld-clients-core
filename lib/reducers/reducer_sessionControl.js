import update from 'immutability-helper';
import { CREATE_SESSION, MUZICODES_UPDATED, SET_FETCH_FUNCTION } from '../actions/index';
export default function (state = {
  newSessionUri: "",
  newSessionScore: "",
  muzicodesUpdated: false,
  fetchFunction: null
}, action) {
  switch (action.type) {
    case MUZICODES_UPDATED:
      console.log("MUZICODES_UPDATED reducer called!");
      return update(state, {
        $merge: {
          "muzicodesUpdated": true
        }
      });
    case CREATE_SESSION:
      // console.log("Created session: ", action.payload);
      return update(state, {
        $merge: {
          "newSessionUri": action.payload.headers.location,
          "newSessionScore": action.payload.data["@graph"][0]["mo:performance_of"]["@id"]
        }
      });
    case SET_FETCH_FUNCTION:
      console.log("SET_FETCH_FUNCTION reducer called with payload:", action.payload);
      return update(state, {
        $merge: {
          "fetchFunction": action.payload
        }
      });
    default:
      // console.log("Unknown action: ", action);
      return state;
  }
}
;