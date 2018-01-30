import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
//import { scorePageToComponentTarget } from '../actions/index';

class ModalUI extends Component {
	constructor(props) { 
		super(props);
		let mode;
		// if our configuration has specified a default, use that
		if(this.props.modes.hasOwnProperty("_default")) { 
			mode = this.props.modes[this.props.modes["_default"]]
		} else { 
			// otherwise use the first non-default
			mode = Object.keys(this.props.modes).filter(m => m !== "_default")[0];
		}

		this.state = { 
			mode: mode ? mode : "_NO_MODE_DEFINED",
			orientation : this.props.orientation ? this.props.orientation : "wide"
		}

	}

	render() { 
		return <div id="modalPane" className = {this.state.orientation} > {this.state.mode} </div>
	}

}

function mapStateToProps({}) {
	return { }
}

function mapDispatchToProps(dispatch) { 
	return bindActionCreators({ }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalUI);
