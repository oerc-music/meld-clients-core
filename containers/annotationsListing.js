import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';

class AnnotationsListing extends Component {
	constructor(props) { 
		super(props);
	}

	render() { 
		if(Object.keys(this.props.score).length && Object.keys(this.props.score.componentTargets).length) { 
			const anno = annotations.filter( (annotation) => { return annotation })
			return ( 
				<div className="annotationsWrapper">
					{
						// filter out undefined annotations
						anno.map( (annotation) => {
							return (
								<div className="annotationListing" key={annotation["@id"]}>
									<div>Events:</div>
									<div className="annotationTarget">
										{ 
											annotation["oa:hasTarget"].map( 
												(t) => { 
													return <span title={t["@id"]}>{this.props.score.componentTargets[t["@id"]]["description"]}</span> 
												}
											) 
										}
									</div>
									<div className="annotationMotivation">
										Motivation: { annotation["oa:motivatedBy"]["@id"] }
									</div>
								</div>
							)
						})
					}
				</div>
			)
		}
		return <div>Loading...</div>
	}
}

function mapStateToProps({ score }) {
	return { score }
}

function mapDispatchToProps(dispatch) { 
	return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AnnotationsListing);
