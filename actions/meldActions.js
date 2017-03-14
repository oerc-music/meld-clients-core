export const MARKUP_EMPHASIS = "meldterm:highlight";
export const EMPHASIS_HANDLED = "EMPHASIS_HANDLED";

export function handleEmphasis(component, uri, fragments) {
	console.log("Got component: ", component);
	fragments.map((f) => {  
		const fLocalId = f.substr(f.indexOf("#"))
		const element = component.querySelector(fLocalId);
		if (element) { 
			if(!element.classList.contains("meld-emphasis")) {
				element.classList.add("meld-emphasis");
			}
			console.log("HANDLED ELEMENT: ", element);
		}
	});
	return {
		type: EMPHASIS_HANDLED
	}
}
