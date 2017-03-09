export const MARKUP_EMPHASIS = "meldterm:highlight";

export function handleEmphasis(uri, fragments) {
	fragments.map((f) => {  
		const fLocalId = f.substr(f.indexOf("#")+1)
		document.getElementById(uri).getElementById(fLocalId).style.fill="red";
	});
}
