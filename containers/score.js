import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import { fetchScore } from '../actions/index';

class Score extends Component { 
	constructor(props) { 
		super(props);

		this.state = { score: "Loading..." };
	}

	render() {
		console.log("HELLO: ", this.state.score);
		if(this.props.score) { 
			this.props.score;
		}
		return <div>Loading...</div>;
	}

	componentDidMount() { 
		this.props.fetchScore(this.props.meiUri);
	}
}

function mapStateToProps({score}) {
	return { score }
}

function mapDispatchToProps(dispatch) { 
	return bindActionCreators({ fetchScore }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Score);
