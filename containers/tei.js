import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTEI } from '../actions/index';

class TEI extends Component { 
	constructor(props) { 
		super(props);

		this.state = { tei: "" };
	}

	render() { 
		if(this.props.tei) { 
			return <div dangerouslySetInnerHTML={ this.returnHTMLizedTEI() } className="TEIContainer" />;
		}
		return <div> Loading TEI... </div>;
	}

	returnHTMLizedTEI() { 
		return {__html: this.props.tei.innerHTML};
	}

	componentDidMount() { 
		this.props.fetchTEI(this.props.teiUri);
	}
}

function mapStateToProps({ tei }) { 
	return { tei }; 
}

function mapDispatchToProps(dispatch) { 
	return bindActionCreators({ fetchTEI }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TEI);
