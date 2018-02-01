import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import { constituentClicked } from '../actions/modalUI';

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
		console.log(this.props.modalUI);
		const constituents = this.state.mode.map((c) => { 
			const classNameString = this.props.modalUI.constituents.has(c["id"]) ? 
				"constituent active" : "constituent"
			return (
				<div className = {classNameString} key={c["id"]} id = {c["id"]}
				onClick = {(e) => this.props.constituentClicked(e)}> 
					{/* display image if available */}
					{c.hasOwnProperty("image") &&
						<img src={c["image"]} />
					}
					<div className="label">
						{c["label"]} 
					</div>
				</div> 
			);
		});
		return (
			<div id="modalPane" className = {this.state.orientation}> 
				{constituents}
			</div>
		)
	}

}

function mapStateToProps({ modalUI }) {
	return { modalUI }
}

function mapDispatchToProps(dispatch) { 
	return bindActionCreators({ constituentClicked }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalUI);
