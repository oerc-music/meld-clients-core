import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTEI } from '../actions/index';

class TEI extends Component { 
	constructor(props) { 
		super(props);

		this.state = { 
			tei: {},
            annotations:{},
			scrollTop: 0 
        };
	}

	render() { 
		if(Object.keys(this.props.tei.TEI).length) { 
			return <div dangerouslySetInnerHTML={ this.returnHTMLizedTEI() } className="TEIContainer" />;
		}
		return <div> Loading TEI... </div>;
	}

	componentDidMount() { 
		this.props.fetchTEI(this.props.uri);
	}

	returnHTMLizedTEI() { 
		return {__html: this.props.tei.TEI[this.props.uri].innerHTML};
	}

	componentDidUpdate() { 
		this.props.annotations.map( (annotation) => {
			// each annotation...
			const frags = annotation["oa:hasTarget"].map( (annotationTarget) => { 
                console.log("Looking at annotation target ", annotationTarget);
				// each annotation target
				if(annotationTarget["@id"] in this.props.tei.componentTargets) {
					// if this is my target, grab any of MY fragment IDs
					const myFrags = this.props.tei.componentTargets[annotationTarget["@id"]]
					.filter( (frag) => {;
                            console.log("Comparing ", this.props.uri, "and frag ", frag);
							return frag.substr(0, frag.indexOf("#")) === this.props.uri;
					});
					if(myFrags.length) {
						// and apply any annotations
						this.handleMELDActions(annotation["oa:hasBody"], myFrags);
					}
				}
			});
			const myFrags = frags.filter( (f) => {return typeof f !== "undefined"});
			if(myFrags.length) { 
				this.handleMELDActions(annotation["oa:hasBody"], myFrags);
			}
		});
	}
		


}

function mapStateToProps({ tei }) { 
	return { tei }; 
}

function mapDispatchToProps(dispatch) { 
	return bindActionCreators({ fetchTEI }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TEI);
