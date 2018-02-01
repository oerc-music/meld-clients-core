import React, { Component } from 'react';
import { fetchSessionGraph } from '../actions/index';
import { connect } from 'react-redux' ;
import { bindActionCreators } from 'redux';
import Score from '../containers/score';
import Modal from '../containers/modalUI';

import { modes } from '../../config/deliusModes';
import { setMode, clearConstituents } from '../actions/modalUI'

class ModalTest extends Component { 
	constructor(props) { 
		super(props);
		this.state = { modes };
	}

	componentWillReceiveProps(nextProps) { 
		// this is where we do app-specific logic for the modal UI
		if (nextProps.modalUI.constituents.has("dynamics")) {
			// user has selected dynamics - clear selections, and switch modes
			this.props.clearConstituents();
			this.props.setMode("dynamicsMode");
		}
	}

	render() { 
		return (
			<div> 
					<link rel="stylesheet" href="../../style/modalUI.css" type="text/css" />
					<Modal modes={this.state.modes} orientation="wide"/> 
			</div>
		)
	}
}

function mapStateToProps({ modalUI }) {
	return { modalUI }
}

function mapDispatchToProps(dispatch) { 
	return bindActionCreators({ setMode, clearConstituents }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(ModalTest);
