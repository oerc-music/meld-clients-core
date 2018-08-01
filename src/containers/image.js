import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class MyImage extends Component { 
	constructor(props) { 
		super(props);
		this.state = {
			positions: {}
		}
	    this.handleClick = this.handleClick.bind(this);
	}
	setCSSProp(selector, obj){
		var rules = document.styleSheets[0].cssRules || document.styleSheets[0].rules;
		var i=0;
		while(i<rules.length && (!rules[i].selectorText || rules[i].selectorText.indexOf(selector)===-1)){
			i++;
		}
		if(i==rules.length) {
			//insert rules
			console.log(selector+" {display: visible}");
      document.styleSheets[0].insertRule(selector+" {display: visible}");
			var i=0;
			while(i<rules.length && (!rules[i].selectorText || rules[i].selectorText.indexOf(selector)===-1)){
				i++;
			}
		}
		
		var declaration = rules[i].style;
		var newRules = Object.keys(obj);
		for(var j=0; j<newRules.length; j++){
			declaration.setProperty(newRules[j], obj[newRules[j]]);
		}
	}
	resize(){
		var containerId = "#holder-"+this.props.uri;
		var imgId = "#image-"+this.props.uri;
		this.setCSSProp(containerId, {height: this.props.height+'px', width: this.props.width+'px'});
		this.setCSSProp(imgId, {'max-width': this.props.width+'px'});
		/*
		var rules = document.styleSheets[0].cssRules || document.stylesheets[0].rules;
		var i=0;
		while(!rules[i].selectorText || rules[i].selectorText.indexOf("img")===-1){
			i++;
		}
		if(i==rules.length){
			document.styleSheets[0].insertRule('.wrapper img {width:'+this.props.width+"px, height: "+this.props.height+"}");
		} else {
			var declaration = rules[i].style;
			declaration.setProperty('max-height', this.props.height+"px");
			declaration.setProperty('max-width', this.props.width+"px");
		}*/
	}
	
	render() {
		if(this.props.height){
			this.resize();
		}
		return (
				<div className="imagecontainer" id={"holder-"+this.props.uri}>
				<img id={"image-"+this.props.uri} src={this.props.uri} onClick={this.handleClick}/>
			</div>
		)
	}

  handleClick() {
		if(this.props.uri.indexOf("_thumb")>-1){
      let fullFatImage = this.props.uri;
      fullFatImage = fullFatImage.replace("_thumb", "");
      console.log("Thumb:", this.props.uri, "Full fat: ", fullFatImage);
      window.open(fullFatImage);
    }
	}
}

