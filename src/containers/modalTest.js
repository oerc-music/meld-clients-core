import React, { Component } from 'react';
import { fetchSessionGraph } from '../actions/index';
import { connect } from 'react-redux' ;
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import Score from '../containers/score';
import Modal from '../containers/modalUI';

import { modes } from '../config/modalTestModes';

export default class ModalTest extends Component { 
	constructor(props) { 
		super(props);
		this.state = { modes };
		console.log("Hello: ", modes)
	}

	componentDidMount() { 
		const graphUri = this.props.location.query.session;
//		this.props.fetchSessionGraph(graphUri);
	}

	render() { 
		return (
			<div> 
					<link rel="stylesheet" href="../../style/modalUI.css" type="text/css" />
					<Modal modes={this.state.modes} /> 
			</div>
		)
	}
}
