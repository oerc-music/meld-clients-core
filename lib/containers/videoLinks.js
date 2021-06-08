"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _prefixes = require("../../lib/library/prefixes");

var _reactMediaPlayer = require("react-media-player");

var _index = require("../actions/index");

var _reactMediaPlayerPlayPause = _interopRequireDefault(require("../containers/react-media-player-play-pause"));

var _reactTabs = require("react-tabs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var PlayPause = _reactMediaPlayer.controls.PlayPause,
    CurrentTime = _reactMediaPlayer.controls.CurrentTime,
    Progress = _reactMediaPlayer.controls.Progress,
    SeekBar = _reactMediaPlayer.controls.SeekBar,
    Duration = _reactMediaPlayer.controls.Duration,
    MuteUnmute = _reactMediaPlayer.controls.MuteUnmute,
    Volume = _reactMediaPlayer.controls.Volume,
    Fullscreen = _reactMediaPlayer.controls.Fullscreen;

var VideoLinks = /*#__PURE__*/function (_Component) {
  _inherits(VideoLinks, _Component);

  var _super = _createSuper(VideoLinks);

  function VideoLinks(props) {
    _classCallCheck(this, VideoLinks);

    return _super.call(this, props);
  }

  _createClass(VideoLinks, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {}
  }, {
    key: "videoPlayer",
    value: function videoPlayer(url) {
      return /*#__PURE__*/_react["default"].createElement(_reactMediaPlayer.Media, {
        key: url
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "media"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "media-player"
      }, /*#__PURE__*/_react["default"].createElement(_reactMediaPlayer.Player, {
        src: url
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "media-controls"
      }, /*#__PURE__*/_react["default"].createElement(_reactMediaPlayerPlayPause["default"], null))));
    }
  }, {
    key: "isIteration",
    value: function isIteration(thing) {
      if (typeTest("https://meld.linkedmusic.org/companion/vocab/MotifIteration", thing)) return true;
      if (this.props.iterations.find(function (x) {
        return x['@id'] === thing['@id'];
      })) return true;
      return false;
    }
  }, {
    key: "isIterationSegment",
    value: function isIterationSegment(thing) {
      //		console.log(thing);
      if (typeTest("https://meld.linkedmusic.org/companion/vocab/MotifIterationSegment", thing)) return true;
      if (this.props.iterations.find(function (x) {
        return x.iterationSegments.find(function (y) {
          return y['@id'] === thing['@id'];
        });
      })) return true;
      return false;
    }
  }, {
    key: "makeLinks",
    value: function makeLinks(links) {
      var linkMedia = [];
      var TM = [];
      var compares = []; //		console.log(links);

      for (var i = 0; i < links.length; i++) {
        var targets = links[i].targets;

        for (var j = 0; j < targets.length; j++) {
          if (this.isIteration(targets[j])) {
            var targetID = targets[j]['@id'];
            var iterationNo = this.props.iterations.findIndex(function (x) {
              return x['@id'] == targetID;
            });
            var iteration = this.props.iterations[iterationNo];
            var audio = iteration.embodimentLists.MP3 ? this.videoPlayer(iteration.embodimentLists.MP3[0]) : /*#__PURE__*/_react["default"].createElement("div", null);
            linkMedia[iterationNo] = /*#__PURE__*/_react["default"].createElement("div", {
              className: "motifBlock",
              key: "vl-" + targetID
            }, /*#__PURE__*/_react["default"].createElement("div", {
              className: "motifName",
              onClick: this.props.inspectMotive.bind(null, targets[j]['@id'])
            }, iteration["http://www.w3.org/2000/01/rdf-schema#label"]), audio);
          } else if (this.isIterationSegment(targets[j])) {
            var targetID = targets[j]['@id'];
            var iterationNo = this.props.iterations.findIndex(function (x) {
              return x.iterationSegments.find(function (y) {
                return y['@id'] == targetID;
              });
            });
            var iteration = this.props.iterations[iterationNo];
            var segment = iteration.iterationSegments.find(function (x) {
              return x['@id'] == targetID;
            });
            var audio = iteration.embodimentLists.MP3 ? this.videoPlayer(iteration.embodimentLists.MP3[0]) : /*#__PURE__*/_react["default"].createElement("div", null);
            var segmentName = segment["http://purl.org/vocab/frbr/core#realizationOf"]["http://www.w3.org/2000/01/rdf-schema#label"];

            if (!segmentName) {
              //FIXME: HACK because of JSON-LD framing issues
              var pos = segment["http://purl.org/vocab/frbr/core#realizationOf"]['@id'].lastIndexOf('-');
              segmentName = segment["http://purl.org/vocab/frbr/core#realizationOf"]['@id'].substring(pos + 1);
            }

            linkMedia[iterationNo] = /*#__PURE__*/_react["default"].createElement("div", {
              className: "motifBlock",
              key: "vl-" + targetID
            }, /*#__PURE__*/_react["default"].createElement("div", {
              className: "motifName"
            }, /*#__PURE__*/_react["default"].createElement("span", {
              className: "motif",
              onClick: this.props.inspectMotive.bind(null, iteration['@id'])
            }, iteration["http://www.w3.org/2000/01/rdf-schema#label"], " "), /*#__PURE__*/_react["default"].createElement("span", {
              className: "segment",
              onClick: this.props.inspectMotive.bind(null, iteration['@id'], targetID)
            }, segmentName + " segment")), audio);
          } else if (typeTest("https://meld.linkedmusic.org/companion/vocab/TimeMachine", targets[j])) {
            var TM = [/*#__PURE__*/_react["default"].createElement("div", {
              className: "motifBlock",
              key: "TMlink",
              onClick: this.props.timeMachine
            }, "TimeMachine")];
          } else if (typeTest("https://meld.linkedmusic.org/companion/vocab/Compare", targets[j])) {
            var LID = targets[j]["https://meld.linkedmusic.org/companion/vocab/LeftMotif"]['@id'];
            var RID = targets[j]["https://meld.linkedmusic.org/companion/vocab/RightMotif"]['@id'];
            var iterationL = this.props.iterations.find(function (x) {
              return x['@id'] == LID;
            });
            var iterationR = this.props.iterations.find(function (x) {
              return x['@id'] == RID;
            });
            compares.push( /*#__PURE__*/_react["default"].createElement("div", {
              className: "motifBlock",
              key: "c-" + LID + "---" + RID
            }, /*#__PURE__*/_react["default"].createElement("div", {
              className: "motifName motifNames",
              onClick: this.props.compare.bind(null, LID, RID)
            }, "Compare ", iterationL[_prefixes.prefix.rdfs + "label"], " & ", iterationR[_prefixes.prefix.rdfs + 'label'])));
          }
        }
      }

      return TM.concat(Object.values(linkMedia), compares);
    }
  }, {
    key: "render",
    value: function render() {
      var cT = 0; //		console.log(this.props.timesync);

      var links = [];

      if (this.props.timesync && "mediaResources" in this.props.timesync && this.props.uri in this.props.timesync.mediaResources) {
        cT = this.props.timesync.mediaResources[this.props.uri]['currentTime'];
        var syncs = this.props.timesync.mediaResources[this.props.uri]['times'];

        if (syncs) {
          var times = Object.keys(syncs).map(function (t) {
            return Number(t);
          });
          var window = 5;

          for (var i = 0; i < times.length; i++) {
            if (cT > times[i] && cT < (syncs[times[i]].end ? syncs[times[i]].end : times[i] + window)) {
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

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "videoLinks linksTab"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "tabHeading"
      }, "Links"), linkDivs.length == 1 ? linkDivs[0] : linkDivs);
    }
  }]);

  return VideoLinks;
}(_react.Component);

function typeTest(type, jldObj) {
  if (jldObj['@type']) {
    if (typeof jldObj['@type'] == 'string') {
      return jldObj['@type'] == type;
    } else {
      return jldObj['@type'].indexOf(type) > -1;
    }
  } else return false;
}

function mapStateToProps(_ref) {
  var graph = _ref.graph,
      timesync = _ref.timesync;
  return {
    graph: graph,
    timesync: timesync
  };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({
    registerClock: _index.registerClock,
    tickTimedResource: _index.tickTimedResource
  }, dispatch);
}

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(VideoLinks);

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250YWluZXJzL3ZpZGVvTGlua3MuanMiXSwibmFtZXMiOlsiUGxheVBhdXNlIiwiY29udHJvbHMiLCJDdXJyZW50VGltZSIsIlByb2dyZXNzIiwiU2Vla0JhciIsIkR1cmF0aW9uIiwiTXV0ZVVubXV0ZSIsIlZvbHVtZSIsIkZ1bGxzY3JlZW4iLCJWaWRlb0xpbmtzIiwicHJvcHMiLCJ1cmwiLCJ0aGluZyIsInR5cGVUZXN0IiwiaXRlcmF0aW9ucyIsImZpbmQiLCJ4IiwiaXRlcmF0aW9uU2VnbWVudHMiLCJ5IiwibGlua3MiLCJsaW5rTWVkaWEiLCJUTSIsImNvbXBhcmVzIiwiaSIsImxlbmd0aCIsInRhcmdldHMiLCJqIiwiaXNJdGVyYXRpb24iLCJ0YXJnZXRJRCIsIml0ZXJhdGlvbk5vIiwiZmluZEluZGV4IiwiaXRlcmF0aW9uIiwiYXVkaW8iLCJlbWJvZGltZW50TGlzdHMiLCJNUDMiLCJ2aWRlb1BsYXllciIsImluc3BlY3RNb3RpdmUiLCJiaW5kIiwiaXNJdGVyYXRpb25TZWdtZW50Iiwic2VnbWVudCIsInNlZ21lbnROYW1lIiwicG9zIiwibGFzdEluZGV4T2YiLCJzdWJzdHJpbmciLCJ0aW1lTWFjaGluZSIsIkxJRCIsIlJJRCIsIml0ZXJhdGlvbkwiLCJpdGVyYXRpb25SIiwicHVzaCIsImNvbXBhcmUiLCJwcmVmaXgiLCJyZGZzIiwiY29uY2F0IiwiT2JqZWN0IiwidmFsdWVzIiwiY1QiLCJ0aW1lc3luYyIsInVyaSIsIm1lZGlhUmVzb3VyY2VzIiwic3luY3MiLCJ0aW1lcyIsImtleXMiLCJtYXAiLCJ0IiwiTnVtYmVyIiwid2luZG93IiwiZW5kIiwiY29uc29sZSIsImxvZyIsImxpbmtEaXZzIiwibWFrZUxpbmtzIiwiQ29tcG9uZW50IiwidHlwZSIsImpsZE9iaiIsImluZGV4T2YiLCJtYXBTdGF0ZVRvUHJvcHMiLCJncmFwaCIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsImRpc3BhdGNoIiwicmVnaXN0ZXJDbG9jayIs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NkNyRSxVQUE3QyxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCcgO1xuaW1wb3J0IHsgYmluZEFjdGlvbkNyZWF0b3JzIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHtwcmVmaXh9IGZyb20gJy4uLy4uL2xpYi9saWJyYXJ5L3ByZWZpeGVzJztcblxuaW1wb3J0IHsgTWVkaWEsIFBsYXllciwgY29udHJvbHMsIHV0aWxzIH0gZnJvbSAncmVhY3QtbWVkaWEtcGxheWVyJztcbmltcG9ydCB7IHJlZ2lzdGVyQ2xvY2ssIHRpY2tUaW1lZFJlc291cmNlLCBmZXRjaEdyYXBoIH0gZnJvbSAnLi4vYWN0aW9ucy9pbmRleCdcbmltcG9ydCBDdXN0b21QbGF5UGF1c2UgZnJvbSAnLi4vY29udGFpbmVycy9yZWFjdC1tZWRpYS1wbGF5ZXItcGxheS1wYXVzZSc7XG5pbXBvcnQgeyBUYWIsIFRhYnMsIFRhYkxpc3QsIFRhYlBhbmVsIH0gZnJvbSAncmVhY3QtdGFicyc7XG5jb25zdCB7XG4gIFBsYXlQYXVzZSxcbiAgQ3VycmVudFRpbWUsXG4gIFByb2dyZXNzLFxuICBTZWVrQmFyLFxuICBEdXJhdGlvbixcbiAgTXV0ZVVubXV0ZSxcbiAgVm9sdW1lLFxuICBGdWxsc2NyZWVuLFxufSA9IGNvbnRyb2xzXG5cbmNsYXNzIFZpZGVvTGlua3MgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblx0XHRcbiAgfVxuXHRjb21wb25lbnREaWRVcGRhdGUoKXtcblx0XHRcblx0fVxuXHR2aWRlb1BsYXllcih1cmwpe1xuXHRcdHJldHVybiAoPE1lZGlhIGtleT17dXJsfT5cblx0XHRcdFx0ICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZWRpYVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVkaWEtcGxheWVyXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8UGxheWVyIHNyYz17dXJsfS8+XG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZWRpYS1jb250cm9sc1wiPjxDdXN0b21QbGF5UGF1c2UvPjwvZGl2PlxuXHRcdFx0ICAgICAgICA8L2Rpdj5cblx0XHRcdFx0XHRcdDwvTWVkaWE+KTtcblx0fVxuXHRpc0l0ZXJhdGlvbih0aGluZyl7XG5cdFx0aWYodHlwZVRlc3QoXCJodHRwczovL21lbGQubGlua2VkbXVzaWMub3JnL2NvbXBhbmlvbi92b2NhYi9Nb3RpZkl0ZXJhdGlvblwiLCB0aGluZykpIHJldHVybiB0cnVlO1xuXHRcdGlmKHRoaXMucHJvcHMuaXRlcmF0aW9ucy5maW5kKHg9PnhbJ0BpZCddPT09dGhpbmdbJ0BpZCddKSkgcmV0dXJuIHRydWU7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGlzSXRlcmF0aW9uU2VnbWVudCh0aGluZyl7XG4vL1x0XHRjb25zb2xlLmxvZyh0aGluZyk7XG5cdFx0aWYodHlwZVRlc3QoXCJodHRwczovL21lbGQubGlua2VkbXVzaWMub3JnL2NvbXBhbmlvbi92b2NhYi9Nb3RpZkl0ZXJhdGlvblNlZ21lbnRcIiwgdGhpbmcpKSByZXR1cm4gdHJ1ZTtcblx0XHRpZih0aGlzLnByb3BzLml0ZXJhdGlvbnMuZmluZCh4PT54Lml0ZXJhdGlvblNlZ21lbnRzLmZpbmQoeT0+eVsnQGlkJ109PT10aGluZ1snQGlkJ10pKSkgcmV0dXJuIHRydWU7XG5cdFx0cmV0dXJuIGZhbHNlO1x0XHRcblx0fVxuXHRtYWtlTGlua3MobGlua3Mpe1xuXHRcdHZhciBsaW5rTWVkaWEgPSBbXTtcblx0XHR2YXIgVE0gPSBbXTtcblx0XHR2YXIgY29tcGFyZXMgPSBbXTtcbi8vXHRcdGNvbnNvbGUubG9nKGxpbmtzKTtcblx0XHRmb3IodmFyIGk9MDsgaTxsaW5rcy5sZW5ndGg7IGkrKyl7XG5cdFx0XHR2YXIgdGFyZ2V0cyA9IGxpbmtzW2ldLnRhcmdldHM7XG5cdFx0XHRmb3IodmFyIGo9MDsgajx0YXJnZXRzLmxlbmd0aDsgaisrKXtcblx0XHRcdFx0aWYodGhpcy5pc0l0ZXJhdGlvbih0YXJnZXRzW2pdKSkge1xuXHRcdFx0XHRcdHZhciB0YXJnZXRJRCA9IHRhcmdldHNbal1bJ0BpZCddO1xuXHRcdFx0XHRcdHZhciBpdGVyYXRpb25ObyA9IHRoaXMucHJvcHMuaXRlcmF0aW9ucy5maW5kSW5kZXgoeD0+eFsnQGlkJ109PXRhcmdldElEKTtcblx0XHRcdFx0XHR2YXIgaXRlcmF0aW9uID0gdGhpcy5wcm9wcy5pdGVyYXRpb25zW2l0ZXJhdGlvbk5vXTtcblx0XHRcdFx0XHR2YXIgYXVkaW8gPSBpdGVyYXRpb24uZW1ib2RpbWVudExpc3RzLk1QMyA/IHRoaXMudmlkZW9QbGF5ZXIoaXRlcmF0aW9uLmVtYm9kaW1lbnRMaXN0cy5NUDNbMF0pIDogPGRpdiAvPjtcblx0XHRcdFx0XHRsaW5rTWVkaWFbaXRlcmF0aW9uTm9dID0gKFxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb3RpZkJsb2NrXCIga2V5PXtcInZsLVwiK3RhcmdldElEfT5cblx0XHRcdFx0XHRcdCAgPGRpdiBjbGFzc05hbWU9XCJtb3RpZk5hbWVcIiBvbkNsaWNrPXt0aGlzLnByb3BzLmluc3BlY3RNb3RpdmUuYmluZChudWxsLCB0YXJnZXRzW2pdWydAaWQnXSl9PntpdGVyYXRpb25bXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwLzAxL3JkZi1zY2hlbWEjbGFiZWxcIl19XG5cdFx0XHRcdFx0XHRcdDwvZGl2PnthdWRpb31cblx0XHRcdFx0XHRcdDwvZGl2Pik7XG5cdFx0XHRcdH0gZWxzZSBpZih0aGlzLmlzSXRlcmF0aW9uU2VnbWVudCh0YXJnZXRzW2pdKSl7XG5cdFx0XHRcdFx0dmFyIHRhcmdldElEID0gdGFyZ2V0c1tqXVsnQGlkJ107XG5cdFx0XHRcdFx0dmFyIGl0ZXJhdGlvbk5vID0gdGhpcy5wcm9wcy5pdGVyYXRpb25zLmZpbmRJbmRleCh4PT54Lml0ZXJhdGlvblNlZ21lbnRzLmZpbmQoeT0+eVsnQGlkJ109PXRhcmdldElEKSk7XG5cdFx0XHRcdFx0dmFyIGl0ZXJhdGlvbiA9IHRoaXMucHJvcHMuaXRlcmF0aW9uc1tpdGVyYXRpb25Ob107XG5cdFx0XHRcdFx0dmFyIHNlZ21lbnQgPSBpdGVyYXRpb24uaXRlcmF0aW9uU2VnbWVudHMuZmluZCh4PT54WydAaWQnXT09dGFyZ2V0SUQpO1xuXHRcdFx0XHRcdHZhciBhdWRpbyA9IGl0ZXJhdGlvbi5lbWJvZGltZW50TGlzdHMuTVAzID8gdGhpcy52aWRlb1BsYXllcihpdGVyYXRpb24uZW1ib2RpbWVudExpc3RzLk1QM1swXSkgOiA8ZGl2IC8+O1xuXHRcdFx0XHRcdHZhciBzZWdtZW50TmFtZSA9IHNlZ21lbnRbXCJodHRwOi8vcHVybC5vcmcvdm9jYWIvZnJici9jb3JlI3JlYWxpemF0aW9uT2ZcIl1bXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwLzAxL3JkZi1zY2hlbWEjbGFiZWxcIl07XG5cdFx0XHRcdFx0aWYoIXNlZ21lbnROYW1lKSB7XG5cdFx0XHRcdFx0XHQvL0ZJWE1FOiBIQUNLIGJlY2F1c2Ugb2YgSlNPTi1MRCBmcmFtaW5nIGlzc3Vlc1xuXHRcdFx0XHRcdFx0dmFyIHBvcyA9IHNlZ21lbnRbXCJodHRwOi8vcHVybC5vcmcvdm9jYWIvZnJici9jb3JlI3JlYWxpemF0aW9uT2ZcIl1bJ0BpZCddLmxhc3RJbmRleE9mKCctJyk7XG5cdFx0XHRcdFx0XHRzZWdtZW50TmFtZSA9IHNlZ21lbnRbXCJodHRwOi8vcHVybC5vcmcvdm9jYWIvZnJici9jb3JlI3JlYWxpemF0aW9uT2ZcIl1bJ0BpZCddLnN1YnN0cmluZyhwb3MrMSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGxpbmtNZWRpYVtpdGVyYXRpb25Ob10gPSAoXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vdGlmQmxvY2tcIiBrZXk9e1widmwtXCIrdGFyZ2V0SUR9PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vdGlmTmFtZVwiPjxzcGFuIGNsYXNzTmFtZT1cIm1vdGlmXCIgb25DbGljaz17dGhpcy5wcm9wcy5pbnNwZWN0TW90aXZlLmJpbmQobnVsbCwgaXRlcmF0aW9uWydAaWQnXSl9PntpdGVyYXRpb25bXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwLzAxL3JkZi1zY2hlbWEjbGFiZWxcIl19IDwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cInNlZ21lbnRcIiBvbkNsaWNrPXt0aGlzLnByb3BzLmluc3BlY3RNb3RpdmUuYmluZChudWxsLCBpdGVyYXRpb25bJ0BpZCddLCB0YXJnZXRJRCl9PntzZWdtZW50TmFtZSArIFwiIHNlZ21lbnRcIn08L3NwYW4+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+e2F1ZGlvfTwvZGl2Pik7XG5cdFx0XHRcdH0gZWxzZSBpZiAodHlwZVRlc3QoXCJodHRwczovL21lbGQubGlua2VkbXVzaWMub3JnL2NvbXBhbmlvbi92b2NhYi9UaW1lTWFjaGluZVwiLCB0YXJnZXRzW2pdKSl7XG5cdFx0XHRcdFx0dmFyIFRNID0gWzxkaXYgY2xhc3NOYW1lPVwibW90aWZCbG9ja1wiIGtleT1cIlRNbGlua1wiIG9uQ2xpY2s9e3RoaXMucHJvcHMudGltZU1hY2hpbmV9PlRpbWVNYWNoaW5lPC9kaXY+XTtcblx0XHRcdFx0fSBlbHNlIGlmICh0eXBlVGVzdChcImh0dHBzOi8vbWVsZC5saW5rZWRtdXNpYy5vcmcvY29tcGFuaW9uL3ZvY2FiL0NvbXBhcmVcIiwgdGFyZ2V0c1tqXSkpe1xuXHRcdFx0XHRcdHZhciBMSUQgPSB0YXJnZXRzW2pdW1wiaHR0cHM6Ly9tZWxkLmxpbmtlZG11c2ljLm9yZy9jb21wYW5pb24vdm9jYWIvTGVmdE1vdGlmXCJdWydAaWQnXTtcblx0XHRcdFx0XHR2YXIgUklEID0gdGFyZ2V0c1tqXVtcImh0dHBzOi8vbWVsZC5saW5rZWRtdXNpYy5vcmcvY29tcGFuaW9uL3ZvY2FiL1JpZ2h0TW90aWZcIl1bJ0BpZCddO1xuXHRcdFx0XHRcdHZhciBpdGVyYXRpb25MID0gdGhpcy5wcm9wcy5pdGVyYXRpb25zLmZpbmQoeD0+eFsnQGlkJ109PUxJRCk7XG5cdFx0XHRcdFx0dmFyIGl0ZXJhdGlvblIgPSB0aGlzLnByb3BzLml0ZXJhdGlvbnMuZmluZCh4PT54WydAaWQnXT09UklEKTtcblx0XHRcdFx0XHRjb21wYXJlcy5wdXNoKDxkaXYgY2xhc3NOYW1lPVwibW90aWZCbG9ja1wiIGtleT17XCJjLVwiK0xJRCtcIi0tLVwiK1JJRH0+PGRpdiBjbGFzc05hbWU9XCJtb3RpZk5hbWUgbW90aWZOYW1lc1wiIG9uQ2xpY2s9e3RoaXMucHJvcHMuY29tcGFyZS5iaW5kKG51bGwsIExJRCwgUklEKX0+Q29tcGFyZSB7aXRlcmF0aW9uTFtwcmVmaXgucmRmcytcImxhYmVsXCJdfSAmIHtpdGVyYXRpb25SW3ByZWZpeC5yZGZzKydsYWJlbCddfTwvZGl2PjwvZGl2Pik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIFRNLmNvbmNhdChPYmplY3QudmFsdWVzKGxpbmtNZWRpYSksIGNvbXBhcmVzKTtcblx0fVxuICByZW5kZXIoKXtcblx0XHR2YXIgY1QgPSAwO1xuLy9cdFx0Y29uc29sZS5sb2codGhpcy5wcm9wcy50aW1lc3luYyk7XG5cdFx0dmFyIGxpbmtzID0gW107XG5cdFx0aWYodGhpcy5wcm9wcy50aW1lc3luYyAmJiBcIm1lZGlhUmVzb3VyY2VzXCIgaW4gdGhpcy5wcm9wcy50aW1lc3luY1xuXHRcdFx0ICYmIHRoaXMucHJvcHMudXJpIGluIHRoaXMucHJvcHMudGltZXN5bmMubWVkaWFSZXNvdXJjZXMpe1xuXHRcdFx0Y1QgPSB0aGlzLnByb3BzLnRpbWVzeW5jLm1lZGlhUmVzb3VyY2VzW3RoaXMucHJvcHMudXJpXVsnY3VycmVudFRpbWUnXTtcblx0XHRcdHZhciBzeW5jcyA9IHRoaXMucHJvcHMudGltZXN5bmMubWVkaWFSZXNvdXJjZXNbdGhpcy5wcm9wcy51cmldWyd0aW1lcyddO1xuXHRcdFx0aWYoc3luY3Mpe1xuXHRcdFx0XHR2YXIgdGltZXMgPSBPYmplY3Qua2V5cyhzeW5jcykubWFwKCh0KT0+IE51bWJlcih0KSk7XG5cdFx0XHRcdHZhciB3aW5kb3cgPSA1O1xuXHRcdFx0XHRmb3IodmFyIGk9MDsgaTx0aW1lcy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdFx0aWYoY1Q+dGltZXNbaV0gJiYgY1QgPCAoc3luY3NbdGltZXNbaV1dLmVuZCA/IHN5bmNzW3RpbWVzW2ldXS5lbmQgOiB0aW1lc1tpXSt3aW5kb3cpKXtcblx0XHRcdFx0XHRcdGxpbmtzLnB1c2goc3luY3NbdGltZXNbaV1dKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBjb25zb2xlLmxvZyhcIm5vIHN5bmNzXCIsIHRoaXMucHJvcHMudGltZXN5bmMsIHRoaXMucHJvcHMudXJpKTtcblx0XHR9XG5cdFx0dmFyIGxpbmtEaXZzID0gdGhpcy5tYWtlTGlua3MobGlua3MpO1xuLypcdFx0aWYoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3RlaS1saW5rJykuaXRlbSgwKSl7XG5cdFx0XHR2YXIgbGlua0RpdnMgPSB0aGlzLmFsbFJlZnNJbmRleCgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzZXRUaW1lb3V0KHRoaXMucHJvcHMuYWR2YW5jZVRpbWUsIDAuMik7XG5cdFx0fSovXG5cdFx0Ly8gdmFyIHZpc2libGVzID0gdGhpcy5wcm9wcy52aXNpYmxlID8gdGhpcy52aXNpYmxlTGlua3MoKSA6IFtdO1xuXHRcdC8vIGlmKHZpc2libGVzLmxlbmd0aD09MSkgdmlzaWJsZXMgPSB2aXNpYmxlc1swXTtcbi8vXHRcdGNvbnNvbGUubG9nKGxpbmtEaXZzKTtcbiAgICByZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ2aWRlb0xpbmtzIGxpbmtzVGFiXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwidGFiSGVhZGluZ1wiPkxpbmtzPC9kaXY+XG5cdFx0XHR7bGlua0RpdnMubGVuZ3RoID09IDEgPyBsaW5rRGl2c1swXSA6IGxpbmtEaXZzfTwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdHlwZVRlc3QodHlwZSwgamxkT2JqKXtcblx0aWYoamxkT2JqWydAdHlwZSddKXtcblx0XHRpZih0eXBlb2YoamxkT2JqWydAdHlwZSddKT09J3N0cmluZycpe1xuXHRcdFx0cmV0dXJuIGpsZE9ialsnQHR5cGUnXT09dHlwZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIGpsZE9ialsnQHR5cGUnXS5pbmRleE9mKHR5cGUpPi0xO1xuXHRcdH1cblx0fSBlbHNlIFxuXHRcdHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gbWFwU3RhdGVUb1Byb3BzKHsgZ3JhcGggLCB0aW1lc3luY30pIHtcbiAgcmV0dXJuIHsgZ3JhcGggLCB0aW1lc3luYyB9IDtcbn1cbmZ1bmN0aW9uIG1hcERpc3BhdGNoVG9Qcm9wcyhkaXNwYXRjaCkgeyBcbiAgcmV0dXJuIGJpbmRBY3Rpb25DcmVhdG9ycyh7IFx0XHRyZWdpc3RlckNsb2NrLCB0aWNrVGltZWRSZXNvdXJjZSB9LCBkaXNwYXRjaCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZGVvTGlua3MpO1xuIl19