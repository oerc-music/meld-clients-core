import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import { fetchScore } from '../actions/index';
import { MARKUP_EMPHASIS, handleEmphasis } from '../actions/meldActions';
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
		this.props.annotations.map( (annotation) => {
			// each annotation...
			const frags = annotation["oa:hasTarget"].map( (annotationTarget) => { 
				// each annotation target
				if(annotationTarget["@id"] in this.props.score.componentTargets) {
					// if this is my target, grab any of MY fragment IDs
					const myFrags = this.props.score.componentTargets[annotationTarget["@id"]]
					.filter( (frag) => {;
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

	handleMELDActions(bodies, fragments) { 
		bodies.map( (b) => { 
			if(b["@id"] === MARKUP_EMPHASIS) { 
				this.props.handleEmphasis(this.props.uri, fragments);
			}
		});
	}
}

function mapStateToProps({ score }) {
	return { score };
}

function mapDispatchToProps(dispatch) { 
	return bindActionCreators({ fetchScore, handleEmphasis }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Score);
