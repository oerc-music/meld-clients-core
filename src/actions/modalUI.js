import ReactDOM from 'react-dom';

export const UI_CONSTITUENT_CLICKED = "UI_CONSTITUENT_CLICKED";

export function constituentClicked(e) {
	const constituentid = e.target.closest(".constituent").getAttribute("id");
	return {
		type: UI_CONSTITUENT_CLICKED,
		payload: constituentid
	}
}	


