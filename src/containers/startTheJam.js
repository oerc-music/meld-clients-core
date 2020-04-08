import React, {Component} from 'react';
import {createSession} from '../actions/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';

class StartTheJam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      performerUri: "",
      scoreUri: "",
      slug: "",
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
            <div>Score URI: <input type="text" name="scoreUri" value={this.state.scoreUri}
                                   onChange={this.handleScoreChange.bind(this)}/></div>
            <div>Performer URI: <input type="text" name="performerUri" value={this.state.performerUri}
                                       onChange={this.handlePerformerChange.bind(this)}/></div>
            <div>Session slug: <input type="text" name="slug" value={this.state.slug}
                                      onChange={this.handleSlugChange.bind(this)}/> (optional)
            </div>
            <button onClick={this.startClimb} disabled={!(this.state.scoreUri && this.state.performerUri)}>Start the
              climb!
            </button>
          </div>
      )
    }
  }


  handleScoreChange(event) {
    this.setState({scoreUri: event.target.value});
  }

  handlePerformerChange(event) {
    this.setState({performerUri: event.target.value});
  }

  handleSlugChange(event) {
    this.setState({slug: event.target.value});
  }

  startClimb() {
    this.props.createSession(
        this.state.sessionsUri,
        this.state.scoreUri,
        {
          performerUri: this.state.performerUri,
          slug: this.state.slug
        }
    )
  }
}


function mapStateToProps({sessionControl}) {
  return {sessionControl}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({createSession}, dispatch);
}

withRouter(StartTheJam);

export default connect(mapStateToProps, mapDispatchToProps)(StartTheJam);

