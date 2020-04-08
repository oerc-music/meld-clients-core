import React, {Component} from 'react';
import {
  fetchSessionGraph,
  postNextPageAnnotation,
  postPrevPageAnnotation,
  resetNextSessionTrigger,
  scoreNextPage,
  scorePrevPage,
  transitionToSession,
  updateMuzicodes
} from '../actions/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import {parse} from 'querystring';
import Score from '../containers/score';

const muzicodesUri = "http://localhost:3000/input";

class Climb extends Component {
  constructor(props) {
    super(props);
    this.monitorKeys = this.monitorKeys.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.monitorKeys);
    const qpars = parse(this.props.location.search.slice(1));
    // slice above to remove leading '?'
    console.log("qpars", qpars);
    if ("session" in qpars) {
      // start polling
      this.doPoll();
    }

  }

  componentWillUnmount() {
    // clean up...
    document.removeEventListener('keydown', this.monitorKeys);
  }

  monitorKeys(ev) {
    if (this.props.graph && this.props.graph.annoGraph) {
      const session = this.props.graph.annoGraph["@id"];
      const etag = this.props.graph.etags[session];
      switch (ev.which) {
        case 34://page down
        case 39://right
        case 40://down
          console.log('next (key)');
          ev.preventDefault();
          this.props.postNextPageAnnotation(session, etag);
          break;
        case 33://page up
        case 37://left
        case 38://up
          console.log('prev (key)');
          ev.preventDefault();
          this.props.postPrevPageAnnotation(session, etag);
          break;
        default:
          console.log('ignore key: ' + ev.which);
      }
    }
  }

  doPoll() {
    const qpars = parse(this.props.location.search.slice(1));
    const graphUri = "session" in qpars ? qpars["session"] : null;
    if ('etags' in this.props.graph &&
        graphUri in this.props.graph.etags) {
      this.props.fetchSessionGraph(graphUri, this.props.graph.etags[graphUri]);
    } else {
      this.props.fetchSessionGraph(graphUri);
    }
    setTimeout(() => this.doPoll(), 2000);
  }

  render() {
    if (this.props.score.publishedScores) {
      if (this.props.score.triggerNextSession) {
        // have we got a next session queued up?
        if (this.props.sessionControl.newSessionUri) {
          this.props.transitionToSession(
              this.props.graph.annoGraph["@id"],
              "/Climb?session=" + this.props.sessionControl.newSessionUri
          );
          return <div>Loading next session...</div>
        } else {
          // if not, ignore this request and reset trigger
          this.props.resetNextSessionTrigger();
        }
      }
      console.log("Climb props: ", this.props);
      //if(this.props.graph.targetsById) {
      let session = "";
      let etag = "";
      if (this.props.graph && this.props.graph.annoGraph) {
        session = this.props.graph.annoGraph["@id"];
        etag = this.props.graph.etags[session];
        console.log("session: ", session, " etag: ", etag, " etags: ", this.props.graph.etags);

      }

      const byId = this.props.graph.targetsById;
      const publishedScores = this.props.score.publishedScores;
      const conceptualScores = this.props.score.conceptualScores;

      const scores = Object.keys(publishedScores).map((pS) => {
        console.log("MAP ON PS: ", pS);
        //return <Score key={ sc } uri={ sc } annotations={ byId[sc]["annotations"] } />;
        const cS = publishedScores[pS];
        const annotationTargets = conceptualScores[cS];
        const currentCSPretty = cS.substring(cS.lastIndexOf('/') + 1);
        const nextCS = this.props.sessionControl.newSessionScore;
        const nextCSPretty = nextCS ? nextCS.substring(nextCS.lastIndexOf('/') + 1) : "";
        let annotations = Object.keys(byId).map((t) => {
          if (annotationTargets && annotationTargets.includes(t)) {
            return byId[t].annotations
          }
        });
        console.log("Flattening array:", annotations);
        annotations = annotations.reduce((a, b) => a.concat(b), []);
        console.log("WORKING WITH (flattened):", annotations);

        // if required, inform muzicodes
        if (!this.props.sessionControl.muzicodesUpdated) {
          this.props.updateMuzicodes(muzicodesUri, this.props.graph.annoGraph["@id"], pS)
        }

        return (
            <div key={"wrapper" + pS}>
              <div id="indicatorBar">
                <button id="prevButton" key={"prev" + pS} onClick={() => {
                  console.log("prev clicked, ps: ", pS, this.props.score.pageNum, this.props.score.MEI);
                  this.props.postPrevPageAnnotation(session, etag);
                }}> Previous
                </button>
                <button id="nextButton" key={"next" + pS} onClick={() => {
                  console.log("next clicked, ps: ", pS, this.props.score.pageNum, this.props.score.MEI);
                  this.props.postNextPageAnnotation(session, etag);
                }}> Next
                </button>
                <span id="indicator">
								Current: <span id="indicatorCurrent"> {currentCSPretty} </span> |
								Page {this.props.score.pageNum} of {this.props.score.pageCount} |
								Queued: <span id="indicatorQueued"> {nextCSPretty} </span>
							</span>
              </div>
              <Score key={pS} uri={pS} annotations={annotations} session={session} etag={etag}
                     nextSession={this.props.sessionControl.newSessionUri}/>

            </div>
        )
      });
      return (
          <div>
            <link rel="stylesheet" href="../../style/climb.css" type="text/css"/>
            <div id="annotations"></div>
            {scores}
          </div>
      )
    }
    return (<div>Loading...</div>);
  }

}

function mapStateToProps({graph, score, sessionControl}) {
  return {graph, score, sessionControl}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchSessionGraph,
    scorePrevPage,
    postPrevPageAnnotation,
    scoreNextPage,
    postNextPageAnnotation,
    transitionToSession,
    resetNextSessionTrigger,
    updateMuzicodes
  }, dispatch);
}

withRouter(Climb);

export default connect(mapStateToProps, mapDispatchToProps)(Climb);
