import React, {Component} from 'react';
import {prefix as pref} from 'meld-clients-core/lib/library/prefixes';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchTEI} from '../actions/index';
import {
  CUE_IMAGE,
  handleCueImage,
  handleEmphasis,
  handleHighlight,
  handleHighlight2,
  MARKUP_EMPHASIS,
  MARKUP_HIGHLIGHT,
  MARKUP_HIGHLIGHT2
} from '../actions/meldActions';

class TEI extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tei: {},
      annotations: {},
      scrollTop: 0
    };
  }

  scrollToMotif(motifNo) {
		// FIXME: This is specific to Forbidden Question app as it stands
    // and needs to be abstracted out
		// console.log("scrolling");
    var targetClass = "annotation__AskingForbidden_" + motifNo + "_1";
    var textBox = ReactDOM.findDOMNode(this);
    var targetElements = textBox.getElementsByClassName(targetClass);
    if (targetElements.length) {
      targetElements[0].scrollIntoView;
      textBox.scrollTop = targetElements[0].offsetTop - textBox.offsetTop + (textBox.clientHeight / 2);
    }
  }
	scrollToURI(){
		if(this.props.scrollToURI && this.containerDiv){
			var fragment = this.props.scrollToURI.substring(this.props.scrollToURI.indexOf('#')+1);
			var el = this.containerDiv.getElementByID(fragment);
			if(el){
				textBox.scrollTop = el.offsetTop - textBox.offsetTop + (textBox.clientHeight / 2);
			}
		}
	}
	resize(){
		// Props attributes allow the parent app to specify the size and
		// that this container should resize.
		if(this.props.height && this.props.width && this.props.adjustToSize){
			setCSSProp('.TEIContainer.commentary', {width: this.props.width+'px', height: this.props.height+'px'});
		}
	}
  render() {
		this.resize();
		if(this.props.highlight) this.showHighlights(this.props.highlight) 
    if (Object.keys(this.props.tei.TEI).length && this.props.uri in this.props.tei.TEI) {
      // HACK //
      if (this.props.uri.indexOf("commentaries") > -1) {
        if (this.props.onMotifChange && (!this.props.motif || !this.props.uri.endsWith(this.props.motif))) {
          return <div/>;
        }
        return <div dangerouslySetInnerHTML={this.returnHTMLizedTEI()} className="TEIContainer commentary"
                    id={this.props.uri.substr(this.props.uri.indexOf("commentaries/") + 13)}/>;
      } else {
        return ( <div dangerouslySetInnerHTML={this.returnHTMLizedTEI()} className="TEIContainer other"
											onScroll={this.props.scrollFun}/> );
      }
      // END HACK //
    }
    return <div> Loading TEI... </div>;
  }

  componentDidMount() {
    this.props.fetchTEI(this.props.uri);
  }

  returnHTMLizedTEI() {
		var TEIhtml = this.props.tei.TEI[this.props.uri].innerHTML;
		if(this.props.title) {
			TEIhtml = TEIhtml.replace(/<tei-title data-teiname="title">.*tei-title>/gi,
																'<tei-title data-teiname="title">'+this.props.title+'</tei-title>');
		}
    return {__html: TEIhtml};
  }

  componentDidUpdate() {
		if(!Object.keys(this.props.tei.TEI).length || !(this.props.uri in this.props.tei.TEI)) return;
    if (this.props.motif && this.props.uri.indexOf("commentaries") === -1) {
      this.scrollToMotif(this.props.motif);
    } else if(this.props.scrollToURI){
			this.scrollToURI();
		}
		if(!this.props.annotations || !this.props.showAnnotations) return false;
		// Depending on the type of annotation, this document may concern
		// the target or body of annotations. Check for both (FIXME: but
		// treat these differently?)
    this.props.annotations.map((annotation) => {
			var annotationTargets = annotation[pref.oa+"hasTarget"];
			if(!Array.isArray(annotationTargets)) annotationTargets = [annotationTargets];
      // each annotation...
      var frags = annotationTargets.map((annotationTarget) => {
        // each annotation target
        if ((annotationTarget["@id"].startsWith(this.props.uri)
						 && annotationTarget["@id"].indexOf("#")>-1)
						|| annotationTarget["@id"][0]=="#") {//
					const myFrags = [annotationTarget];
          if (myFrags.length) {
            // and apply any annotations
            this.handleMELDActions(annotation, myFrags);
          }
        }
      });
      var annotationBodies = annotation[pref.oa + "hasBody"];
      if (!Array.isArray(annotationBodies)) annotationBodies = [annotationBodies]; // each annotation...
      frags = annotationBodies.map(annotationBody => {
        // each annotation target
        if (annotationBody["@id"].startsWith(this.props.uri) && annotationBody["@id"].indexOf("#") > -1 || annotationBody["@id"][0] == "#") {
          const myFrags = [annotationBody];
          if (myFrags.length) {
            // and apply any annotations
            this.handleMELDActions(annotation, myFrags);
          }
        }
      });
			if((pref.oa+"motivatedBy") in annotation
				 && annotation[pref.oa+"motivatedBy"]["@id"]===(pref.meldterm + "personInfo")) {	
				var myFrags = Array.isArray(annotation[pref.oa+"hasTarget"])
						? annotation[pref.oa+"hasTarget"]
						: [annotation[pref.oa+"hasTarget"]];
        this.handleMELDActions(annotation, myFrags);
			}
    });
		this.findOtherRefs();
  }

	findOtherRefs(){
		/// Needed by Listening Through Time. Needs more
		// generalisation. (that means it should not be considered
		// particularly stable code)
		// For some cross references, it makes more sense to discover the
		// references themselves. Here, we find TEI refs and see if we
		// know about the thing they refer to.
		if(!("performances" in this.props)) return;
		var refs = document.querySelectorAll('.TEIContainer *[ref]');
		for(var i=0; i<refs.length; i++){
			var refURI = refs[i].getAttributeNS(null, 'ref');
			var perf = this.props.performances.find(x=>x[pref.frbr+'partOf']['@id']==refURI);
			if(perf){
				if(this.props.current.performance==perf){
					refs[i].classList.add('current');
				}
				var defPerf = this.props.setPerformance.bind(null, perf);
				var undefPerf = this.props.clearPerformance;
				refs[i].onmouseenter = defPerf;
				refs[i].ontouchstart = defPerf;
				refs[i].onmouseleave = undefPerf;
				refs[i].ontouchend = undefPerf;
			}
		}
	}
	cancelHighlights(){
		var rules = document.styleSheets[0].cssRules || document.styleSheets[0].rules;
		var i=0;
		for(var i=rules.length-1; i>=0; i--){
			if(rules[i].selectorText && rules[i].selectorText.indexOf('temporary')>-1){
				document.styleSheets[0].deleteRule(i);
			}
		}
	}
	addHighlight(highlight){
		// FIXME: Why do this explicitly here rather than in stylesheet?
		var highlightfrag = highlight.substring(highlight.indexOf('#'));
		var style = this.props.highlightStyle ? this.props.highlightStyle : {fill: "blue", stroke: "blue !important", color: "blue"};
		setCSSProp('.temporary, '+highlightfrag, style);
	}
	showHighlights(highlight){
		// Given a set of highlights URIs (with applicable fragments),
		// apply highlight formatting
		this.cancelHighlights();
		for(var i=0; i<highlight.length; i++){
			this.addHighlight(highlight[i]);
		}
	}
	definitionFun(definition){
		var fun = this.props.currentDefinition;
		return function(){
			fun(definition);
		}
	}
	updateViewerFun(show, highlight){
		var fun = this.props.updateViewer.bind(this);
		return function(){
			fun(show, highlight);
		}
	}
	
  handleMELDActions(annotation, fragments) {
    if(pref.oa+"motivatedBy" in annotation){
			switch(idOrFirstId(annotation[pref.oa+"motivatedBy"])){
				case pref.meldterm+"updateViewerState":
					var show = [];
					var highlight = [];
					for(var i=0; i<annotation[pref.oa+"hasBody"].length; i++){
						var thing = annotation[pref.oa+"hasBody"][i];
						if(thing["@id"]) show.push(thing["@id"]);
						if(thing[pref.meldterm+"highlight"]) highlight = highlight.concat(thing[pref.meldterm+"highlight"]);
					}
					for(var i=0; i<fragments.length; i++){
						var fragFullString = fragments[i]['@id'];
						var fragString = fragFullString.substring(fragFullString.indexOf("#")+1);
						var el = document.getElementById(fragString);
						if(el) {
							el.onclick = this.updateViewerFun(show, highlight);
						}
					}
					break;
				case pref.meldterm+"definition":
					var definition = {definition: objOrFirstObj(annotation[pref.oa+"hasBody"])[pref.meldterm+"hasDefinition"]};
					for(var i=0; i<fragments.length; i++){
						var fragString = fragments[i]['@id'];
						var terms = document.getElementsByTagName("tei-term");
						for(var j=0; j<terms.length; j++){
							if(terms[j].getAttribute("ref")===fragString){
								var el = terms[j];
								definition.head = el.innerHTML;
								if(el) {
									var defFun = this.definitionFun(definition);
									el.onmouseenter = defFun;
									el.onmouseleave = this.props.clearDefinition;
									el.ontouchstart = defFun;
									el.ontouchend = this.props.clearDefinition;
								}
							}
						}
					}
					break;
				case pref.meldterm+"personInfo":
					// Some ontology disagreements between apps
					var annBody = objOrFirstObj(annotation[pref.oa + "hasBody"])
					if(annBody.definition) { // deprecated version
						var definition = { definition: annotation[pref.oa+"hasBody"][0].definition,
															 head: annotation[pref.oa+"hasBody"][0].head };
					} else {
						var definition = {
							definition: annBody[pref.meldterm+"definition"]
								? annBody[pref.meldterm+"definition"]
								: annBody[pref.meldterm+"hasDefinition"],
							head: annBody[pref.meldterm+"head"]
								? annBody[pref.meldterm+"head"]
								: annBody[pref.meldterm+"hasHead"],
							role: annBody[pref.meldterm+"role"],
							classref: annBody[pref.meldterm+"classref"]
						};
					}
					for(var i=0; i<fragments.length; i++){
						var fragString = fragments[i]['@id'];
						var terms = document.getElementsByTagName("tei-persName");
						for(var j=0; j<terms.length; j++){
							if(terms[j].getAttribute("ref")===fragString){
								var el = terms[j];
								if(el) {
									var defFun = this.definitionFun(definition);
									el.onmouseenter = defFun;
									el.onmouseleave = this.props.clearDefinition;
									el.ontouchstart = defFun;
									el.ontouchend = this.props.clearDefinition;
								}
							}
						}
					}
					break;
			}
		} else if ("oa:hasBody" in annotation) {
			// Old code: deprecated and likely to be removed. Incompatible
			// with new traversal mechanisms.
      annotation["oa:hasBody"].map((b) => {
        // TODO convert to switch statement
        if (b["@id"] === MARKUP_EMPHASIS) {
          this.props.handleEmphasis(ReactDOM.findDOMNode(this), annotation, this.props.uri, fragments);
        } else if (b["@id"] === MARKUP_HIGHLIGHT) {
          this.props.handleHighlight(ReactDOM.findDOMNode(this), annotation, this.props.uri, fragments);
        } else if (b["@id"] === MARKUP_HIGHLIGHT2) {
          this.props.handleHighlight2(ReactDOM.findDOMNode(this), annotation, this.props.uri, fragments);
        } else if (b["@id"] === CUE_IMAGE) {
          this.props.handleCueImage(ReactDOM.findDOMNode(this), annotation, this.props.uri, fragments, this.props.tei.fragImages);
        } else {
          console.log("TEI component unable to handle meld action: ", b);
        }
      });
    } else {
      console.log("Skipping annotation without body: ", annotation)
    }
  }
}

function setCSSProp(selector, obj){
	// General purpose CSS rule setting function. Tries to be tidy and
	// update existing rules rather than spamming new ones
	if(!document.stylesheets || !document.stylesheets.length) {
		// FIXME: why not set something here?
		console.log('No stylesheets – not setting style');
		return;
	}
	var rules = document.styleSheets[0].cssRules || document.styleSheets[0].rules;
	if(!rules) {
		return;
	};
	var i=0;
		while(i<rules.length && (!rules[i].selectorText || rules[i].selectorText.indexOf(selector)===-1)){
			i++;
		}
	if(i==rules.length) {
		//insert rules
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

function mapStateToProps({tei}) {
  return {tei};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchTEI, handleEmphasis, handleCueImage, handleHighlight, handleHighlight2}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TEI);

if (!String.prototype.endsWith) {
  String.prototype.endsWith = function (searchString, position) {
    var subjectString = this.toString();
    if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
      position = subjectString.length;
    }
    position -= searchString.length;
    var lastIndex = subjectString.lastIndexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
  };
}
function idOrFirstId(jld){
	return Array.isArray(jld) ? jld[0]['@id'] : jld['@id'];
}
function objOrFirstObj(jld){
	return Array.isArray(jld) ? jld[0] : jld;
}
