import React, { Component } from 'react';
import { connect } from 'react-redux' ;
import { bindActionCreators } from 'redux';
import IIIFImage from 'react-iiif-image';
import MediaPlayer from '../components/mediaPlayer';
import AudioPlayer from '../components/audioPlayer';
import Score from '../containers/score';
import TEI from '../containers/tei';
import MyImage from '../containers/image';
import MEICarousel from '../containers/carousel';
import OrchestralRibbon from '../containers/orchestralRibbon';
import { fetchGraph } from '../actions/index';

const MEIManifestation = "meldterm:MEIManifestation";
const TEIManifestation = "meldterm:TEIManifestation";
const IIIFManifestation = "meldterm:IIIFManifestation";
const VideoManifestation = "meldterm:VideoManifestation";
const AudioManifestation = "meldterm:AudioManifestation";
const ImageManifestation = "meldterm:ImageManifestation";
const Carousel= "meldterm:MEICarousel";
const CarouselClassic= "meldterm:MEIClassicCarousel";
const FOR_ORCHESTRA = "http://id.loc.gov/authorities/performanceMediums/2013015516";
const HAS_PIANO = "http://id.loc.gov/authorities/performanceMediums/2013015550";

class App extends Component { 
	constructor(props) {
		super(props);
		this.state = { currentMotif: this.props.motif || false };
	}
 
	componentDidMount() { 
		if(this.props.graphUri) { 
			const graphUri = this.props.graphUri;
			this.props.fetchGraph(graphUri);
		}
	}
	handleMotifChange(motif){
		this.setState({currentMotif: motif});
	}
	
	render() { 
		// Build an array of JSX objects corresponding to the annotation targets in our topLevel
		if(this.props.graph.targetsById) { 
            const byId = this.props.graph.targetsById;
			return ( 
				<div className="wrapper">
					<link rel="stylesheet" href="../style/style.css"/>
					<link rel="stylesheet" href="../style/CETEIcean.css"/>
					<div className="controls" />

                {/*		{this.props.graph.annoGraph["@graph"]["ldp:contains"][0]["oa:hasTarget"].map(function (t) { */}
                    {Object.keys(byId).map( (id) => { 
						switch(byId[id]["type"]) { 
						case CarouselClassic:
							return(<div>
								<MEICarousel motif={this.state.currentMotif}
								             onMotifChange={this.handleMotifChange.bind(this)}
								             layout="classic"/>
							</div>)
						case Carousel:
							return(<div>
								<MEICarousel layout="prism"/>
							</div>)
						case MEIManifestation:
							console.log("Dooom!!!", this.props.score.scoreMapping, id);
							if(FOR_ORCHESTRA in this.props.score.scoreMapping[id]){
								return <OrchestralRibbon key={ id } uri={ id } />;
							} else if (HAS_PIANO in this.props.score.scoreMapping[id]){
								return <Score key={ id } uri={ id } annotations={ byId[id]["annotations"] } />;
							} else {
								console.log('MEI with no recognised performace medium')
							}
						case TEIManifestation:
							return <TEI key={ id } uri={ id } motif={this.state.currentMotif}
													onMotifChange={this.handleMotifChange.bind(this)}
							            annotations={ byId[id]["annotations"] } />;
						case VideoManifestation: 
							return <MediaPlayer key={ id } uri={ id } />;
						case AudioManifestation: 
                            return <AudioPlayer key={ id } uri={ id } />;
						case ImageManifestation: 
                            return <MyImage key={ id } uri={ id } />;
						default: 
							return <div key={ id }>Unhandled target type: { byId[id]["type"] }</div>
						}
					})}
				</div>
			);
		}
		return (<div> Loading...  </div>);
	}
	
};


function mapStateToProps({ graph }) {
	return { graph }
}

function mapDispatchToProps(dispatch) { 
	return bindActionCreators({ fetchGraph }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
