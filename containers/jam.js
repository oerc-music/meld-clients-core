import React, { Component } from 'react';
import { fetchSessionGraph, scorePrevPage, scoreNextPage } from '../actions/index';
import { connect } from 'react-redux' ;
import { bindActionCreators } from 'redux';
import Score from '../containers/score';

class Jam extends Component {
	constructor(props) { 
		super(props);
	}
	
	componentDidMount() { 
		if(this.props.location.query.session) { 
			// start polling
			this.doPoll();
		}
		
	}

	doPoll() { 
		const graphUri = this.props.location.query.session;
		if('etags' in this.props.graph && 
		graphUri in this.props.graph.etags) { 
				this.props.fetchSessionGraph(graphUri, this.props.graph.etags[graphUri]);
		} else { 
			this.props.fetchSessionGraph(graphUri);
		}
		setTimeout(() => this.doPoll(), 500);
	}

	render() {
		console.log("Props: ",this.props);
		if(this.props.score.publishedScores) {
		//if(this.props.graph.targetsById) {
			const byId = this.props.graph.targetsById;
			const publishedScores = this.props.score.publishedScores;
			const conceptualScores = this.props.score.conceptualScores;
			const scores = Object.keys(publishedScores).map((pS) => {
				//return <Score key={ sc } uri={ sc } annotations={ byId[sc]["annotations"] } />;
				const cS = publishedScores[pS];
				const annotationTargets = conceptualScores[cS];
				annotations = Object.keys(byId).map((t) => {
					if(annotationTargets && annotationTargets.includes(t)) { 
						return byId[t].annotations
					}
				});
				console.log("WORKING WITH: ", annotations);
				return (
					<div key={ "wrapper" + pS } >
						 <Score key={ pS } uri={ pS } annotations={ annotations } />;
					
						<div id="prev" key={ "prev"+pS } onClick={() => {
							console.log("prev clicked, ps: ", pS, this.props.score.pageNum, this.props.score.MEI);
							this.props.scorePrevPage(pS, this.props.score.pageNum, this.props.score.MEI[pS])
						}}> Previous </div>
						<div id="next" key={ "next"+pS } onClick={() => {
							console.log("next clicked, ps: ", pS, this.props.score.pageNum, this.props.score.MEI);
							this.props.scoreNextPage(pS, this.props.score.pageNum, this.props.score.MEI[pS])
						}}> Next </div>
					</div>
				)
			});
			return (
				<div>
					<link rel="stylesheet" href="../../style/jam.css" type="text/css" />
					<div id="annotations"></div>
					{ scores }
				</div>
			)
		}
		return (<div>Loading...</div>);
	}

}

function mapStateToProps({ graph, score}) {
	return { graph, score }
}

function mapDispatchToProps(dispatch) { 
	return bindActionCreators({ fetchSessionGraph, scorePrevPage, scoreNextPage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Jam);
