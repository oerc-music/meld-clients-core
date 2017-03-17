import ReactDOM from 'react-dom';

export const MARKUP_EMPHASIS = "meldterm:emphasis";
export const MARKUP_HIGHLIGHT = "meldterm:highlight";
export const MARKUP_HIGHLIGHT2 = "meldterm:highlight2";
export const CUE_AUDIO = "meldterm:CueAudio";
export const CUE_AUDIO_HANDLED = "CUE_AUDIO_HANDLED";
export const CUE_IMAGE = "meldterm:CueImage";
export const CUE_IMAGE_HANDLED = "CUE_IMAGE_HANDLED";
export const ANNOTATION_HANDLED = "ANNOTATION_HANDLED";
export const ANNOTATION_NOT_HANDLED = "ANNOTATION_NOT_HANDLED";

export function handleCueImage(component, annotation, uri, fragments, fragImages) {
	const haveImages = fragments.filter((f) => f in fragImages);
	if(!haveImages.length) { 
		return annotationNotHandled(annotation)
	}
	haveImages.map((f) => {
		const fLocalId = f.substr(f.indexOf("#"))
		const element = component.querySelector(fLocalId);
		const myImage = fragImages[f];
		element.onclick = function() { 
			let images = document.querySelectorAll("img");
			Array.prototype.map.call(images, function(i) { i.style.visibility="hidden" });
			const query = "img[src='" + myImage + "']";
			document.querySelector(query).style.visibility ="visible";
		}
	});
	return annotationHandled(annotation)
}	

export function handleCueAudio(component, annotation, body, uri, fragments) { 
    if("MEI" in fragments && "Audio" in fragments) { 
        fragments.MEI.map((f) => { 
            const fLocalId = f.substr(f.indexOf("#"))
            const element = component.querySelector(fLocalId);
            if (element) { 
                //TODO figure out what to do with multiple audio fragments
                const audioUri = fragments.Audio[0].split("#")[0];
                const audioFrag = fragments.Audio[0].split("#")[1];
                const audioFragTime = parseFloat(audioFrag.substr(audioFrag.indexOf("t=")+2))
                element.onclick = function() { 
                    const query = "audio[data-uri='" + audioUri + "']";
                    let myPlayers = document.querySelectorAll(query);
					console.log(query, audioFragTime);
                    Array.prototype.map.call(myPlayers, function(p) { p.currentTime = audioFragTime });
                };
                applyAnnotationId(element, annotation);
            }
        });
        return annotationHandled(annotation);
    }
    console.log("Cannot handle cue audio without MEI and audio fragments!", fragments);
    return annotationNotHandled(annotation);
}

export function handleEmphasis(component, annotation, uri, fragments) {
	fragments.map((f) => {  
		const fLocalId = f.substr(f.indexOf("#"))
		const element = component.querySelector(fLocalId);
		if (element) { 
			if(!element.classList.contains("meld-emphasis")) {
				element.classList.add("meld-emphasis");
			}
			applyAnnotationId(element, annotation);
			element.onmouseover = function(){ 
				let emphasised = document.querySelectorAll(".meld-emphasis");
				Array.prototype.map.call(emphasised, function(em) { em.classList.add("infocus")});
			}
			element.onmouseleave = function(){ 
				let emphasised = document.querySelectorAll(".meld-emphasis");
				Array.prototype.map.call(emphasised, function(em) { em.classList.remove("infocus")});
			}
		}

	});
	return annotationHandled();
}

export function handleHighlight(component, annotation, uri, fragments) {
	fragments.map((f) => {  
		const fLocalId = f.substr(f.indexOf("#"))
		const element = component.querySelector(fLocalId);
		if (element) { 
			if(!element.classList.contains("meld-highlight")) {
				element.classList.add("meld-highlight");
			}
			applyAnnotationId(element, annotation);
			element.onmouseover = function(){ 
				let highlighted = document.querySelectorAll(".meld-highlight");
				Array.prototype.map.call(highlighted, function(em) { em.classList.add("infocus")});
			}
			element.onmouseleave = function(){ 
				let highlighted= document.querySelectorAll(".meld-highlight");
				Array.prototype.map.call(highlighted, function(em) { em.classList.remove("infocus")});
			}
		}
	});
	return annotationHandled();
}

export function handleHighlight2(component, annotation, uri, fragments) {
	fragments.map((f) => {  
		const fLocalId = f.substr(f.indexOf("#"))
		const element = component.querySelector(fLocalId);
		if (element) { 
			if(!element.classList.contains("meld-highlight2")) {
				element.classList.add("meld-highlight2");
			}
			applyAnnotationId(element, annotation);
			element.onmouseover = function(){ 
				let highlighted = document.querySelectorAll(".meld-highlight2");
				Array.prototype.map.call(highlighted, function(em) { em.classList.add("infocus")});
			}
			element.onmouseleave = function(){ 
				let highlighted= document.querySelectorAll(".meld-highlight2");
				Array.prototype.map.call(highlighted, function(em) { em.classList.remove("infocus")});
			}
		}
	});
	return annotationHandled();
}
function annotationHandled(annotation) {
	return {
		type: ANNOTATION_HANDLED,
		payload: annotation
	}
}

function annotationNotHandled(annotation) {
	return {
		type: ANNOTATION_NOT_HANDLED,
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
