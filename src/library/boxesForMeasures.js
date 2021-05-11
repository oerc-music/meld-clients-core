export function boxesForMeasures(verovioSVG, extraClasses) {
  // given a Verovio-generated SVG, draw rectangles in front of each
  // bar and return a list of them (e.g. for adding callbacks)
  // N.B. I'm not removing previously-drawn barBoxes.
  var barBoxes = [];
  var SVGNS = "http://www.w3.org/2000/svg";
  var page = verovioSVG.getElementsByClassName('page-margin')[0];
  var systems = verovioSVG.getElementsByClassName('system');
  if (!extraClasses) extraClasses = "";
  for (var sysi = 0; sysi < systems.length; sysi++) {
    var sysMeasures = systems[sysi].getElementsByClassName('measure');
    var sysBBox = systems[sysi].getBBox();
    var maxHeight = sysBBox.height;
    var maxy = sysBBox.y;
    var vu = getStafflineGap(sysMeasures[0]) / 4;
    for (var measi = 0; measi < sysMeasures.length; measi++) {
      var box = document.createElementNS(SVGNS, "rect");
      var staff1 = sysMeasures[measi].getElementsByClassName('staff')[0];
      var staffLines = Array.prototype.filter.call(staff1.children, (x) => x.tagName === "path");
      var bbox = staffLines[0].getBBox();
      // console.log(bbox);
      box.setAttributeNS(null, "id", sysMeasures[measi].id + "-box");
      box.setAttributeNS(null, "class", "barBox " + extraClasses);
      box.setAttributeNS(null, "x", bbox.x + vu);
      box.setAttributeNS(null, "y", maxy);
      box.setAttributeNS(null, "height", maxHeight);
      box.setAttributeNS(null, "width", bbox.width - (2 * vu));
      // Rounded corners
      box.setAttributeNS(null, "rx", vu);
      box.setAttributeNS(null, "ry", vu);
      page.appendChild(box);
      barBoxes.push(box);
    }
  }
  return barBoxes;
}

function getStafflineGap(measure) {
  // some sort of scale info is needed. Let's use gap between
  // stafflines. This is not guaranteed to be stable, since the way
  // Verovio does these has no clear analogue in MEI. Also, they have
  // no class and aren't grouped separately, so are easiest detected
  // by their position in the file
  var staff = measure.getElementsByClassName('staff')[0];
  var kids = staff.children;
  if (kids[0].tagName === "path" && kids[1].tagName === "path") {
    var pos1 = kids[0].getAttributeNS(null, "d").split(" ")[1];
    var pos2 = kids[1].getAttributeNS(null, "d").split(" ")[1];
    return pos2 - pos1;
  } else {
    console.log("My assumptions about staves are wrong for measure:", measure);
  }
}

