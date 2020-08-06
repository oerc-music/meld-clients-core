import React, { Component } from 'react';
import { connect } from 'react-redux' ;
import { bindActionCreators } from 'redux';
import {prefix} from '../library/prefixes';

import TEI from '../containers/tei';
import MyImage from '../containers/image';
import { Media, Player, controls, utils } from 'react-media-player';
import CustomPlayPause from '../containers/react-media-player-play-pause';
import { fetchGraph } from '../actions/index';
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

function getParagraph(node){
	node.closest('tei-p');
}

function findTextInPara(node, characters){
	var parentPara = node.closest('tei-p');
	var prec = '';
	var foll = '';
	var precCut, match;
	var context = [];
	if(!parentPara) return;
	var iterator = document.createNodeIterator(parentPara);
	var currentNode;
	while((currentNode=iterator.nextNode())){
		if(currentNode==node){
			var pos = prec.lastIndexOf(" ", prec.length - characters);
			precCut = prec.substring(pos);
		} else if(currentNode.nodeType!== Node.TEXT_NODE) {
			continue;
		} else if(precCut && !match){
			match = node.textContent;
		} else if(precCut){
			foll += currentNode.textContent;
			if(foll.length > characters){
				foll = foll.substring(0, characters);
				break;
			}
		} else {
			prec += currentNode.textContent;
		}
	}
	return [precCut, match, foll];
}

function getContext(node){
	var prec = "";
	var characters=50;
	var textBits = findTextInPara(node, characters);
	if(!textBits) return false;
	return (<div className="motifList" onClick={x=>node.scrollIntoView()}>...
					<span className="preContent">{textBits[0]}</span>
					<span className="content">{textBits[1]}</span>
					<span className="postContent">{textBits[2]}</span>...</div>);
}
export default class EssayLinks extends Component {
  constructor(props) {
    super(props);
		
  }
	componentDidUpdate(){
		
	}
	allRefsIndex(){
		var refObj=document.getElementsByTagName('tei-link');
		var refs = [...refObj];
		var blocks = [];
		for(var i=0; i<this.props.iterations.length; i++){
			var ID = this.props.iterations[i]['@id'];
			var relevant = refs.filter(x=>x.getAttributeNS(null, 'target')==ID);
			var linkDivs = relevant.map(getContext);
			if(linkDivs.length){
				blocks.push(<div className="motifBlock"><div className="motifName">{this.props.iterations[i][prefix.rdfs+"label"]}</div>{linkDivs}</div>);
			}
		}
		return blocks;
	}
	linkForIteration(uri){
		var iteration = this.props.iterations.find(x=>x['@id']==uri);
		var iName = iteration['http://www.w3.org/2000/01/rdf-schema#label'];
		var audioURI = iteration.embodimentLists.MP3 ? iteration.embodimentLists.MP3[0] : false;
		var audio = iteration.embodimentLists.MP3 ? <Media key={iteration.embodimentLists.MP3[0]}>
				                                          <div className="media">
                                            				<div className="media-player">
																								      <Player src={iteration.embodimentLists.MP3[0]}/>
																								    </div>
																								    <div className="media-controls"><CustomPlayPause/></div>
			                                            </div>
		</Media>: <div />;
		return (<div className="linkBlock" key={"itLink"+uri}><div className="itname">{iName}{audio}</div>
						<div className="inspectLink" onClick={this.props.inspectFun.bind(null, uri)}>Inspect</div></div>);
	}
	visibleLinks(){
		var visibleIts = this.props.visible.reduce((acc,val)=>{
			if(acc[val.getAttributeNS(null, 'target')]){
				acc[val.getAttributeNS(null, 'target')].push(val);
			} else {
				acc[val.getAttributeNS(null, 'target')] = [val];
			};
			return acc;
		}, {});
		var links = Object.keys(visibleIts);
		var iterations = this.props.iterations.map(x=>x['@id']);
		var linkDivs = [];
		for(var i=0; i<links.length; i++){
			if(iterations.indexOf(links[i])>-1){
				linkDivs.push(this.linkForIteration(links[i]));
			}
		}
		return linkDivs;
	}
  render(){
		if(document.getElementsByTagName('tei-link').item(0)){
			var linkDivs = this.allRefsIndex();
		} else {
			setTimeout(this.props.advanceTime, 0.2);
		}
		var visibles = this.props.visible ? this.visibleLinks() : [];
		if(visibles.length==1) visibles = visibles[0];
    return (
			<Tabs defaultIndex={0} className="linksTab">
				<TabList>
					<Tab>Links</Tab>
					<Tab>Motifs</Tab>
				</TabList>
				<TabPanel>
					<div className="links">{visibles}
					</div>
				</TabPanel>
				<TabPanel> <div className="motifListBox">{linkDivs}</div>
				</TabPanel>
			</Tabs>
    );
  }
}
