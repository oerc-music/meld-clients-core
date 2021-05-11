import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Score from '../containers/score';
import Modal from '../containers/modalUI';

import {modes} from '../../config/deliusModes';
import {clearConstituents, setMode} from '../actions/modalUI'

class ModalTest extends Component {
  constructor(props) {
    super(props);
    this.state = {modes};
  }

  componentDidMount() {
    console.log("I've found these notes: ", document.querySelectorAll('.note'));
  }

  componentWillReceiveProps(nextProps) {
    // this is where we do app-specific logic for the modal UI
    if (this.props.modalUI.mode == "baseMode" && nextProps.modalUI.constituents.has("dynamics")) {
      // user has selected dynamics - clear selections, and switch modes
      this.props.clearConstituents();
      this.props.setMode("dynamicsMode");
    }
  }

  render() {
    return (
        <div>
          <link rel="stylesheet" href="../../style/modalUI.css" type="text/css"/>
          <Modal modes={this.state.modes} orientation="wide"/>
          <Score uri="http://meld.linkedmusic.org/mei/Late_Swallows-dolet-musescore-II.mei"
                 onClick={(e) => this.handleScoreClick(e)} ref="score"/>
        </div>
    )
  }

  handleScoreClick(e) {
    console.log("score clicked: ", e);
  }
}

function mapStateToProps({modalUI}) {
  return {modalUI}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({setMode, clearConstituents}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalTest);
