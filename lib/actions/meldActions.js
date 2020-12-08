import { createSession, patchAndProcessAnnotation, TRANSITION_TO_NEXT_SESSION } from './index';
export const MARKUP_EMPHASIS = "meldterm:emphasis";
export const MARKUP_HIGHLIGHT = "meldterm:highlight";
export const MARKUP_HIGHLIGHT2 = "meldterm:highlight2";
export const CUE_AUDIO = "meldterm:CueAudio";
export const CUE_AUDIO_HANDLED = "CUE_AUDIO_HANDLED";
export const CUE_VIDEO = "meldterm:CueVideo";
export const CUE_VIDEO_HANDLED = "CUE_VIDEO_HANDLED";
export const CUE_IMAGE = "meldterm:CueImage";
export const CUE_IMAGE_HANDLED = "CUE_IMAGE_HANDLED";
export const ANNOTATION_HANDLED = "ANNOTATION_HANDLED";
export const ANNOTATION_NOT_HANDLED = "ANNOTATION_NOT_HANDLED";
export const ANNOTATION_PATCHED = "ANNOTATION_PATCHED";
export const ANNOTATION_POSTED = "ANNOTATION_POSTED";
export const ANNOTATION_SKIPPED = "ANNOTATION_SKIPPED";
export const QUEUE_NEXT_SESSION = "QUEUE_NEXT_SESSION";
export function handleCueImage(component, annotation, uri, fragments, fragImages) {
  const haveImages = fragments.filter(f => f in fragImages);

  if (!haveImages.length) {
    return annotationNotHandled(annotation);
  }

  haveImages.map(f => {
    const fLocalId = f.substr(f.indexOf("#"));
    const element = component.querySelector(fLocalId);
    const myImage = fragImages[f];

    element.onclick = function () {
      let images = document.querySelectorAll("img");
      Array.prototype.map.call(images, function (i) {
        i.style.visibility = "hidden";
      });
      const query = "img[src='" + myImage + "']";
      document.querySelector(query).style.visibility = "visible";
    };
  });
  return annotationHandled(annotation);
}
export function TEIScroll(element) {
  if (element.closest('svg')) {
    var targetClass = false;

    for (var c = 0; c < element.classList.length; c++) {
      if (element.classList[c].indexOf("__") > -1) {
        targetClass = element.classList[c];
        var targetElements = document.getElementsByClassName(targetClass);

        for (var i = 0; i < targetElements.length; i++) {
          var textBox = targetElements[i].closest('.TEIContainer');

          if (textBox) {
            targetElements[i].scrollIntoView;
            textBox.scrollTop = textBox.offsetTop + targetElements[i].offsetTop - textBox.clientHeight / 2;
          }
        }

        return true;
      }
    }
  }

  return true;
}
export function handleCueAudio(component, annotation, body, uri, fragments) {
  if ("MEI" in fragments && "Audio" in fragments) {
    fragments.MEI.map(f => {
      const fLocalId = f.substr(f.indexOf("#"));
      const element = component.querySelector(fLocalId);

      if (element) {
        //TODO figure out what to do with multiple audio fragments
        const audioUri = fragments.Audio[0].split("#")[0];
        const audioFrag = fragments.Audio[0].split("#")[1];
        const audioFragTime = parseFloat(audioFrag.substr(audioFrag.indexOf("t=") + 2));

        element.onclick = function () {
          TEIScroll(element);
          const query = "audio[data-uri='" + audioUri + "']";
          let myPlayers = document.querySelectorAll(query);
          Array.prototype.map.call(myPlayers, function (p) {
            p.currentTime = audioFragTime;
          });
        };

        applyAnnotationId(element, annotation);
      }
    });
    return annotationHandled(annotation);
  } // console.log("Cannot handle cue audio without MEI and audio fragments!", fragments);


  return annotationNotHandled(annotation);
}
export function handleCueVideo(component, annotation, body, uri, fragments) {
  if ("MEI" in fragments && "Video" in fragments) {
    fragments.MEI.map(f => {
      const fLocalId = f.substr(f.indexOf("#"));
      const element = component.querySelector(fLocalId);

      if (element) {
        //TODO figure out what to do with multiple audio fragments
        const videoUri = fragments.video[0].split("#")[0];
        const videoFrag = fragments.video[0].split("#")[1];
        const videoFragTime = parseFloat(audioFrag.substr(videoFrag.indexOf("t=") + 2));

        element.onclick = function () {
          TEIScroll(element);
          const query = "video[data-uri='" + audioUri + "']";
          let myPlayers = document.querySelectorAll(query);
          Array.prototype.map.call(myPlayers, function (p) {
            p.currentTime = audioFragTime;
          });
        };

        applyAnnotationId(element, annotation);
      }
    });
    return annotationHandled(annotation);
  } // console.log("Cannot handle cue audio without MEI and video fragments!", fragments);


  return annotationNotHandled(annotation);
}
export function handleEmphasis(component, annotation, uri, fragments) {
  assignClass("meld-emphasis", component, annotation, uri, fragments);
  return annotationHandled();
}
export function handleHighlight(component, annotation, uri, fragments) {
  assignClass("meld-highlight", component, annotation, uri, fragments);
  return annotationHandled();
}
export function handleHighlight2(component, annotation, uri, fragments) {
  assignClass("meld-highlight2", component, annotation, uri, fragments);
  return annotationHandled();
}
export function handleIdentifyMuzicode(component, annotation, uri, fragments) {
  assignClass("meld-muzicode-identify", component, annotation, uri, fragments);
  return annotationHandled();
}
export function handleChoiceMuzicode(component, annotation, uri, fragments) {
  // console.log("CHOICE!");
  assignClass("meld-muzicode-choice", component, annotation, uri, fragments);
  return annotationHandled();
}
export function handleChallengePassed(component, annotation, uri, fragments) {
  // console.log("Challenge passed!");
  assignClassToClosestMeasure("meld-muzicode-challenge-passed", component, annotation, uri, fragments);
  return annotationHandled();
}
export function handleDisklavierStart(component, annotation, uri, fragments) {
  assignClass("meld-muzicode-disklavier-start", component, annotation, uri, fragments);
  return annotationHandled();
}
export function handleMuzicodeTriggered(component, annotation, uri, fragments, muzicodeTarget, session, nextSession, etag) {
  // console.log("Muzicode triggered:", component, annotation, uri, fragments, muzicodeTarget, etag);
  return dispatch => {
    // dispatch appropriate rendering handler depending on muzicode type
    switch (muzicodeTarget["muzicodeType"]["@id"]) {
      case "mc:Choice":
        dispatch(patchAndProcessAnnotation(handleChoiceMuzicode(component, annotation, uri, fragments), session, etag, annotation, createSession(session.substr(0, session.lastIndexOf("/")), muzicodeTarget["cue"]["@id"], {
          session,
          etag
        })));
        break;

      case "mc:Disklavier":
        dispatch(patchAndProcessAnnotation(handleDisklavierStart(component, annotation, uri, fragments), session, etag, annotation));
        break;

      case "mc:Approaching":
        dispatch(patchAndProcessAnnotation(handleIdentifyMuzicode(component, annotation, uri, fragments), session, etag, annotation));
        break;

      case "mc:Challenge":
        dispatch(patchAndProcessAnnotation(handleChallengePassed(component, annotation, uri, fragments), session, etag, annotation, createSession(session.substr(0, session.lastIndexOf("/")), muzicodeTarget["cue"]["@id"], {
          session,
          etag
        })));
        break;

      default: // console.log("Muzicode of unknown type: ", muzicodeTarget);

    }

    return annotationHandled();
  };
}
export function handleArchivedMuzicodeTrigger(component, annotation, uri, fragments, muzicodeTarget, session, nextSession, etag) {
  // console.log("Archived muzicode trigger:", component, annotation, uri, fragments, muzicodeTarget);
  return dispatch => {
    // dispatch appropriate rendering handler depending on muzicode type
    switch (muzicodeTarget["muzicodeType"]["@id"]) {
      case "mc:Choice":
        dispatch(handleChoiceMuzicode(component, annotation, uri, fragments));
        dispatch({
          type: QUEUE_NEXT_SESSION,
          payload: muzicodeTarget["cue"]["@id"]
        });
        break;

      case "mc:Disklavier":
        dispatch(handleDisklavierStart(component, annotation, uri, fragments));
        break;

      case "mc:Approaching":
        dispatch(handleIdentifyMuzicode(component, annotation, uri, fragments));
        break;

      case "mc:Challenge":
        dispatch(handleChallengePassed(component, annotation, uri, fragments));
        dispatch({
          type: QUEUE_NEXT_SESSION,
          payload: muzicodeTarget["cue"]["@id"]
        });
        break;

      default: // console.log("Muzicode of unknown type: ", muzicodeTarget);

    }

    return annotationHandled();
  };
}
export function handleQueueNextSession(session, etag, annotation) {
  // console.log("Queueing next session: ", annotation);
  return dispatch => {
    const action = {
      type: QUEUE_NEXT_SESSION,
      payload: annotation["oa:hasBody"]["@id"]
    }; //dispatch(patchAndProcessAnnotation(action, session, etag, annotation));

    dispatch(action);
  };
}
export function handleCreateNextSession(session, etag, annotation) {
  // console.log("Handling createNextSession: ", session, etag, annotation);
  return dispatch => {
    dispatch(patchAndProcessAnnotation(createSession(session.substr(0, session.lastIndexOf("/")), annotation["oa:hasBody"]["@id"], {
      etag: etag
    }), session, etag, annotation));
  };
}
export function handleTransitionToNextSession(session, etag, annotation) {
  // console.log("Transitioning to next session!");
  return {
    type: TRANSITION_TO_NEXT_SESSION
  };
}

function annotationHandled(annotation) {
  return {
    type: ANNOTATION_HANDLED,
    payload: annotation
  };
}

function annotationNotHandled(annotation) {
  return {
    type: ANNOTATION_NOT_HANDLED,
    payload: annotation
  };
}

function applyAnnotationId(element, annotation) {
  // stamp this element with the specified annotation id
  const id = annotation["@id"].replace(":", "__");

  if (!element.classList.contains(id)) {
    element.classList.add(id);
  }
}

function assignClass(className, component, annotation, uri, fragments) {
  fragments.map(f => {
    const fLocalId = f.substr(f.indexOf("#"));
    const element = component.querySelector(fLocalId);

    if (element) {
      if (!element.classList.contains(className)) {
        element.classList.add(className);
      }

      applyAnnotationId(element, annotation);

      element.onmouseover = function () {
        let highlighted = document.querySelectorAll("." + className);
        Array.prototype.map.call(highlighted, function (em) {
          em.classList.add("infocus");
        });
      };

      element.onmouseleave = function () {
        let highlighted = document.querySelectorAll("." + className);
        Array.prototype.map.call(highlighted, function (em) {
          em.classList.remove("infocus");
        });
      };
    }
  });
}

function assignClassToClosestMeasure(className, component, annotation, uri, fragments) {
  // for each fragment, assign the class label to the nearest parent that is an mei measure
  // n.b. could be the fragment itself
  fragments.map(f => {
    const fLocalId = f.substr(f.indexOf("#"));
    const element = component.querySelector(fLocalId);
    const closestMeasure = element ? element.closest(".measure") : null;

    if (closestMeasure) {
      if (!closestMeasure.classList.contains(className)) {
        closestMeasure.classList.add(className);
      }

      applyAnnotationId(closestMeasure, annotation);

      closestMeasure.onmouseover = function () {
        let highlighted = document.querySelectorAll("." + className);
        Array.prototype.map.call(highlighted, function (em) {
          em.classList.add("infocus");
        });
      };

      closestMeasure.onmouseleave = function () {
        let highlighted = document.querySelectorAll("." + className);
        Array.prototype.map.call(highlighted, function (em) {
          em.classList.remove("infocus");
        });
      };
    }
  });
}