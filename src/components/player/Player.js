import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import './Player.css';

class Player extends Component {
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
		const {playing, height, width, url} = this.props
		const styles = { height: height, width: width }
		return(
						<div className='player-wrapper' style={styles}>
							<ReactPlayer url={url}
													 playing = {playing}
													 ref={this.handleRef}
					 								 onProgress={this.handleProgress}
					 	 							 onDuration={this.handleDuration}
					 								 onEnded ={this.handleEnded }
													 className='player'
													 progressInterval={100}
													 muted={true}
													 width='100%'
	          							 height='100%' />
						</div>
					);
	}
}
export default Player;
