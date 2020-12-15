import React, { Component } from 'react';
import { fetchSessionGraph, postNextPageAnnotation, resetNextSessionTrigger, scoreNextPage, scorePrevPage, transitionToSession } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import Score from '../containers/score';

class Jam extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.location.query.session) {
      // start polling
      this.doPoll();
    }
  }

  doPoll() {
    const graphUri = this.props.location.query.session;

    if ('etags' in this.props.graph && graphUri in this.props.graph.etags) {
      this.props.fetchSessionGraph(graphUri, this.props.graph.etags[graphUri]);
    } else {
      this.props.fetchSessionGraph(graphUri);
    }

    setTimeout(() => this.doPoll(), 200);
  }

  render() {
    if (this.props.score.publishedScores) {
      if (this.props.score.triggerNextSession) {
        // have we got a next session queued up?
        if (this.props.graph.nextSession) {
          this.props.transitionToSession(this.props.graph.annoGraph["@id"], this.props.graph.nextSession);
          return /*#__PURE__*/React.createElement("div", null, "Loading next session...");
        } else {
          // if not, ignore this request and reset trigger
          this.props.resetNextSessionTrigger();
        }
      }

      console.log("Jam props: ", this.props); //if(this.props.graph.targetsById) {

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
      const scores = Object.keys(publishedScores).map(pS => {
        //return <Score key={ sc } uri={ sc } annotations={ byId[sc]["annotations"] } />;
        const cS = publishedScores[pS];
        const annotationTargets = conceptualScores[cS];
        let annotations = Object.keys(byId).map(t => {
          if (annotationTargets && annotationTargets.includes(t)) {
            return byId[t].annotations;
          }
        });
        console.log("WORKING WITH: ", annotations);
        return /*#__PURE__*/React.createElement("div", {
          key: "wrapper" + pS
        }, /*#__PURE__*/React.createElement(Score, {
          key: pS,
          uri: pS,
          annotations: annotations,
          session: session,
          etag: etag,
          nextSession: this.props.nextSession
        }), ";", /*#__PURE__*/React.createElement("div", {
          id: "prev",
          key: "prev" + pS,
          onClick: () => {
            console.log("prev clicked, ps: ", pS, this.props.score.pageNum, this.props.score.MEI);
            this.props.scorePrevPage(pS, this.props.score.pageNum, this.props.score.MEI[pS]);
          }
        }, " Previous "), /*#__PURE__*/React.createElement("div", {
          id: "next",
          key: "next" + pS,
          onClick: () => {
            console.log("next clicked, ps: ", pS, this.props.score.pageNum, this.props.score.MEI); //this.props.scoreNextPage(pS, this.props.score.pageNum, this.props.score.MEI[pS])

            this.props.postNextPageAnnotation(session, etag);
          }
        }, " Next"));
      });
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("link", {
        rel: "stylesheet",
        href: "../../style/jam.css",
        type: "text/css"
      }), /*#__PURE__*/React.createElement("div", {
        id: "annotations"
      }), scores);
    }

    return /*#__PURE__*/React.createElement("div", null, "Loading...");
  }

}

function mapStateToProps({
  graph,
  score
}) {
  return {
    graph,
    score
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchSessionGraph,
    scorePrevPage,
    scoreNextPage,
    postNextPageAnnotation,
    transitionToSession,
    resetNextSessionTrigger
  }, dispatch);
}

withRouter(Jam);
export default connect(mapStateToProps, mapDispatchToProps)(Jam);