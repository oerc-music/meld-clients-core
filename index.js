import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

window.$ = $;

import Score from './components/score';
import MediaPlayer from "./components/mediaPlayer";

class App extends Component { 

	constructor(props) {
		super(props);
		
		this.state = {
			annotationGraph: {} 
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
		return <MediaPlayer />;
	}
};

ReactDOM.render(<App />, document.querySelector('.container'));
