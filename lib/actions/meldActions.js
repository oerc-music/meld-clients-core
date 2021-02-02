"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleCueImage = handleCueImage;
exports.TEIScroll = TEIScroll;
exports.handleCueAudio = handleCueAudio;
exports.handleCueVideo = handleCueVideo;
exports.handleEmphasis = handleEmphasis;
exports.handleHighlight = handleHighlight;
exports.handleHighlight2 = handleHighlight2;
exports.handleIdentifyMuzicode = handleIdentifyMuzicode;
exports.handleChoiceMuzicode = handleChoiceMuzicode;
exports.handleChallengePassed = handleChallengePassed;
exports.handleDisklavierStart = handleDisklavierStart;
exports.handleMuzicodeTriggered = handleMuzicodeTriggered;
exports.handleArchivedMuzicodeTrigger = handleArchivedMuzicodeTrigger;
exports.handleQueueNextSession = handleQueueNextSession;
exports.handleCreateNextSession = handleCreateNextSession;
exports.handleTransitionToNextSession = handleTransitionToNextSession;
exports.QUEUE_NEXT_SESSION = exports.ANNOTATION_SKIPPED = exports.ANNOTATION_POSTED = exports.ANNOTATION_PATCHED = exports.ANNOTATION_NOT_HANDLED = exports.ANNOTATION_HANDLED = exports.CUE_IMAGE_HANDLED = exports.CUE_IMAGE = exports.CUE_VIDEO_HANDLED = exports.CUE_VIDEO = exports.CUE_AUDIO_HANDLED = exports.CUE_AUDIO = exports.MARKUP_HIGHLIGHT2 = exports.MARKUP_HIGHLIGHT = exports.MARKUP_EMPHASIS = void 0;

var _index = require("./index");

var MARKUP_EMPHASIS = "meldterm:emphasis";
exports.MARKUP_EMPHASIS = MARKUP_EMPHASIS;
var MARKUP_HIGHLIGHT = "meldterm:highlight";
exports.MARKUP_HIGHLIGHT = MARKUP_HIGHLIGHT;
var MARKUP_HIGHLIGHT2 = "meldterm:highlight2";
exports.MARKUP_HIGHLIGHT2 = MARKUP_HIGHLIGHT2;
var CUE_AUDIO = "meldterm:CueAudio";
exports.CUE_AUDIO = CUE_AUDIO;
var CUE_AUDIO_HANDLED = "CUE_AUDIO_HANDLED";
exports.CUE_AUDIO_HANDLED = CUE_AUDIO_HANDLED;
var CUE_VIDEO = "meldterm:CueVideo";
exports.CUE_VIDEO = CUE_VIDEO;
var CUE_VIDEO_HANDLED = "CUE_VIDEO_HANDLED";
exports.CUE_VIDEO_HANDLED = CUE_VIDEO_HANDLED;
var CUE_IMAGE = "meldterm:CueImage";
exports.CUE_IMAGE = CUE_IMAGE;
var CUE_IMAGE_HANDLED = "CUE_IMAGE_HANDLED";
exports.CUE_IMAGE_HANDLED = CUE_IMAGE_HANDLED;
var ANNOTATION_HANDLED = "ANNOTATION_HANDLED";
exports.ANNOTATION_HANDLED = ANNOTATION_HANDLED;
var ANNOTATION_NOT_HANDLED = "ANNOTATION_NOT_HANDLED";
exports.ANNOTATION_NOT_HANDLED = ANNOTATION_NOT_HANDLED;
var ANNOTATION_PATCHED = "ANNOTATION_PATCHED";
exports.ANNOTATION_PATCHED = ANNOTATION_PATCHED;
var ANNOTATION_POSTED = "ANNOTATION_POSTED";
exports.ANNOTATION_POSTED = ANNOTATION_POSTED;
var ANNOTATION_SKIPPED = "ANNOTATION_SKIPPED";
exports.ANNOTATION_SKIPPED = ANNOTATION_SKIPPED;
var QUEUE_NEXT_SESSION = "QUEUE_NEXT_SESSION";
exports.QUEUE_NEXT_SESSION = QUEUE_NEXT_SESSION;

function handleCueImage(component, annotation, uri, fragments, fragImages) {
  var haveImages = fragments.filter(function (f) {
    return f in fragImages;
  });

  if (!haveImages.length) {
    return annotationNotHandled(annotation);
  }

  haveImages.map(function (f) {
    var fLocalId = f.substr(f.indexOf("#"));
    var element = component.querySelector(fLocalId);
    var myImage = fragImages[f];

    element.onclick = function () {
      var images = document.querySelectorAll("img");
      Array.prototype.map.call(images, function (i) {
        i.style.visibility = "hidden";
      });
      var query = "img[src='" + myImage + "']";
      document.querySelector(query).style.visibility = "visible";
    };
  });
  return annotationHandled(annotation);
}

function TEIScroll(element) {
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

function handleCueAudio(component, annotation, body, uri, fragments) {
  if ("MEI" in fragments && "Audio" in fragments) {
    fragments.MEI.map(function (f) {
      var fLocalId = f.substr(f.indexOf("#"));
      var element = component.querySelector(fLocalId);

      if (element) {
        //TODO figure out what to do with multiple audio fragments
        var _audioUri = fragments.Audio[0].split("#")[0];
        var _audioFrag = fragments.Audio[0].split("#")[1];

        var _audioFragTime = parseFloat(_audioFrag.substr(_audioFrag.indexOf("t=") + 2));

        element.onclick = function () {
          TEIScroll(element);
          var query = "audio[data-uri='" + _audioUri + "']";
          var myPlayers = document.querySelectorAll(query);
          Array.prototype.map.call(myPlayers, function (p) {
            p.currentTime = _audioFragTime;
          });
        };

        applyAnnotationId(element, annotation);
      }
    });
    return annotationHandled(annotation);
  } // console.log("Cannot handle cue audio without MEI and audio fragments!", fragments);


  return annotationNotHandled(annotation);
}

function handleCueVideo(component, annotation, body, uri, fragments) {
  if ("MEI" in fragments && "Video" in fragments) {
    fragments.MEI.map(function (f) {
      var fLocalId = f.substr(f.indexOf("#"));
      var element = component.querySelector(fLocalId);

      if (element) {
        //TODO figure out what to do with multiple audio fragments
        var videoUri = fragments.video[0].split("#")[0];
        var videoFrag = fragments.video[0].split("#")[1];
        var videoFragTime = parseFloat(audioFrag.substr(videoFrag.indexOf("t=") + 2));

        element.onclick = function () {
          TEIScroll(element);
          var query = "video[data-uri='" + audioUri + "']";
          var myPlayers = document.querySelectorAll(query);
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

function handleEmphasis(component, annotation, uri, fragments) {
  assignClass("meld-emphasis", component, annotation, uri, fragments);
  return annotationHandled();
}

function handleHighlight(component, annotation, uri, fragments) {
  assignClass("meld-highlight", component, annotation, uri, fragments);
  return annotationHandled();
}

function handleHighlight2(component, annotation, uri, fragments) {
  assignClass("meld-highlight2", component, annotation, uri, fragments);
  return annotationHandled();
}

function handleIdentifyMuzicode(component, annotation, uri, fragments) {
  assignClass("meld-muzicode-identify", component, annotation, uri, fragments);
  return annotationHandled();
}

function handleChoiceMuzicode(component, annotation, uri, fragments) {
  // console.log("CHOICE!");
  assignClass("meld-muzicode-choice", component, annotation, uri, fragments);
  return annotationHandled();
}

function handleChallengePassed(component, annotation, uri, fragments) {
  // console.log("Challenge passed!");
  assignClassToClosestMeasure("meld-muzicode-challenge-passed", component, annotation, uri, fragments);
  return annotationHandled();
}

function handleDisklavierStart(component, annotation, uri, fragments) {
  assignClass("meld-muzicode-disklavier-start", component, annotation, uri, fragments);
  return annotationHandled();
}

function handleMuzicodeTriggered(component, annotation, uri, fragments, muzicodeTarget, session, nextSession, etag) {
  // console.log("Muzicode triggered:", component, annotation, uri, fragments, muzicodeTarget, etag);
  return function (dispatch) {
    // dispatch appropriate rendering handler depending on muzicode type
    switch (muzicodeTarget["muzicodeType"]["@id"]) {
      case "mc:Choice":
        dispatch((0, _index.patchAndProcessAnnotation)(handleChoiceMuzicode(component, annotation, uri, fragments), session, etag, annotation, (0, _index.createSession)(session.substr(0, session.lastIndexOf("/")), muzicodeTarget["cue"]["@id"], {
          session: session,
          etag: etag
        })));
        break;

      case "mc:Disklavier":
        dispatch((0, _index.patchAndProcessAnnotation)(handleDisklavierStart(component, annotation, uri, fragments), session, etag, annotation));
        break;

      case "mc:Approaching":
        dispatch((0, _index.patchAndProcessAnnotation)(handleIdentifyMuzicode(component, annotation, uri, fragments), session, etag, annotation));
        break;

      case "mc:Challenge":
        dispatch((0, _index.patchAndProcessAnnotation)(handleChallengePassed(component, annotation, uri, fragments), session, etag, annotation, (0, _index.createSession)(session.substr(0, session.lastIndexOf("/")), muzicodeTarget["cue"]["@id"], {
          session: session,
          etag: etag
        })));
        break;

      default: // console.log("Muzicode of unknown type: ", muzicodeTarget);

    }

    return annotationHandled();
  };
}

function handleArchivedMuzicodeTrigger(component, annotation, uri, fragments, muzicodeTarget, session, nextSession, etag) {
  // console.log("Archived muzicode trigger:", component, annotation, uri, fragments, muzicodeTarget);
  return function (dispatch) {
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

function handleQueueNextSession(session, etag, annotation) {
  // console.log("Queueing next session: ", annotation);
  return function (dispatch) {
    var action = {
      type: QUEUE_NEXT_SESSION,
      payload: annotation["oa:hasBody"]["@id"]
    }; //dispatch(patchAndProcessAnnotation(action, session, etag, annotation));

    dispatch(action);
  };
}

function handleCreateNextSession(session, etag, annotation) {
  // console.log("Handling createNextSession: ", session, etag, annotation);
  return function (dispatch) {
    dispatch((0, _index.patchAndProcessAnnotation)((0, _index.createSession)(session.substr(0, session.lastIndexOf("/")), annotation["oa:hasBody"]["@id"], {
      etag: etag
    }), session, etag, annotation));
  };
}

function handleTransitionToNextSession(session, etag, annotation) {
  // console.log("Transitioning to next session!");
  return {
    type: _index.TRANSITION_TO_NEXT_SESSION
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
  var id = annotation["@id"].replace(":", "__");

  if (!element.classList.contains(id)) {
    element.classList.add(id);
  }
}

function assignClass(className, component, annotation, uri, fragments) {
  fragments.map(function (f) {
    var fLocalId = f.substr(f.indexOf("#"));
    var element = component.querySelector(fLocalId);

    if (element) {
      if (!element.classList.contains(className)) {
        element.classList.add(className);
      }

      applyAnnotationId(element, annotation);

      element.onmouseover = function () {
        var highlighted = document.querySelectorAll("." + className);
        Array.prototype.map.call(highlighted, function (em) {
          em.classList.add("infocus");
        });
      };

      element.onmouseleave = function () {
        var highlighted = document.querySelectorAll("." + className);
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
  fragments.map(function (f) {
    var fLocalId = f.substr(f.indexOf("#"));
    var element = component.querySelector(fLocalId);
    var closestMeasure = element ? element.closest(".measure") : null;

    if (closestMeasure) {
      if (!closestMeasure.classList.contains(className)) {
        closestMeasure.classList.add(className);
      }

      applyAnnotationId(closestMeasure, annotation);

      closestMeasure.onmouseover = function () {
        var highlighted = document.querySelectorAll("." + className);
        Array.prototype.map.call(highlighted, function (em) {
          em.classList.add("infocus");
        });
      };

      closestMeasure.onmouseleave = function () {
        var highlighted = document.querySelectorAll("." + className);
        Array.prototype.map.call(highlighted, function (em) {
          em.classList.remove("infocus");
        });
      };
    }
  });
}