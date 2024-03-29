import React, {Component} from 'react';
import {
  fetchSessionGraph,
  postNextPageAnnotation,
  resetNextSessionTrigger,
  scoreNextPageStatic,
  scorePrevPageStatic,
  transitionToSession
} from '../actions/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Score from '../containers/score';
import AnnotationsListing from '../containers/annotationsListing';

class ClimbArchive extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const graphUri = this.props.location.query.session;
    this.props.fetchSessionGraph(graphUri);
  }

  render() {
    console.log("Archive props: ", this.props);
    if (this.props.score.publishedScores) {
      if (this.props.score.triggerNextSession) {
        // have we got a next session queued up?
        if (this.props.graph.nextSession) {
          this.props.transitionToSession(
              this.props.graph.annoGraph["@id"],
              "/ClimbArchive?session=" + this.props.graph.nextSession
          );
          return <div>Loading next session...</div>
        } else {
          // if not, ignore this request and reset trigger
          this.props.resetNextSessionTrigger();
        }
      }
      let session = "";
      let etag = "";
      if (this.props.graph && this.props.graph.annoGraph) {
        session = this.props.graph.annoGraph["@id"];
        etag = this.props.graph.etags[session];
      }
      const byId = this.props.graph.targetsById;
      const publishedScores = this.props.score.publishedScores;
      const conceptualScores = this.props.score.conceptualScores;
      const scores = Object.keys(publishedScores).map((pS) => {
        //return <Score key={ sc } uri={ sc } annotations={ byId[sc]["annotations"] } />;
        const cS = publishedScores[pS];
        const annotationTargets = conceptualScores[cS];
        let annotations = Object.keys(byId).map((t) => {
          if (annotationTargets && annotationTargets.includes(t)) {
            return byId[t].annotations
          }
        });
        annotations = annotations.reduce((a, b) => a.concat(b), []);
        return (
            <div key={"wrapper" + pS}>
              <AnnotationsListing annotations={annotations} scoreUri={pS}/>
              <Score key={pS} uri={pS} annotations={annotations} session={session} etag={etag}
                     nextSession={this.props.nextSession}/>

              <div id="prev" key={"prev" + pS} onClick={() => {
                console.log("prev clicked, ps: ", pS, this.props.score.pageNum, this.props.score.MEI);
                this.props.scorePrevPageStatic(pS, this.props.score.pageNum, this.props.score.MEI[pS])
              }}> Previous
              </div>
              <div id="next" key={"next" + pS} onClick={() => {
                console.log("next clicked, ps: ", pS, this.props.score.pageNum, this.props.score.MEI);
                //this.props.scoreNextPage(pS, this.props.score.pageNum, this.props.score.MEI[pS])
                this.props.scoreNextPageStatic(pS, this.props.score.pageNum, this.props.score.MEI[pS])
              }}> Next
              </div>
            </div>
        )
      });
      return (
          <div>
            <link rel="stylesheet" href="../../style/climbArchive.css" type="text/css"/>
            <div id="annotations"></div>
            {scores}
          </div>
      )
    }
    return (<div>Loading...</div>);
  }

}

function mapStateToProps({graph, score}) {
  return {graph, score}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchSessionGraph,
    scorePrevPageStatic,
    scoreNextPageStatic,
    postNextPageAnnotation,
    transitionToSession,
    resetNextSessionTrigger
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ClimbArchive);
