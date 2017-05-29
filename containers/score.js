import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import { fetchScore, MOTIVATED_BY } from '../actions/index';
import { 
	MARKUP_EMPHASIS, 
	handleEmphasis,
	MARKUP_HIGHLIGHT,
	handleHighlight,  
	MARKUP_HIGHLIGHT2,
	handleHighlight2,  
	CUE_AUDIO, 
	handleCueAudio 
} from '../actions/meldActions';

export const HIGHLIGHTING = 'http://www.w3.org/ns/oa#highlighting';

import InlineSVG from 'svg-inline-react';


class Score extends Component { 
	constructor(props) { 
		super(props);

		this.state = { 
			score: {},
            annotations:{}
		};
	}

	render() {
		if(Object.keys(this.props.score).length) { 
			return (
				<div id={this.props.uri} className="scorepane">
					<div className="controls" />
					<div className="annotations" />
					<InlineSVG className="score" src={ this.props.score["MEI"][this.props.uri] } />
				</div>
			);
		}
		return <div>Loading...</div>;
	}

	componentDidMount() { 
		this.props.fetchScore(this.props.uri);
	}

	componentDidUpdate() {
		console.log("Annotations: ", this.props.annotations);
		this.props.annotations.map( (annotation) => {
			// each annotation...
			const frags = annotation["oa:hasTarget"].map( (annotationTarget) => { 
				// each annotation target
				if(annotationTarget["@id"] in this.props.score.componentTargets) {
                    // if this is my target, grab frag ids according to media type
                    const mediaTypes = Object.keys(this.props.score.componentTargets[annotationTarget["@id"]]);
                    let myFrags = {};
                    mediaTypes.map( (type) => {
                        if(type === "MEI") { 
                            // only grab MY frag IDs, for THIS mei file
                            myFrags[type] = this.props.score.componentTargets[annotationTarget["@id"]][type].filter( (frag) => {
                                return frag.substr(0, frag.indexOf("#")) === this.props.uri;
                            })
                        } else {
                           //TODO think about what to do here to filter (e.g. multiple audios) 
                            myFrags[type] = this.props.score.componentTargets[annotationTarget["@id"]][type]; 
                        }
                    });
                    // and apply any annotations
                    this.handleMELDActions(annotation, myFrags);
				}
			});
		});
			
	}

	handleMELDActions(annotation, fragments) { 
		if("oa:hasBody" in annotation) { 
			annotation["oa:hasBody"].map( (b) => {
				// TODO convert to switch statement
				if(b["@id"] === MARKUP_EMPHASIS) { 
					this.props.handleEmphasis(ReactDOM.findDOMNode(this), annotation, this.props.uri, fragments["MEI"]);
				} else if(b["@id"] === MARKUP_HIGHLIGHT) { 
					this.props.handleHighlight(ReactDOM.findDOMNode(this), annotation, this.props.uri, fragments["MEI"]);
				} else if(b["@id"] === MARKUP_HIGHLIGHT2) { 
					this.props.handleHighlight2(ReactDOM.findDOMNode(this), annotation, this.props.uri, fragments["MEI"]);
				}  else if(b["@id"] === CUE_AUDIO) { 
					this.props.handleCueAudio(ReactDOM.findDOMNode(this), annotation, b, this.props.uri, fragments);
				} else {
					console.log("Score component unable to handle meld action: ", b);
				}
			});
		}
		// FIXME: the above should be phased out as we move into
		// using motivations instead of bodies for rendering instructions
		else if(MOTIVATED_BY in annotation) { 
			switch(annotation[MOTIVATED_BY]) { 
			case HIGHLIGHTING:
				this.props.handleHighlight(ReactDOM.findDOMNode(this), annotation, this.props.uri, fragments["MEI"]);
			default:
				console.log("Unknown motivation: ", annotation[MOTIVATED_BY]);
			}
		} else { console.log("Skipping annotation without rendering instructions: ", annotation) }
	}
}

function mapStateToProps({ score }) {
	return { score };
}

function mapDispatchToProps(dispatch) { 
	return bindActionCreators({ fetchScore, handleEmphasis, handleHighlight, handleHighlight2, handleCueAudio }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Score);
