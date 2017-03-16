import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTEI } from '../actions/index';
import { 
	MARKUP_EMPHASIS, 
	handleEmphasis,
	MARKUP_HIGHLIGHT,
	handleHighlight,
	CUE_IMAGE,
	handleCueImage
} from '../actions/meldActions';

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
				// each annotation target
				if(annotationTarget["@id"] in this.props.tei.componentTargets) {
					// if this is my target, grab any of MY fragment IDs
					console.log("TEI container updating. My component targets: ", this.props.tei.componentTargets, " annotation target:", annotationTarget);
					console.log("This props uri", this.props.uri);
					const myFrags = this.props.tei.componentTargets[annotationTarget["@id"]]
					.filter( (frag) => {;
							return frag.substr(0, frag.indexOf("#")) === this.props.uri;
					});
					console.log("And finally myFrags: ", myFrags);
					if(myFrags.length) {
						// and apply any annotations
						this.handleMELDActions(annotation, myFrags);
					}
				}
			});
		});
	}
		
	handleMELDActions(annotation, fragments) { 
		if("oa:hasBody" in annotation) { 
			annotation["oa:hasBody"].map( (b) => {
				// TODO convert to switch statement
				if(b["@id"] === MARKUP_EMPHASIS) { 
					this.props.handleEmphasis(ReactDOM.findDOMNode(this), annotation, this.props.uri, fragments);
				} else if(b["@id"] === MARKUP_HIGHLIGHT) { 
					this.props.handleHighlight(ReactDOM.findDOMNode(this), annotation, this.props.uri, fragments);
				} else if(b["@id"] === CUE_IMAGE) {
					this.props.handleCueImage(ReactDOM.findDOMNode(this), annotation, this.props.uri, fragments, this.props.tei.fragImages);
				}
				else {
					console.log("Score component unable to handle meld action: ", b);
				}
			});
		}
		else { console.log("Skipping annotation without body: ", annotation) }
	}
}

function mapStateToProps({ tei }) { 
	return { tei }; 
}

function mapDispatchToProps(dispatch) { 
	return bindActionCreators({ fetchTEI, handleEmphasis, handleCueImage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TEI);
