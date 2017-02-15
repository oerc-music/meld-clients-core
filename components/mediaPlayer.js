import React, {Component} from 'react';
import {Media, Player, controls} from 'react-media-player';
const { PlayPause, CurrentTime, Progress, SeekBar, Duration, MuteUnmute, Volume, Fullscreen} = controls;

class MediaPlayer extends Component { 
	constructor(props) { 
		super(props);

		this.state = {uri: "./audio/test.mp3"};
	}

	render() {
		return (
			<Media>
				<div className="media">
					<div className = "media-player">
						<Player src={this.state.uri} />
					</div>
					<div className="media-controls">
						<PlayPause/>
						<CurrentTime/>
						{/* <Progress/> */} 
						<SeekBar/>
						<Duration/>
						<MuteUnmute/>
						<Volume/>
						<Fullscreen/>
					</div>
				</div>
			</Media>
		);
	}
}

export default MediaPlayer
