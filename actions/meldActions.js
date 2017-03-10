export const MARKUP_EMPHASIS = "meldterm:highlight";
export const EMPHASIS_HANDLED = "EMPHASIS_HANDLED";

export function handleEmphasis(component, uri, fragments) {
	console.log("Got component: ", component);
	fragments.map((f) => {  
		const fLocalId = f.substr(f.indexOf("#"))
		const svgElement = component.querySelector(fLocalId);
		if (svgElement) { 
			component.querySelector(fLocalId).style.fill = "red";
		}
	});
	return {
		type: EMPHASIS_HANDLED
	}
}
