import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTEI } from '../actions/index';

class TEI extends Component { 
	constructor(props) { 
		super(props);

		this.state = { 
			tei: "",
			scrollTop: 0 };
	}

	render() { 
		if(this.props.tei.TEI) { 
			return <div dangerouslySetInnerHTML={ this.returnHTMLizedTEI() } className="TEIContainer" />;
		}
		return <div> Loading TEI... </div>;
	}

	componentDidUpdate() { 
		ReactDOM.findDOMNode(this).scrollTop = 6000;
	}
		

	returnHTMLizedTEI() { 
		return {__html: this.props.tei.TEI.innerHTML};
	}

	componentDidMount() { 
		this.props.fetchTEI(this.props.uri);
	}
}

function mapStateToProps({ tei }) { 
	return { tei }; 
}

function mapDispatchToProps(dispatch) { 
	return bindActionCreators({ fetchTEI }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TEI);
