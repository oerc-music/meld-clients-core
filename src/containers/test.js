import React, { Component } from 'react';
import { traverse } from '../actions/index';
import { connect } from 'react-redux' ;
import { bindActionCreators } from 'redux';

class Test extends Component {
	constructor(props) { 
		super(props);
	}

	componentDidMount() { 
		this.props.traverse("http://meld.linkedmusic.org/annotations/meld-test.json-ld");
	}

	render() { 
		return <div>Hello MELD</div>
	}
}

function mapDispatchToProps(dispatch) { 
	return bindActionCreators({ traverse }, dispatch);
}

export default connect(null,mapDispatchToProps)(Test);
