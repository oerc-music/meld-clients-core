import update from 'immutability-helper';
import jsonld from 'jsonld'

const REGISTER_TRAVERSAL = "REGISTER_TRAVERSAL";
const RUN_TRAVERAL = "RUN_TRAVERSAL"

const INIT_STATE = { 
  running = 0,
  pool = {} 
}
 
export default function (state = INIT_STATE, action) { 
  const payload = action.payload;
  switch (action.type) { 
    case REGISTER_TRAVERSAL: 
      return update(state, { 
        pool: { 
          $merge:  {
            [payload.docUri]: payload.params
          }
        }, 
        running: { 
          $set: state.running + 1
        }
      });
    case RUN_TRAVERSAL:
      if(payload.uri in state.pool) { 
        return update(state, { 
          pool: { 
            $unset: [payload.docUri]
          }
        })
      } else { 
        console.log("WARNING: Traversal on document not included in traversal pool!", payload.docUri)
      }
      break;
    case COMPLETE_TRAVERSAL: 
      return update(state, { 
        running: { 
          $set: state.running - 1
        }
      })
    default:
      return state;
  }
}
