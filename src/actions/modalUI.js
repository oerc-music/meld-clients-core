export const CLEAR_CONSTITUENTS = "CLEAR_CONSTITUENTS";
export const CLEAR_ELEMENTS = "CLEAR_ELEMENTS";
export const POP_ELEMENTS = "POP_ELEMENTS";
export const ELEMENT_CLICKED = "ELEMENT_CLICKED";
export const SET_MODE = "SET_MODE";
export const UI_CONSTITUENT_CLICKED = "UI_CONSTITUENT_CLICKED";

export function constituentClicked(e) {
  const constituentid = e.target.closest(".constituent").getAttribute("id");
  return {
    type: UI_CONSTITUENT_CLICKED,
    payload: constituentid
  }
}

export function setMode(mode) {
  return {
    type: SET_MODE,
    payload: mode
  }
}

export function clearConstituents() {
  return {
    type: CLEAR_CONSTITUENTS
  }
}

export function clearElements(elementType) {
  return {
    type: CLEAR_ELEMENTS,
    payload: elementType
  }
}

export function popElements(elementType) {
  return {
    type: POP_ELEMENTS,
    payload: elementType
  }
}	

