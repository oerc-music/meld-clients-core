import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

window.$ = $;

import Score from './components/score';

class App extends Component { 

	constructor(props) {
		super(props);
		
		this.state = {
			annotationGraph: []
		}
/*
		updateAnnotationGraph({rdfuri: RDF_URI}, (graph) => { 
			this.setState({
				annotationGraph: graph,
				annotationGraphId: graph["@graph"][0]["@id"]
			});
		});
*/
	}
	
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
/*		$.post(CREATE_ANNOSTATE_URI).done(
			(data, textStatus, xhr) => { 
				console.log("Got it! ", data);
				$.getJSON(RDF_URI).done(res => { 
					this.setState({
						annotationGraph: res,
						annotationGraphId: res["@graph"][0]["@id"]
					});
					console.log(res);
				})
			}
		);
*/
	}
	
/*
	updateAnnotationGraph(rdfuri) {
		$.getJSON(rdfuri).done(
			function(graph) { 
				this.setState({
					annotationGraph: graph
				});
			}
		);
	}
*/
	render() { 
		return <Score />;
	}
};

ReactDOM.render(<App />, document.querySelector('.container'));
