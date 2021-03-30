import React from 'react';
import ReactDOM from 'react-dom'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  ensureArray,
  fetchScore,
  HAS_BODY,
  scoreNextPage,
  scorePrevPage,
  updateLatestRenderedPageNum
} from '../actions/index';
import {
  CUE_AUDIO,
  CUE_VIDEO,
  handleArchivedMuzicodeTrigger,
  handleChallengePassed,
  handleChoiceMuzicode,
  handleCreateNextSession,
  handleCueAudio,
  handleCueVideo,
  handleDisklavierStart,
  handleEmphasis,
  handleHighlight,
  handleHighlight2,
  handleIdentifyMuzicode,
  handleMuzicodeTriggered,
  handleQueueNextSession,
  handleTransitionToNextSession,
  MARKUP_EMPHASIS,
  MARKUP_HIGHLIGHT,
  MARKUP_HIGHLIGHT2
} from '../actions/meldActions';


const defaultVrvOptions = {
  ignoreLayout: 1,
  adjustPageHeight: 1,
  spacingStaff: 0,
  spacingSystem: 4,
  spacingLinear: 0.2,
  spacingNonLinear: 0.55,
  noFooter: 1,
  noHeader: 1,
  scale: 30,
  pageHeight: 3000,
  pageWidth: 1800
};


class Score extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      score: {},
      annotations: {}
    };
  }

  render() {
    let svg = '';
    // ensure verovio has generated an SVG for the current MEI and current page: 
    if("score" in this.props &&
       this.props.uri in this.props.score.SVG &&
       typeof this.props.score.SVG[this.props.uri] !== "undefined" &&
       this.props.uri in this.props.score.pageState &&
       typeof this.props.score.pageState[this.props.uri] !== "undefined" &&
       "currentPage" in this.props.score.pageState[this.props.uri] &&
       this.props.score.pageState[this.props.uri].currentPage in this.props.score.SVG[this.props.uri]) { 
      let currentPage = this.props.score.pageState[this.props.uri].currentPage;
      svg = this.props.score.SVG[this.props.uri][currentPage].data;
      if (this.props.scoreAnnotations && this.props.drawAnnotation && svg) {
        // We can't edit the output of Verovio while it's a string,
        // so, if there's anything to be done to it, it should happen
        // to a parsed version.
        // Ideally, this would be the version rendered, but in practice, I'm
        // regenerating the serialisation and then drawing that. Which is pretty silly.
        var parser = new DOMParser();
        var svgObject = parser.parseFromString(svg, "image/svg+xml");
        var svgChild = svgObject.getElementsByClassName('definition-scale')[0];
        var oSerializer = new XMLSerializer();
        this.props.drawAnnotation(this.props.scoreAnnotations, svgChild);
        svg = oSerializer.serializeToString(svgObject);
      }

      return (
          <div id={this.props.uri} className="scorepane">
            <div className="controls"/>
            <div className="annotations"/>
            <div className="score" dangerouslySetInnerHTML={{__html: svg}}/>
          </div>
      );
    }
    return <div>Loading...</div>;
  }

  componentDidMount() {
    this.props.fetchScore(this.props.uri, this.props.options);
  }

  componentDidUpdate(prevProps, prevState) {
    let annotations = this.props.annotations;
    if (!Array.isArray(annotations)) {
      annotations = [annotations]
    }
    // console.log("annotations:", annotations)
    if (annotations.length && typeof annotations[0] !== "undefined" && "@type" in annotations[0] && annotations[0]["@type"].includes("meldterm:topLevel")) {
      // console.log("Found old Larry-meld style topLevel annotation, converting...")
      annotations = annotations[0]["oa:hasBody"]
    }
    annotations.map((annotation) => {
      // console.log("annotation is: ", annotation)
      if (typeof annotation === 'undefined') {
        return
      }
      // each annotation...
      annotation = ensureArray(annotation, "oa:hasTarget");
      const frags = annotation["oa:hasTarget"].map((annotationTarget) => {
        // each annotation target
        if (annotationTarget["@id"] in this.props.score.componentTargets) {
          // if this is my target, grab frag ids according to media type
          const mediaTypes = Object.keys(this.props.score.componentTargets[annotationTarget["@id"]]);
          let myFrags = {};
          mediaTypes.map((type) => {
            if (type === "MEI") {
              // only grab MY frag IDs, for THIS mei file
              myFrags[type] = this.props.score.componentTargets[annotationTarget["@id"]][type].filter((frag) => {
                return frag.substr(0, frag.indexOf("#")) === this.props.uri;
              })
            } else {
              //TODO think about what to do here to filter (e.g. multiple audios)
              myFrags[type] = this.props.score.componentTargets[annotationTarget["@id"]][type];
            }
          });
          // and apply any annotations
          this.handleMELDActions(annotation, myFrags);
        } else if (annotationTarget["@id"] == this.props.session) {
          // this annotation applies to the *session*, e.g. a page turn
          this.handleMELDActions(annotation, null);
        }
      });
    });
    if (Object.keys(prevProps.score.pageState).length &&
        this.props.uri in prevProps.score.pageState && (
        prevProps.score.pageState[this.props.uri].currentPage !== 
          this.props.score.pageState[this.props.uri].currentPage || // on page flip...
        prevProps.score.pageState[this.props.uri].pageCount < 
          this.props.score.pageState[this.props.uri].pageCount)   // ...or first load
    ) {
      // signal that Verovio has rendered a new page
      this.props.updateLatestRenderedPageNum(
        this.props.score.pageState[this.props.uri].currentPage
      );
    }

  }

  handleMELDActions(annotation, fragments) {
    // console.log("HANDLING MELD ACTION: ", annotation, fragments);
    if ("oa:motivatedBy" in annotation) {
      switch (annotation["oa:motivatedBy"]["@id"]) {
        case "oa:highlighting":
          this.props.handleHighlight(ReactDOM.findDOMNode(this), annotation, this.props.uri, fragments["MEI"]);
          break;
        case "motivation:muzicodeIdentify":
          this.props.handleIdentifyMuzicode(ReactDOM.findDOMNode(this), annotation, this.props.uri, fragments["MEI"]);
          break;
        case "motivation:muzicodeChoice":
          this.props.handleChoiceMuzicode(ReactDOM.findDOMNode(this), annotation, this.props.uri, fragments["MEI"]);
          break;
        case "motivation:muzicodeChallengePassed":
          this.props.handleChallengePassed(ReactDOM.findDOMNode(this), annotation, this.props.uri, fragments["MEI"]);
          break;
        case "motivation:muzicodeDisklavierStart":
          this.props.handleDisklavierStart(ReactDOM.findDOMNode(this), annotation, this.props.uri, fragments["MEI"]);
          break;
        case "motivation:muzicodeTriggered":
          // for muzicodes, the component target contains information on muzicode type and climb cue
          const muzicodeTarget = this.props.score.componentTargets[annotation["oa:hasTarget"][0]["@id"]]; //FIXME handle n>1 targets
          this.props.handleMuzicodeTriggered(ReactDOM.findDOMNode(this), annotation, this.props.uri, fragments["MEI"], muzicodeTarget, this.props.session, this.props.nextSession, this.props.etag);
          break;
        case "motivation:archivedMuzicodeTrigger":
          const archivedMuzicodeTarget = this.props.score.componentTargets[annotation["oa:hasTarget"][0]["@id"]]; //FIXME handle n>1 targets
          this.props.handleArchivedMuzicodeTrigger(ReactDOM.findDOMNode(this), annotation, this.props.uri, fragments["MEI"], archivedMuzicodeTarget, this.props.session, this.props.nextSession);
          break;
        case "motivation:nextPageOrPiece":
          // console.log("----", this.props);
          this.props.scoreNextPage(this.props.session, this.props.nextSession, this.props.etag, annotation, this.props.uri, this.props.score.pageState[this.props.uri].currentPage, this.props.score.MEI[this.props.uri]);
          break;
        case "motivation:prevPageOrPiece":
          // console.log("----", this.props);
          this.props.scorePrevPage(this.props.session, this.props.nextSession, this.props.etag, annotation, this.props.uri, this.props.score.pageState[this.props.uri].currentPage, this.props.score.MEI[this.props.uri]);
          break;
        case "motivation:queueNextSession":
          this.props.handleQueueNextSession(this.props.session, this.props.etag, annotation);
          break;
        case "motivation:createNextSession":
          this.props.handleCreateNextSession(this.props.session, this.props.etag, annotation);
          break;
        case "motivation:transitionToNextSession":
          this.props.handleTransitionToNextSession(this.props.session, this.props.etag, annotation);
          break;
        default:
          console.log("Unknown motivation: ", annotation["oa:motivatedBy"]);
      }
    } else if (HAS_BODY in annotation) {
      annotation[HAS_BODY].map((b) => {
        // TODO convert to switch statement
        if (b["@id"] === MARKUP_EMPHASIS) {
          this.props.handleEmphasis(ReactDOM.findDOMNode(this), annotation, this.props.uri, fragments["MEI"]);
        } else if (b["@id"] === MARKUP_HIGHLIGHT) {
          this.props.handleHighlight(ReactDOM.findDOMNode(this), annotation, this.props.uri, fragments["MEI"]);
        } else if (b["@id"] === MARKUP_HIGHLIGHT2) {
          this.props.handleHighlight2(ReactDOM.findDOMNode(this), annotation, this.props.uri, fragments["MEI"]);
        } else if (b["@id"] === CUE_AUDIO) {
          this.props.handleCueAudio(ReactDOM.findDOMNode(this), annotation, b, this.props.uri, fragments);
        } else if (b["@id"] === CUE_VIDEO) {
          this.props.handleCueVideo(ReactDOM.findDOMNode(this), annotation, b, this.props.uri, fragments);
        } else {
          console.log("Score component unable to handle meld action: ", b);
        }
      });
      // FIXME: the above should be phased out as we move into
      // using motivations instead of bodies for rendering instructions
    } else {
      console.log("Skipping annotation without rendering instructions: ", annotation)
    }
  }
}

function mapStateToProps({score}) {
  return {score};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchScore,
    updateLatestRenderedPageNum,
    handleEmphasis,
    handleHighlight,
    handleHighlight2,
    handleCueAudio,
    handleCueVideo,
    scorePrevPage,
    scoreNextPage,
    handleQueueNextSession,
    handleCreateNextSession,
    handleTransitionToNextSession,
    handleIdentifyMuzicode,
    handleChoiceMuzicode,
    handleChallengePassed,
    handleDisklavierStart,
    handleMuzicodeTriggered,
    handleArchivedMuzicodeTrigger
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(Score);
