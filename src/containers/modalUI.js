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

/*
	buildPaneConsitutents(mode) { 
		// turn each constituent UI element listed for this mode into a JSX element
		let constituents;
		let tag;
		mode.map({c} => {
			let image = 
			constituents += 
				<div className = "modalPaneConstituent">
					<div className = "image">
						{c["image"] ? <img src=
	} */

	render() { 
		const constituents = this.state.mode.map((c, ix) => { 
			return (<div className = "constituent" key={ix}> 
				{/* display image if available */}
				{c.hasOwnProperty("image") &&
					<img src={c["image"]} />
				}
				<div className="label">
					{c["label"]} 
				</div>
			</div> );
		});
		return (
			<div id="modalPane" className = {this.state.orientation}> 
				{constituents}
			</div>
		)
	}

}

function mapStateToProps({}) {
	return { }
}

function mapDispatchToProps(dispatch) { 
	return bindActionCreators({ }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalUI);
