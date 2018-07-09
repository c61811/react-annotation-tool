import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import './Player.css';

class Player extends Component {
	handleReady = state => {
    this.props.onVideoReady(state);
  }
	handleProgress = state => {
    this.props.onVideoProgress(state);
  }
	handleDuration = state => {
    this.props.onVideoDuration(state);
  }
	handleEnded = (state) => {
    this.props.onVideoEnded(state);
  }
	handleRef = (player) => {
    this.props.playerRef(player);
  }
	render() {
		const {playing, width, url} = this.props
		return(	<ReactPlayer url={url}
												 playing = {playing}
												 id = 'react-player'
												 ref={this.handleRef}
												 onReady={this.handleReady}
					 							 onProgress={this.handleProgress}
				  							 onDuration={this.handleDuration}
												 onEnded ={this.handleEnded}
												 className='player'
												 progressInterval={100}
												 controls={false}
												 muted={true}
												 width={width}
												 height='auto' />

					);
	}
}
export default Player;
