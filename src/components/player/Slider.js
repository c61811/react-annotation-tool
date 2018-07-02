import React, { Component } from 'react';
import './Slider.css';
class Slider extends Component {
	handleMouseUp = e => {
		this.props.onSliderMouseUp(e);
  }
	handleMouseDown = e => {
    this.props.onSliderMouseDown(e);
  }
	handleChange = e => {
		this.props.onSliderChange(e);
  }
	render() {
		const {played} = this.props
		return (
			<div className="player-slider">
				<input
					type='range' min={0} max={1} step='any'
					value={played}
					onMouseUp={this.handleMouseUp}
					onMouseDown={this.handleMouseDown}
					onChange={this.handleChange}
				 />
		 </div>
		);
	}
}
export default Slider;
