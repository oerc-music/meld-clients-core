import update from 'immutability-helper';
import { CUE_AUDIO_HANDLED, CUE_VIDEO_HANDLED } from '../actions/meldActions';
export default function (state = {
  "audioCuePos": null,
  "videoCuePos": null
}, action) {
  switch (action.type) {
    case CUE_AUDIO_HANDLED:
      //		console.log("HELLO FOM APP REDUCER");
      return update(state, {
        $set: {
          "audioCuePos": action.payload
        }
      });

    case CUE_VIDEO_HANDLED:
      return update(state, {
        $set: {
          "videoCuePos": action.payload
        }
      });

    default:
      return state;
  }
}