import React, { Component } from 'react';
import { checkTraversalObjectives, setTraversalObjectives, traverse } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Test extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // https://reactjs.org/docs/react-component.html#unsafe_componentwillmount
    // @@NOTE: deprecated
    this.props.setTraversalObjectives([{
      "@context": {
        "oa": "http://www.w3.org/ns/oa#",
        "meldterm": "http://meld.linkedmusic.org/terms/"
      },
      "@id": {},
      "oa:hasBody": {
        "@id": "meldterm:highlight"
      }
    }]);
  }

  componentDidMount() {
    // start traversal
    this.props.traverse("http://meld.linkedmusic.org/annotations/Frageverbot1.json-ld");
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Did update!", prevProps, this.props);

    if ("graph" in prevProps) {
      // check our traversal objectives if the graph has updated
      if (prevProps.graph.graph.length !== this.props.graph.graph.length) {
        this.props.checkTraversalObjectives(this.props.graph.graph, this.props.graph.objectives);
      }
    }
  }

  render() {
    return /*#__PURE__*/React.createElement("div", null, "Hello MELD");
  }

}

function mapStateToProps({
  graph
}) {
  return {
    graph
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    traverse,
    setTraversalObjectives,
    checkTraversalObjectives
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);