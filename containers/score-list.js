import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchScore } from '../actions/index';
import { bindActionCreators} from 'redux';

class ScoreList extends Component { 
	renderList() { 
		if(!this.props.scores) { 
			return <div> Fetching scores... </div>;
		}
		console.log(this.props.scores);
		return ( 
			<li key={this.props.scores} className = "list-group-item"> {this.props.scores} </li>
		);
		/*return this.props.scores.map((score) => {
			return (
				<li key={score.uri} className = "list-group-item">{score.uri} </li>
			);
		});
		*/
	}

	render() {
		return (
			<ul className = "list-group col-sm-4">
				{this.renderList()}
			</ul>
		);
	}
	
	componentDidMount() { 
		this.props.fetchScore("moo");
	} 
}

function mapStateToProps(state) {
	return {  
		scores: state.scores
	}
}

function mapDispatchToProps(dispatch) { 
	return bindActionCreators({ fetchScore }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreList);
