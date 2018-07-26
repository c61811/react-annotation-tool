import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import MdPlayArrow from 'react-icons/lib/md/play-arrow';
import MdPause from 'react-icons/lib/md/pause';
import MdReplay from 'react-icons/lib/md/replay';
import {Button, ButtonGroup} from 'reactstrap';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import './styles/PlayerControl.css';
import Slider from './Slider';
import Duration from './Duration';

class PlayerControl extends Component {
	constructor(props) {
    super(props);
    this.state = {dropdownOpen: false};
  }
	handleSpeedToggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
	handleSliderMouseUp = (e) =>{
		this.props.onPlayerControlSliderMouseUp(e)
	}
	handleSliderMouseDown = (e) =>{
		this.props.onPlayerControlSliderMouseDown(e)
	}
	handleSliderChange = (e) =>{
		this.props.onPlayerControlSliderChange(e)
	}
	handleVideoRewind = () =>{
		this.props.onPlayerControlVideoRewind()
	}
	handleVideoPlayPause = () =>{
		this.props.onPlayerControlVideoPlayPause()
	}
	handleVideoSpeed = (s) => {
		this.props.onPlayerControlVideoSpeedChange(s)
	}

	render() {
		const { playing, played, playbackRate, duration} = this.props
		return(
			<div>
				<Slider played={played} onSliderMouseUp={this.handleSliderMouseUp} onSliderMouseDown={this.handleSliderMouseDown} onSliderChange={this.handleSliderChange}/>
				<div className="d-flex align-items-center">
					<div className="">
						<ButtonGroup>
							<Button style={{padding: "0.375rem 0.1rem"}} color="link" onClick={this.handleVideoRewind}><MdReplay style={{fontSize: '30px'}}/></Button>
							<Button color="link" onClick={this.handleVideoPlayPause}>{playing ? <MdPause style={{fontSize: '30px'}}/> : <MdPlayArrow style={{fontSize: '30px'}}/>}</Button>
						</ButtonGroup>
					</div>
					<Dropdown isOpen={this.state.dropdownOpen} toggle={this.handleSpeedToggle} size="sm">
						<DropdownToggle className={"speed-toggle"} color={"link"} caret>
							x{playbackRate}
						</DropdownToggle>
						<DropdownMenu>
							<DropdownItem header className={''}>Speed</DropdownItem>
							<DropdownItem className={'speed-item text-primary'} onClick={()=>this.handleVideoSpeed(0.25)}>0.25</DropdownItem>
							<DropdownItem className={'speed-item text-primary'} onClick={()=>this.handleVideoSpeed(0.5)}>0.5</DropdownItem>
							<DropdownItem className={'speed-item text-primary'} onClick={()=>this.handleVideoSpeed(1)}>1</DropdownItem>
							<DropdownItem className={'speed-item text-primary'} onClick={()=>this.handleVideoSpeed(1.5)}>1.5</DropdownItem>
							<DropdownItem className={'speed-item text-primary'} onClick={()=>this.handleVideoSpeed(2)}>2</DropdownItem>
						</DropdownMenu>
					</Dropdown>
					<div className="flex-grow-1 ">
						<div className="text-right text-muted"><Duration seconds={played*duration}/> / <Duration seconds={duration}/></div>
					</div>
				</div>
			</div>
		);
	}
}

export default PlayerControl;
