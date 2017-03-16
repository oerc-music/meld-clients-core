import React, { Component } from 'react';

export default class MyImage extends Component { 
	constructor(props) { 
		super(props);
		this.state = {
			positions: {}
		}
	}

	render() { 
		return (
		//	<canvas ref={this.props.uri} height={"1000"} />
			<img src={this.props.uri} />
		)
	}
	
/*	componentDidMount() {
		const canvas = this.refs[this.props.uri]
		const context = canvas.getContext("2d");
		const image = new Image;
		image.onload = () => context.drawImage(image,0,0);
		image.src = this.props.uri;
	}
*/
}

