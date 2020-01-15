import update from 'immutability-helper';
import jsonld from 'jsonld';

const REGISTER_TRAVERSAL = "REGISTER_TRAVERSAL";
const RUN_TRAVERSAL = "RUN_TRAVERSAL";
const TRAVERSAL_FAILED = "TRAVERSAL_FAILED";
const TRAVERSAL_UNNECCESSARY = "TRAVERSAL_UNNECCESSARY";
const FETCH_GRAPH_DOCUMENT = "FETCH_GRAPH_DOCUMENT";
const TRAVERSAL_HAPPENED = "TRAVERSAL_HAPPENED";

const INIT_STATE = {
	done: {},
  running: 0,
  pool: {} 
}
 
export default function (state = INIT_STATE, action) {
  const payload = action.payload;
//	console.log("Seeing "+action.type);
  switch (action.type) { 
    case REGISTER_TRAVERSAL:
//			console.log("registering: "+payload.docUri);
      return update(state, { 
        pool: { 
          $merge:  {
            [payload.docUri]: payload.params
          }
        }
      });
    case RUN_TRAVERSAL:
//			console.log("Traversal is", payload.docUri);
      if(payload.docUri in state.pool) { 
        return update(state, { 
          pool: { 
            $unset: [payload.docUri]
          },
          running: { 
            $set: state.running + 1
          }
        })
      } else { 
        console.log("WARNING: Traversal on document not included in traversal pool!", payload.docUri);
				return state;
      }
      break;
		case TRAVERSAL_FAILED:
//			console.log("failure");
		case TRAVERSAL_UNNECCESSARY:
			return update(state, {
				done: {
					$merge: {
						[payload.docUri]: state.running
					}
				},
				running: {
					$set: state.running -1
				}
			})
    case FETCH_GRAPH_DOCUMENT:
//			console.log("reducing running from "+state.running);
      // new graph fragment has arrived, i.e. a traversal hop has completed
      return update(state, { 
        running: { 
          $set: state.running - 1
        }
      })
		case TRAVERSAL_HAPPENED:
			return update(state, {
				done: {
					$merge: {
						[payload.docUri]: state.running
					}
				}
			})
    default:
      return state;
  }
}
