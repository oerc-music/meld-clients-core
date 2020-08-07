import React, { Component } from 'react';
import { connect } from 'react-redux' ;
import { bindActionCreators } from 'redux';
import {prefix} from '../../lib/library/prefixes';

import { Media, Player, controls, utils } from 'react-media-player';
import { registerClock, tickTimedResource, fetchGraph } from '../actions/index'
import CustomPlayPause from '../containers/react-media-player-play-pause';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
const {
  PlayPause,
  CurrentTime,
  Progress,
  SeekBar,
  Duration,
  MuteUnmute,
  Volume,
  Fullscreen,
} = controls

class VideoLinks extends Component {
  constructor(props) {
    super(props);
		
  }
	componentDidUpdate(){
		
	}
	videoPlayer(url){
		return (<Media key={url}>
				      <div className="media">
                <div className="media-player">
									<Player src={url}/>
								</div>
								<div className="media-controls"><CustomPlayPause/></div>
			        </div>
						</Media>);
	}
	isIteration(thing){
		if(typeTest("https://meld.linkedmusic.org/companion/vocab/MotifIteration", thing)) return true;
		if(this.props.iterations.find(x=>x['@id']===thing['@id'])) return true;
		return false;
	}
	isIterationSegment(thing){
//		console.log(thing);
		if(typeTest("https://meld.linkedmusic.org/companion/vocab/MotifIterationSegment", thing)) return true;
		if(this.props.iterations.find(x=>x.iterationSegments.find(y=>y['@id']===thing['@id']))) return true;
		return false;		
	}
	makeLinks(links){
		var linkMedia = [];
		var TM = [];
		var compares = [];
//		console.log(links);
		for(var i=0; i<links.length; i++){
			var targets = links[i].targets;
			for(var j=0; j<targets.length; j++){
				if(this.isIteration(targets[j])) {
					var targetID = targets[j]['@id'];
					var iterationNo = this.props.iterations.findIndex(x=>x['@id']==targetID);
					var iteration = this.props.iterations[iterationNo];
					var audio = iteration.embodimentLists.MP3 ? this.videoPlayer(iteration.embodimentLists.MP3[0]) : <div />;
					linkMedia[iterationNo] = (
						<div className="motifBlock" key={"vl-"+targetID}>
						  <div className="motifName" onClick={this.props.inspectMotive.bind(null, targets[j]['@id'])}>{iteration["http://www.w3.org/2000/01/rdf-schema#label"]}
							</div>{audio}
						</div>);
				} else if(this.isIterationSegment(targets[j])){
					var targetID = targets[j]['@id'];
					var iterationNo = this.props.iterations.findIndex(x=>x.iterationSegments.find(y=>y['@id']==targetID));
					var iteration = this.props.iterations[iterationNo];
					var segment = iteration.iterationSegments.find(x=>x['@id']==targetID);
					var audio = iteration.embodimentLists.MP3 ? this.videoPlayer(iteration.embodimentLists.MP3[0]) : <div />;
					var segmentName = segment["http://purl.org/vocab/frbr/core#realizationOf"]["http://www.w3.org/2000/01/rdf-schema#label"];
					if(!segmentName) {
						//FIXME: HACK because of JSON-LD framing issues
						var pos = segment["http://purl.org/vocab/frbr/core#realizationOf"]['@id'].lastIndexOf('-');
						segmentName = segment["http://purl.org/vocab/frbr/core#realizationOf"]['@id'].substring(pos+1);
					}
					linkMedia[iterationNo] = (
						<div className="motifBlock" key={"vl-"+targetID}>
							<div className="motifName"><span className="motif" onClick={this.props.inspectMotive.bind(null, iteration['@id'])}>{iteration["http://www.w3.org/2000/01/rdf-schema#label"]} </span>
																					<span className="segment" onClick={this.props.inspectMotive.bind(null, iteration['@id'], targetID)}>{segmentName + " segment"}</span>
																				</div>{audio}</div>);
				} else if (typeTest("https://meld.linkedmusic.org/companion/vocab/TimeMachine", targets[j])){
					var TM = [<div className="motifBlock" key="TMlink" onClick={this.props.timeMachine}>TimeMachine</div>];
				} else if (typeTest("https://meld.linkedmusic.org/companion/vocab/Compare", targets[j])){
					var LID = targets[j]["https://meld.linkedmusic.org/companion/vocab/LeftMotif"]['@id'];
					var RID = targets[j]["https://meld.linkedmusic.org/companion/vocab/RightMotif"]['@id'];
					var iterationL = this.props.iterations.find(x=>x['@id']==LID);
					var iterationR = this.props.iterations.find(x=>x['@id']==RID);
					compares.push(<div className="motifBlock" key={"c-"+LID+"---"+RID}><div className="motifName motifNames" onClick={this.props.compare.bind(null, LID, RID)}>Compare {iterationL[prefix.rdfs+"label"]} & {iterationR[prefix.rdfs+'label']}</div></div>);
				}
			}
		}
		return TM.concat(Object.values(linkMedia), compares);
	}
  render(){
		var cT = 0;
//		console.log(this.props.timesync);
		var links = [];
		if(this.props.timesync && "mediaResources" in this.props.timesync
			 && this.props.uri in this.props.timesync.mediaResources){
			cT = this.props.timesync.mediaResources[this.props.uri]['currentTime'];
			var syncs = this.props.timesync.mediaResources[this.props.uri]['times'];
			if(syncs){
				var times = Object.keys(syncs).map((t)=> Number(t));
				var window = 5;
				for(var i=0; i<times.length; i++){
					if(cT>times[i] && cT < (syncs[times[i]].end ? syncs[times[i]].end : times[i]+window)){
						links.push(syncs[times[i]]);
					}
				}
			} else console.log("no syncs", this.props.timesync, this.props.uri);
		}
		var linkDivs = this.makeLinks(links);
/*		if(document.getElementsByTagName('tei-link').item(0)){
			var linkDivs = this.allRefsIndex();
		} else {
			setTimeout(this.props.advanceTime, 0.2);
		}*/
		// var visibles = this.props.visible ? this.visibleLinks() : [];
		// if(visibles.length==1) visibles = visibles[0];
//		console.log(linkDivs);
    return (
			<div className="videoLinks linksTab">
				<div className="tabHeading">Links</div>
			{linkDivs.length == 1 ? linkDivs[0] : linkDivs}</div>
    );
  }
}

function typeTest(type, jldObj){
	if(jldObj['@type']){
		if(typeof(jldObj['@type'])=='string'){
			return jldObj['@type']==type;
		} else {
			return jldObj['@type'].indexOf(type)>-1;
		}
	} else 
		return false;
}

function mapStateToProps({ graph , timesync}) {
  return { graph , timesync } ;
}
function mapDispatchToProps(dispatch) { 
  return bindActionCreators({ 		registerClock, tickTimedResource }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoLinks);
