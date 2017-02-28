import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import { fetchScore } from '../actions/index';
import InlineSVG from 'svg-inline-react';

class Score extends Component { 
	constructor(props) { 
		super(props);

		this.state = { 
			score: {}
		};
	}

	render() {
		if(Object.keys(this.props.score).length) { 
			return (
				<div id={this.props.uri} className="scorepane">
					<div className="controls" />
					<div className="annotations" />
					<InlineSVG className="score" src={ this.props.score[this.props.uri] } />
				</div>
			);
		}
		return <div>Loading...</div>;
	}

	componentDidMount() { 
		this.props.fetchScore(this.props.uri);
	}
}

function mapStateToProps({ score }) {
	return { score };
}

function mapDispatchToProps(dispatch) { 
	return bindActionCreators({ fetchScore }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Score);
