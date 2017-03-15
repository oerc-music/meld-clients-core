export const MARKUP_EMPHASIS = "meldterm:highlight";
export const ANNOTATION_HANDLED = "ANNOTATION_HANDLED";

export function handleEmphasis(component, annotation, uri, fragments) {
	console.log("Got component: ", component, " with fragments ", fragments);
	fragments.map((f) => {  
		const fLocalId = f.substr(f.indexOf("#"))
		const element = component.querySelector(fLocalId);
		if (element) { 
			if(!element.classList.contains("meld-emphasis")) {
				element.classList.add("meld-emphasis");
			}
			applyAnnotationId(element, annotation);
		}
	});
	return {
		type: ANNOTATION_HANDLED,
		payload: annotation
	}
}


function applyAnnotationId(element, annotation) {
	// stamp this element with the specified annotation id
	const id = annotation["@id"].replace(":", "__");
	if(!element.classList.contains(id)) { 
		element.classList.add(id);
	}
}
