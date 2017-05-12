import React, { Component } from 'react';
import { fetchSessionGraph } from '../actions/index';
import { connect } from 'react-redux' ;
import { bindActionCreators } from 'redux';

//import Score from '../containers/score';

class Jam extends Component {
	constructor(props) { 
		super(props);
	}
	
	componentDidMount() { 
		if(this.props.location.query.session) { 
			const graphUri = this.props.location.query.session;
			this.props.fetchSessionGraph(graphUri);
		}
		
	}

	render() {
		if(this.props.graph && this.props.graph.targetsById) { 
			const byId = this.props.graph.targetsById;
			return(
				<div>
					<div id="annotations"></div>
					<div id="thescore"></div>
					<div id="next"> Next </div>
				</div>
			)
		}
		return (<div>Loading...</div>);
	}
}

function mapStateToProps({ graph }) {
	return { graph }
}

function mapDispatchToProps(dispatch) { 
	return bindActionCreators({ fetchSessionGraph }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Jam);
