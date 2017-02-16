import React, { Component } from 'react';
import IIIFImage from 'react-iiif-image';
import MediaPlayer from '../components/mediaPlayer';
import Score from '../containers/score';

export default class App extends Component { 

	constructor(props) {
		super(props);
		
		this.state = {
			meiUri: "http://meld.linkedmusic.org/mei/DavidLewis-F1.mei"
		}
	}
	/*	
	componentDidMount() { 
		$.post(
			"http://meld.linkedmusic.org/collection",
			$.param({ "topLevelTargets": "http://meld.linkedmusic.org/mei/DavidLewis-F1.mei" })
		).done((data, textStatus, xhr) => { 
			let createAnnoStateUri = $.parseHTML(data)[0].getAttribute("href");
			$.post(
				createAnnoStateUri
			).done((data, textStatus, xhr) => { 
				console.log("Getting location: ", xhr.getResponseHeader("Location"));
				$.get(
					xhr.getResponseHeader("Location")

				).done((data, textStatus, xhr) => { 
					this.setState({
						annotationGraph: JSON.parse(data)
					});
				});
			});
		});
	}
		*/

	render() { 
		/*
		if(!$.isEmptyObject(this.state.annotationGraph)) {
			return <Score oaTarget={this.state.annotationGraph["@graph"][0]["oa:hasTarget"][0]["@id"]} />;
		}
		return <div>Loading...</div>;
		*/
		return (
			<div>
				<MediaPlayer />
				<IIIFImage server="http://sanddragon.bl.uk" id="SanddragonImageService/RoyalMS" region="pct:33,20,40,70" size="200,"/>
				<Score meiUri={this.state.meiUri} />
			</div>
		)
		
	}
};
