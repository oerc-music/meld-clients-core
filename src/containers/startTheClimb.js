import React, {Component} from 'react';
import {createSession} from '../actions/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';

class StartTheClimb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scoreUri: "http://127.0.0.1:5000/score/basecamp",
      sessionsUri: "http://127.0.0.1:5000/sessions"
    };
    // Following binding required to make 'this' work in the callback
    this.startClimb = this.startClimb.bind(this);
  }

  render() {
    console.log(this.props.sessionControl.newSessionUri);
    if (this.props.sessionControl.newSessionUri) {
      window.location.assign('/Climb?session=' + this.props.sessionControl.newSessionUri);
      return (<div className="loading">Loading session</div>);
    } else {
      return (
          <div className="sessionControls">
            {/*Performer URI: <input type="text" name="performerUri" value={this.state.performerUri} onChange={this.handleChange.bind(this)}/> <button onClick={this.startClimb} disabled={!this.state.performerUri}>Start the climb!</button>*/}
            <button onClick={this.startClimb}>Start the climb!</button>
          </div>
      )
    }
  }

//	handleChange(event) { 
//		this.setState({performerUri: event.target.value});
//	}

  startClimb() {
    this.props.createSession(this.state.sessionsUri, this.state.scoreUri)
  }
}


function mapStateToProps({sessionControl}) {
  return {sessionControl}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({createSession}, dispatch);
}

withRouter(StartTheClimb);

export default connect(mapStateToProps, mapDispatchToProps)(StartTheClimb);

