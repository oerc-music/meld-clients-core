import { FETCH_SCORE } from '../actions/index'

export default function(state = null, action) { 
	switch(action.type) {
	case FETCH_SCORE:
        const svg = new verovio.toolkit().renderData(action.payload.data, {
                pageHeight: 1200,
                pageWidth: 2000,
				spacingLinear: 0.1,
				spacingNonLinear: 0.3,
                adjustPageHeight: true,
                scale: 30 
            });
		return svg;
	default: 
		return state
	};
};
