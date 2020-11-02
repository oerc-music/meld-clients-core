////////////////
// SVG util functions
export function nsResolver(prefix) {
  var ns = {
    'xml' : 'http://www.w3.org/1999/xml',
    'mei': 'http://www.music-encoding.org/ns/mei'
  };
  return ns[prefix] || null;
}
var MEINS = "http://www.music-encoding.org/ns/mei";
var SVGNS = "http://www.w3.org/2000/svg";

export function createSVG (w,h){
  var svg=document.createElementNS(SVGNS,"svg");
  if(w) svg.setAttributeNS(null, "width", w);
  if(h) svg.setAttributeNS(null, "height", h);
  return svg;
}

export function clearSVG(svgEl){
  while(svgEl.firstChild){
    svgEl.removeChild(svgEl.firstChild);
  }
}
export function svgCSS(element, css){
  var link = document.createElementNS(SVGNS, "link");
  link.setAttributeNS(null, "href", css);
  link.setAttributeNS(null, "type", "text/css");
  link.setAttributeNS(null, "rel", "stylesheet");
  element.appendChild(link);
  return element;
}
export function svgText(svgEl, x, y, cname, id, style, content){
  var el = document.createElementNS(SVGNS, "text");
  if(cname) el.setAttributeNS(null, "class", cname);
  if(id) el.id = id;
  if(x) el.setAttributeNS(null, "x", x);
  if(y) el.setAttributeNS(null, "y", y);
  if(style) el.setAttributeNS(null, "style", style);
  if(content == 0 || content) el.appendChild(document.createTextNode(content));
  if(svgEl) svgEl.appendChild(el);
  return el;
}
export function svgSpan(svgEl, cname, id, content){
  var el = document.createElementNS(SVGNS, "tspan");
  if(content) var textNode = document.createTextNode(content);
  if(cname) el.setAttributeNS(null, "class", cname);
  if(id) el.id = id;
  if(content) el.appendChild(textNode);
  if(svgEl)  svgEl.appendChild(el);
  return el;
}
export function svgGroup(svgEl, cname, id){
  var el = document.createElementNS(SVGNS, "g");
  if(cname) el.setAttributeNS(null, "class", cname);
  if(id) el.id = id;
  if(svgEl) svgEl.appendChild(el);
  return el;
}
export function svgLine(svgEl, x1, y1, x2, y2, cname, id){
  var el = document.createElementNS(SVGNS, "line");
  if(cname) el.setAttributeNS(null, "class", cname);
  if(id) el.setAttributeNS(null, "id", id);
  el.setAttributeNS(null, "x1", x1);
  el.setAttributeNS(null, "y1", y1);
  el.setAttributeNS(null, "x2", x2);
  el.setAttributeNS(null, "y2", y2);
  if(svgEl) svgEl.appendChild(el);
  return el;
}
export function svgRect(svgEl, x, y, width, height, cname, id){
  var el = document.createElementNS(SVGNS, "rect");
  if(cname) el.setAttributeNS(null, "class", cname);
  if(id) el.setAttributeNS(null, "id", id);
  if(x) el.setAttributeNS(null, "x", x);
  if(y) el.setAttributeNS(null, "y", y);
  if(width) el.setAttributeNS(null, "width", width);
  if(height) el.setAttributeNS(null, "height", height);
  if(svgEl) svgEl.appendChild(el);
  return el;
}
export function svgRoundedRect(svgEl, x, y, width, height, rx, ry,cname, id){
  var el = document.createElementNS(SVGNS, "rect");
  if(cname) el.setAttributeNS(null, "class", cname);
  if(id) el.setAttributeNS(null, "id", id);
  if(x) el.setAttributeNS(null, "x", x);
  if(y) el.setAttributeNS(null, "y", y);
  if(rx) el.setAttributeNS(null, "rx", rx);
  if(ry) el.setAttributeNS(null, "ry", ry);
  if(width) el.setAttributeNS(null, "width", width);
  if(height) el.setAttributeNS(null, "height", height);
  if(svgEl) svgEl.appendChild(el);
  return el;
}
