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
		console.log("Polling");
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
		console.log(this.props);
		if(this.props.score.publishedScores) {
			const scores = this.props.score.publishedScores.map((sc) => {
				return <Score key={ sc } uri={ sc } annotations={ [] } />;
			});
			console.log(scores);
			return (
				<div>
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
