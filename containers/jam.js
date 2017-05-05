import React, { Component } from 'react';
//import Score from '../containers/score';

export default class Jam extends Component {
	constructor(props) { 
		super(props);
	}

	render() {
		console.log("Hello ", this.props.location.query.q);
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
