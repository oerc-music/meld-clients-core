import update from 'immutability-helper';
import { ANNOTATION_SKIPPED } from '../actions/meldActions';
export default function (state = {
  processedAnnotations: {}
}, action) {
  if (action.type === ANNOTATION_SKIPPED) {
    return update(state, {
      processedAnnotations: {
        $merge: {
          [action.payload["@id"]]: action.payload
        }
      }
    });
  } else {
    return state;
  }
}
;