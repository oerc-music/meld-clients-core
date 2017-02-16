import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import { fetchScore } from '../actions/index';
import InlineSVG from 'svg-inline-react';

class Score extends Component { 
	constructor(props) { 
		super(props);

		this.state = { score: "Loading..." };
	}

	render() {
		if(this.props.score) { 
            console.log("HELLO: ", this.props.score);
			return (<InlineSVG src={this.props.score} />);
		}
		return <div>Loading...</div>;
	}

	componentDidMount() { 
        console.log("Moo");
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
