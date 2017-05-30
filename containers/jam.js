import React, { Component } from 'react';
import { fetchSessionGraph } from '../actions/index';
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
				const annotationTarget = conceptualScores[cS]
				return <Score key={ pS } uri={ pS } annotations={ byId[annotationTarget] } />;
			});
			return (
				<div>
					<link rel="stylesheet" href="../../style/jam.css" type="text/css" />
					<div id="annotations"></div>
					{ scores }
					<div id="next"> Next </div>
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
	return bindActionCreators({ fetchSessionGraph }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Jam);
