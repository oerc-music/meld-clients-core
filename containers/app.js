import React, { Component } from 'react';
import { connect } from 'react-redux' ;
import { bindActionCreators } from 'redux';
import IIIFImage from 'react-iiif-image';
import MediaPlayer from '../components/mediaPlayer';
import Score from '../containers/score';
import TEI from '../containers/tei';
import { fetchGraph } from '../actions/index';

const MEIManifestation = "meldterm:MEIManifestation";
const TEIManifestation = "meldterm:TEIManifestation";
const IIIFManifestation = "meldterm:IIIFManifestation";
const VideoManifestation = "meldterm:VideoManifestation";
const AudioManifestation = "meldterm:AudioManifestation";

export const vrvTk = new verovio.toolkit();

class App extends Component { 
	constructor(props) {
		super(props);
		
		this.state = {
			graphUri: "./worksets/AskingForbidden.json-ld"
		}
	}
	
	componentDidMount() { 
		this.props.fetchGraph(this.state.graphUri);
	}
		
	render() { 
		// Build an array of JSX objects corresponding to the annotation targets in our topLevel
		if(this.props.graph.targetsById) { 
            const byId = this.props.graph.targetsById;
			return ( 
				<div className="wrapper">
                {/*		{this.props.graph.annoGraph["@graph"]["ldp:contains"][0]["oa:hasTarget"].map(function (t) { */}
                    {Object.keys(byId).map( (id) => { 
                        console.log(byId[id]);
						switch(byId[id]) { 
						case MEIManifestation:
                            console.log("Trying to return the score...");
							return <Score key={ id } uri={ id } />;
						case TEIManifestation:
							return <TEI key={ id } uri={ id } />;
						case VideoManifestation: 
							return <MediaPlayer key={ id } uri={ id } />;
						case AudioManifestation: 
							return <MediaPlayer key={ id } uri={ id } />;
						default: 
							return <div key={ id }>Unhandled target type: { byId[id] }</div>
						}
					})}
				</div>
			);
		}
		return <div>Loading...</div>
	}
	
};


function mapStateToProps({ graph, graphUri }) {
	return { graph, graphUri }
}

function mapDispatchToProps(dispatch) { 
	return bindActionCreators({ fetchGraph }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
