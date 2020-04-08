import update from 'immutability-helper';
import { CREATE_SESSION, MUZICODES_UPDATED } from '../actions/index';
export default function (state = {
  newSessionUri: "",
  newSessionScore: "",
  muzicodesUpdated: false
}, action) {
  switch (action.type) {
    case MUZICODES_UPDATED:
      // console.log("Muzicodes has been updated.");
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

    default:
      // console.log("Unknown action: ", action);
      return state;
  }
}
;