import React, { Component } from 'react';
import { connect } from 'react-redux' ;
import { bindActionCreators } from 'redux';
import IIIFImage from 'react-iiif-image';
import MediaPlayer from '../components/mediaPlayer';
import Score from '../containers/score';
import TEI from '../containers/tei';
import { fetchGraph } from '../actions/index';

class App extends Component { 
	constructor(props) {
		super(props);
		
		this.state = {
			graph: {},
			graphUri: "./worksets/AskingForbidden.json-ld",
			meiUri: "./resources/mei/F1-numbered.mei",
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
		fetchGraph(this.state.graphUri);
	}
		
	render() { 
		return (
			<div>
				{/*<MediaPlayer uri={this.state.videoUri} />*/}
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
};

function mapStateToProps({ graph, graphUri, meiUri, teiUri, videoUri, audioUri, imageServer, imageId, imageSize, imageRegion }) {
	return { graph, graphUri, meiUri, teiUri, videoUri, audioUri, imageServer, imageId, imageSize, imageRegion }
}

function mapDispatchToProps(dispatch) { 
	return bindActionCreators({ fetchGraph }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
