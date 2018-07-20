import React, { Component } from 'react';
import IIIF from "../components/iiif";

export default class Test extends Component {
	constructor(props) { 
		super(props);
	}
	render() { 
		return <IIIF url="https://stacks.stanford.edu/image/iiif/hg676jb4964%2F0380_796-44/info.json"/>
	}
}
