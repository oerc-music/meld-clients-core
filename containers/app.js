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
			graph: {},
			graphUri: "./worksets/AskingForbidden.json-ld",
			meiUri: "",
			//meiUri: "./resources/mei/F1-numbered.mei",
			teiUri: "./resources/libretto/lohengrin-libretto-numbered.tei",
			videoUri: "https://www.youtube.com/watch?v=VN83SBGSAWg",
			audioUri: "./audio/test.mp3",
			imageServer: "http://sanddragon.bl.uk",
			imageId: "SanddragonImageService/RoyalMS",
			imageSize: "200,",
			imageRegion: "pct:33,20,40,70" 
		}
	}
	
	componentDidMount() { 
		this.props.fetchGraph(this.state.graphUri);
	}
		
	render() { 
		// Build an array of JSX objects corresponding to the annotation targets in our topLevel
		if(this.props.graph) { 
			return ( 
				<div className="wrapper">
					{this.props.graph["@graph"]["ldp:contains"][0]["oa:hasTarget"].map(function (t) { 
						switch(t["@type"]) { 
						case MEIManifestation:
							return <Score key={ t["@id"] } uri={ t["@id"] } />;
						case TEIManifestation:
							return <TEI key={ t["@id"] } uri={ t["@id"] } />;
						case VideoManifestation: 
							return <MediaPlayer key={ t["@id"] } uri={ t["@id"] } />;
						case AudioManifestation: 
							return <MediaPlayer key={ t["@id"] } uri={ t["@id"] } />;
						default: 
							return <div key={ t["@id"] }>Unhandled target type: {t["@type"]}</div>
						}
					})}
				</div>
			);
		}
		/*
			return (
				<div>
					<MediaPlayer uri={this.state.videoUri} />
					<div>Keys: {this.props.graph["@graph"]["ldp:contains"][0]["oa:hasTarget"]["@id"]}</div>
					<MediaPlayer uri={this.state.audioUri} />
					<IIIFImage 
							server=	{this.state.imageServer} 
							id=		{this.state.imageId}
							region=	{this.state.imageRegion}
							size=	{this.state.imageSize}
						/>	
					<Score uri={ this.state.meiUri } />
					<TEI uri={ this.state.teiUri } />
				</div>
			)
		}
		*/
		return <div>Loading...</div>
	}
	
};


function mapStateToProps({ graph, graphUri, meiUri, teiUri, videoUri, audioUri, imageServer, imageId, imageSize, imageRegion }) {
	return { graph, graphUri, meiUri, teiUri, videoUri, audioUri, imageServer, imageId, imageSize, imageRegion }
}

function mapDispatchToProps(dispatch) { 
	return bindActionCreators({ fetchGraph }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
