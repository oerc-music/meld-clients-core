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
	}
	
	componentDidMount() { 
		//TODO get the graphUri properly
		const graphUri = window.location.href.substr(window.location.href.indexOf("?annotations=")+13);
		this.props.fetchGraph(graphUri);
		
	}
		
	render() { 
		// Build an array of JSX objects corresponding to the annotation targets in our topLevel
		if(this.props.graph.targetsById) { 
            const byId = this.props.graph.targetsById;
			return ( 
				<div className="wrapper">
					<div className="controls" />
                {/*		{this.props.graph.annoGraph["@graph"]["ldp:contains"][0]["oa:hasTarget"].map(function (t) { */}
                    {Object.keys(byId).map( (id) => { 
						switch(byId[id]["type"]) { 
						case MEIManifestation:
                            console.log("Trying to return the score...");
							return <Score key={ id } uri={ id } annotations={ byId[id]["annotations"] } />;
						case TEIManifestation:
							return <TEI key={ id } uri={ id } annotations={ byId[id]["annotations"] } />;
						case VideoManifestation: 
							return <MediaPlayer key={ id } uri={ id } />;
						case AudioManifestation: 
							return <MediaPlayer key={ id } uri={ id } ref={ audio => this.audio = audio } />;
						default: 
							return <div key={ id }>Unhandled target type: { byId[id]["type"] }</div>
						}
					})}
				</div>
			);
		}
		return <div>Loading...</div>
	}
	
};


function componentWillReceiveProps(nextProps) { 
	console.log("NEXT PROPS: ", nextProps);
}
	

function mapStateToProps({ graph, graphUri }) {
	return { graph, graphUri }
}

function mapDispatchToProps(dispatch) { 
	return bindActionCreators({ fetchGraph }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
