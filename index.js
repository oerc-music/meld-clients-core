import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

window.$ = $;

import Score from './components/score';

const RDF_URI = "http://meld.linkedmusic.org/collection/DavidLewis-F1.ttl"

class App extends Component { 

	constructor(props) {
		super(props);
		
		this.state = {
			annotationGraph: [],
			annotationGraphId: ""
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
		$.getJSON(RDF_URI).done(res => { 
				this.setState({
					annotationGraph: res,
					annotationGraphId: res["@graph"][0]["@id"]
				});
			);
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
