import React, { Component } from 'react';
import MdRedo from 'react-icons/lib/md/redo';
import MdUndo from 'react-icons/lib/md/undo';
import MdPlayArrow from 'react-icons/lib/md/play-arrow';
import MdPause from 'react-icons/lib/md/pause';
import MdAdd from 'react-icons/lib/md/add';
import MdReplay from 'react-icons/lib/md/replay';
import Player from './components/player/Player';
import Slider from './components/player/Slider';
import Duration from './components/player/Duration';
import Canvas from './components/canvas/Canvas';
import List from './components/list/List';
import Form from './components/form/Form';
import {VideoObject, Trajectory } from './models/2DVideo.js';
import {UndoRedo} from './models/UndoRedo.js';
import {ADD_2D_VIDEO_OBJECT, DELETE_2D_VIDEO_OBJECT, SPLIT_2D_VIDEO_OBJECT, EXIT_2D_VIDEO_OBJECT} from './models/UndoRedo.js';
import {SPLIT, HIDE, SHOW} from './models/2DVideo.js';
import {colors, getRandomInt, interpolationArea, interpolationPosition} from './helper.js';
import { Container, Row, Col, Button, ButtonGroup} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
const MAX_PANEL_HEIGHT = 1440;

class VideoTool extends Component {
  constructor(props) {
    super(props);
		this.state = { submitted: false, annotationWidth: 0, annotationHeight: 0,
							 		 played: 0, playing: false, duration: 0, loop: false, seeking: false, adding: false, objectCounter: 0, focusing: "", objects: [] };
		this.UndoRedo = new UndoRedo();
  }


	static getDerivedStateFromProps(nextProps, prevState) {
		if( nextProps.width!==prevState.width && (!nextProps.annotationWidth || prevState.annotationWidth==0) ){
			const annotationWidth =  nextProps.width;
			return { annotationWidth: annotationWidth }
		}
		if( nextProps.annotationWidth!==prevState.annotationWidth ){
			const annotationWidth = nextProps.annotationWidth || prevState.annotationWidth;
			return { annotationWidth: annotationWidth }
		}
		if( nextProps.objects && nextProps.objects !== prevState.objects ){
			return { objects: nextProps.objects }
		}
		return null;
	}


	componentDidUpdate(prevProps) {
	  if (this.state.annotationHeight !== document.getElementById('react-player').children[0].clientHeight) {
	    this.setState({annotationHeight: document.getElementById('react-player').children[0].clientHeight});
	  }
	}

	/* ==================== video player ==================== */
	playerRef = player => {
		this.player = player
	}
	handleVideoReady = () =>{
		//this.setState({annotationHeight: document.getElementById('react-player').children[0].clientHeight})
	}
	handleVideoRewind = () => {
		this.setState({ playing: false, played: 0 })
		this.player.seekTo(0)
	}
	handleVideoPlayPause = () => {
		this.setState({ playing: !this.state.playing })
	}
	handleVideoProgress = state => {
		if (!this.state.seeking) {
			const played = state.played
			this.setState((prevState, props) => {
				return { played: played }
			})
		}
  }
	handleVideoDuration = duration => {
    this.setState({ duration })
  }
	handleVideoEnded = () => {
    this.setState({ playing: this.state.loop })
  }
	/* ==================== video player slider ==================== */
	handleSliderMouseUp = e => {
		this.setState({ seeking: false })
	}
	handleSliderMouseDown = e => {
		this.setState({playing: false, seeking: true})
	}
	handleSliderChange = e => {
			const played = parseFloat(e.target.value);
			this.setState((prevState, props) => {
				const {objects} = prevState
				let {focusing} = prevState
				if(focusing){
					const obj = objects.find( o => o.name === focusing );
					const trajectories = obj.trajectories
					for( let i = 0; i < trajectories.length; i++){
						if(played >= trajectories[i].time){
							if(i!==trajectories.length-1 && played >= trajectories[i+1].time)
								continue;
							if(trajectories[i].status!==SHOW)
								focusing = "";
							break;
						}else{
							if(i==trajectories.length-1)
								focusing = "";
						}
					}
				}
				return { played: played, focusing: focusing }
			}, ()=>{this.player.seekTo(played)})
	}
	/* ==================== canvas ==================== */
	handleAddObject = () =>{
		this.setState((prevState, props) => {
			return {adding: !prevState.adding, playing: false};
		});
	}
	handleCanvasStageMouseMove = e =>{}
	handleCanvasStageMouseDown = e =>{
		if(!this.state.adding)
			return;
		const stage = e.target.getStage()
		const position = stage.getPointerPosition()
		const name = (new Date()).getTime().toString(36);
		const color = colors[getRandomInt(colors.length)]
		const trajectories = []
		this.UndoRedo.save({...this.state, adding: false}); // Undo/Redo
		this.setState((prevState, props) => {
			trajectories.push( new Trajectory({x: position.x, y: position.y, height: 1, width: 1, time: prevState.played}) )
			return { adding: !prevState.adding, objectCounter: prevState.objectCounter+1, focusing: `${name}`, objects: [...prevState.objects, new VideoObject({id: prevState.objectCounter+1, name: `${name}`, color: color, trajectories: trajectories})]};
		}, () => {
			const group = stage.find(`.${name}`)[0]
			const bottomRight = group.get('.bottomRight')[0]
			bottomRight.startDrag();
		});
	}
	handleCanvasStageMouseUp = e => {}
	handleCanvasGroupMouseDown = e =>{
		const group = e.target.findAncestor('Group')
		this.setState({playing: false, focusing: group.name()});
	}
	handleCanvasGroupDragStart = e =>{}
	handleCanvasGroupDragEnd = e =>{
		if(e.target.getClassName() !== 'Group')
			return;
		const group = e.target
		const rect = group.get('Rect')[0];
		const topLeft = group.get('.topLeft')[0]
		const position = topLeft.getAbsolutePosition()
		this.setState((prevState, props) => {
			const played = prevState.played
			return { playing: false, objects: prevState.objects.map( obj =>{
					if(obj.name !== group.name())
						return obj;
					let trajectories = obj.trajectories
					for( let i = 0; i < trajectories.length; i++){
						if(played >= trajectories[i].time){
							//skip elapsed trajectories
							if(i!==trajectories.length-1 && played >= trajectories[i+1].time)
								continue;
							if(played===trajectories[i].time){
								trajectories[i].x = position.x; trajectories[i].y = position.y; trajectories[i].width = rect.width(); trajectories[i].height = rect.height();
								break;
							}
							if(i===trajectories.length-1){
								trajectories.push(new Trajectory({x: position.x, y: position.y, width: rect.width(), height: rect.height(), time: played}));
								break;
							}
							trajectories.splice(i+1, 0, new Trajectory({x: position.x, y: position.y, height: rect.height(), width: rect.width(), time: played}));
							break;
						}
					}
					return { ...obj, trajectories: trajectories};
				})
			}
		})
	}
	handleCanvasGroupRef = r =>{}
	handleCanvasDotMouseDown = e =>{
		const group = e.target.findAncestor('Group')
		this.setState({focusing: group.name()})
	}
	handleCanvasDotDragMove = e =>{}
	handleCanvasDotDragEnd = e =>{
		const activeAnchor = e.target
		const group = activeAnchor.getParent();
		group.draggable(true)
		const topLeft = group.get('.topLeft')[0], topRight = group.get('.topRight')[0], bottomRight = group.get('.bottomRight')[0], bottomLeft = group.get('.bottomLeft')[0];
		const maxX = Math.max(topLeft.getAbsolutePosition().x, topRight.getAbsolutePosition().x, bottomRight.getAbsolutePosition().x, bottomLeft.getAbsolutePosition().x)
		const minX = Math.min(topLeft.getAbsolutePosition().x, topRight.getAbsolutePosition().x, bottomRight.getAbsolutePosition().x, bottomLeft.getAbsolutePosition().x)
		const maxY = Math.max(topLeft.getAbsolutePosition().y, topRight.getAbsolutePosition().y, bottomRight.getAbsolutePosition().y, bottomLeft.getAbsolutePosition().y)
		const minY = Math.min(topLeft.getAbsolutePosition().y, topRight.getAbsolutePosition().y, bottomRight.getAbsolutePosition().y, bottomLeft.getAbsolutePosition().y)
		this.setState((prevState, props) => {
			const played = prevState.played
			return { objects: prevState.objects.map( obj =>{
				if(obj.name !== group.name())
					return obj;
					let trajectories = obj.trajectories
					for( let i = 0; i < trajectories.length; i++){
							if(played >= trajectories[i].time){
								//skip elapsed trajectories
								if(i!==trajectories.length-1 && played >= trajectories[i+1].time)
									continue;
								if(played===trajectories[i].time){
									trajectories[i].x = minX; trajectories[i].y = minY; trajectories[i].height = maxY-minY; trajectories[i].width = maxX-minX;
									break;
								}
								trajectories.splice( i+1, 0, new Trajectory({x: minX, y: minY, height: maxY-minY, width: maxX-minX, time: played}))
								break;
							}
					}
					return { ...obj, trajectories: trajectories};
				})
			}
		})
	}
	/* ==================== list ==================== */
	handleListObjectItemClick = name =>{
		this.setState({focusing: name})
	}
	handleListTrajectoryJump = e => {
		const name = e.name
		const time = e.time
		this.setState({ playing: false, focusing: name },
			() => {
				this.player.seekTo(parseFloat(time))
				for(let o of this.state.objects){
					if(o.name!==name)
						continue;
					if(o.status===SHOW)
						this.state.stage.find(`.${name}`)[0].moveToTop();
					break;
				}
		})
	}
	handleListTrajectoryDelete = e => {
		const name = e.name
		const time = e.time
		this.UndoRedo.save(this.state); // Undo/Redo
		this.setState((prevState) => {
			const objects = prevState.objects.map( obj => {
				if(obj.name !== name)
					return obj;
				const trajectories = obj.trajectories.filter( t => {
						if(t.time !== time)
							return true;
						return false
				});
				return {...obj, trajectories: trajectories};
			});
			return { objects: objects };
		});
	}
	handleListObjectDelete = name => {
		this.UndoRedo.save(this.state); // Undo/Redo
		this.setState((prevState) => {
				const objects = prevState.objects.filter( object => {
					if(object.name !== name)
						return true;
					return false
					});
				return { objects: objects, focusing: "" };
		});
	}
	handleListObjectShowHide = e => {
		const name = e.name;
		const status = e.status;
		this.UndoRedo.save(this.state); // Undo/Redo
		this.setState((prevState, props) => {
			const played = prevState.played
			return { objects: prevState.objects.map( obj =>{
					if(obj.name !== name)
						return obj
					let trajectories = obj.trajectories
					for( let i = 0; i < trajectories.length; i++){
						if(i===0 && played < trajectories[i].time){
							trajectories.splice(0, 0, new Trajectory({x: trajectories[i].x, y: trajectories[i].y, height: trajectories[i].height, width: trajectories[i].width, time: played, status: status}));
							break;
						}
						if(played >= trajectories[i].time){
							//skip elapsed trajectories
							if(i!==trajectories.length-1 && played >= trajectories[i+1].time)
								continue;
							if(played===trajectories[i].time){
								trajectories.splice(i, 1, new Trajectory({...trajectories[i], status: status}));
								break;
							}
							if(i===trajectories.length-1){
								trajectories.push(new Trajectory({x: trajectories[i].x, y: trajectories[i].y, height: trajectories[i].height, width: trajectories[i].width, time: played, status: status}));
								break;
							}
							let interpoArea = interpolationArea( { startTraj: trajectories[i], endTraj: trajectories[i+1], played: played })
							let interpoPos = interpolationPosition( { startTraj: trajectories[i], endTraj: trajectories[i+1], played: played })
							trajectories.splice(i+1, 0, new Trajectory({x: interpoPos.x, y: interpoPos.y, height: interpoArea.height, width: interpoArea.width, time: played, status: status}));
							break;
						}
					}
					if(status === HIDE )
						Trajectory.clearDuplicateTrajectory(trajectories, status);
					return { ...obj, trajectories: trajectories};
				})
			}
		})
	}
	handleListObjectSplit = name =>{
		const childName1 = (new Date()).getTime().toString(36);
		const childName2 = ((new Date()).getTime()+1).toString(36);
		const childTrajectories1 = [];
		const childTrajectories2 = [];
		const status = SPLIT;
		let childrenColor;
		let exChildName1, exChildName2;
		let parentId, parentX, parentY, parentWidth, parentHeight, parentIndex, parentColor;
		this.UndoRedo.save(this.state); // Undo/Redo
		this.setState((prevState, props) => {
			const played = prevState.played
			let objects = prevState.objects.map( (obj, index) =>{
				if(obj.name !== name)
					return obj;
				exChildName1 = obj.children[0];
				exChildName2 = obj.children[1];
				parentIndex = index;
				parentId = obj.id
				parentColor = obj.color;
				//make sure parent's color is different with its children
				let randomColor = colors[getRandomInt(colors.length)];
				while(parentColor === randomColor)
					randomColor = colors[getRandomInt(colors.length)];
				childrenColor = randomColor;


				let trajectories = obj.trajectories
				for( let i = 0; i < trajectories.length; i++){
					if(played >= trajectories[i].time){
						if(i!==trajectories.length-1 && played >= trajectories[i+1].time)
							continue;
						parentX = trajectories[i].x;
						parentY = trajectories[i].y;
						parentWidth = trajectories[i].width;
						parentHeight = trajectories[i].height;
						if(played===trajectories[i].time){
							trajectories.splice(i, 1, new Trajectory({...trajectories[i], status: status}));
							trajectories = trajectories.slice(0,i+1);
							break;
						}
						if(i===trajectories.length-1){
							trajectories.push(new Trajectory({x: trajectories[i].x, y: trajectories[i].y, height: trajectories[i].height, width: trajectories[i].width, time: played, status: status}));
							break;
						}
						let interpoArea = interpolationArea( { startTraj: trajectories[i], endTraj: trajectories[i+1], played: played })
						let interpoPos = interpolationPosition( { startTraj: trajectories[i], endTraj: trajectories[i+1], played: played })
						parentX = interpoPos.x;
						parentY = interpoPos.y;
						parentWidth = interpoArea.width;
						parentHeight = interpoArea.height;
						trajectories.splice(i+1, 0, new Trajectory({x: interpoPos.x, y: interpoPos.y, height: interpoArea.height, width: interpoArea.width, time: played, status: status}));
						trajectories = trajectories.slice(0,i+2);
						break;
					}
				}
				return { ...obj, trajectories: trajectories, children: [`${childName1}`, `${childName2}`]};
			})
			childTrajectories1.push(new Trajectory({x: parentX+10, y: parentY+10, height: parentHeight, width: parentWidth, time: played}));
			childTrajectories2.push(new Trajectory({x: parentX+20, y: parentY+20, height: parentHeight, width: parentWidth, time: played}));
			objects.splice(parentIndex, 0, new VideoObject({id: `${parentId}-1`, name: `${childName1}`, color: childrenColor, trajectories: childTrajectories1, parent: name }))
			objects.splice(parentIndex, 0, new VideoObject({id: `${parentId}-2`, name: `${childName2}`, color: childrenColor, trajectories: childTrajectories2, parent: name }))
			objects = objects.filter(obj => {
				if(obj.name!==exChildName1 && obj.name!==exChildName2)
					return true
				return false
			})
			return { objects: objects, focusing: `${childName2}`};
		})
	}
	/* ==================== undo/redo ==================== */
	handleUndo = () =>{
		this.setState((prevState, props) => {
			const state = this.UndoRedo.undo(prevState);
			return {...state};
		})
	}
	handleRedo = () =>{
		this.setState((prevState, props) => {
			const state = this.UndoRedo.redo(prevState);
			return {...state};
		})
	}
	/* ==================== form ==================== */
	handleFormFinalSubmit = feedback =>{
		const { annotationWidth, annotationHeight, objects } = this.state
		const { url, width, height } = this.props
		this.props.onSubmit({feedback: feedback, url: url, width: width, height: height, annotationWidth: annotationWidth, annotationHeight: annotationHeight, objects: objects});
	}
	handleFormCancelSubmission = () =>{
		this.setState({loop: false, submitted: false, playing: false})
	}
	handleFormSubmit = () =>{
		this.setState({loop: true, submitted: true, played: 0, playing: true})
	}

  render() {
		const {	submitted, annotationWidth, annotationHeight, playing, played, duration, loop, adding, focusing, objects } = this.state;
    const { url, width, height, mturk, mturkAction, mturkAssignmentId } = this.props
		let panelHeight = annotationHeight<=MAX_PANEL_HEIGHT? annotationHeight:MAX_PANEL_HEIGHT;

    return (
			<Container fluid={true}>
				<Row className="pt-5 pb-3 mb-3" style={{background: "#f6f6f6"}}>
					<Col xs="12" sm="auto">
						<div style={{width: annotationWidth}}>
							<div style={{position: 'relative', left: '50%', marginLeft: -annotationWidth/2}}>
										<Player playerRef={this.playerRef}
														onVideoReady={this.handleVideoReady}
														onVideoProgress={this.handleVideoProgress}
														onVideoDuration={this.handleVideoDuration}
														onVideoEnded={this.handleVideoEnded }
														url={url}
														width={annotationWidth}
														playing={playing}
														loop={loop}
														/>
										<Canvas width = {annotationWidth}
														height = {annotationHeight}
														objects= {objects}
														played = {played}
														focusing = {focusing}
														adding = {adding}
														onCanvasStageMouseMove={this.handleCanvasStageMouseMove}
														onCanvasStageMouseDown={this.handleCanvasStageMouseDown}
														onCanvasStageMouseUp={this.handleCanvasStageMouseUp}
														onCanvasGroupRef={this.handleCanvasGroupRef}
														onCanvasGroupMouseDown={this.handleCanvasGroupMouseDown}
														onCanvasGroupDragStart={this.handleCanvasGroupDragStart}
														onCanvasGroupDragEnd={this.handleCanvasGroupDragEnd}
														onCanvasDotMouseDown={this.handleCanvasDotMouseDown}
														onCanvasDotDragMove={this.handleCanvasDotDragMove}
														onCanvasDotDragEnd={this.handleCanvasDotDragEnd}
														/>
							</div>
							<div>
								<Slider played={played} onSliderMouseUp={this.handleSliderMouseUp} onSliderMouseDown={this.handleSliderMouseDown} onSliderChange={this.handleSliderChange}/>
							</div>
							<div className="d-flex align-items-center">
								<div className="">
									<ButtonGroup>
										<Button style={{padding: "0.375rem 0.1rem"}} color="link" onClick={this.handleVideoRewind}><MdReplay style={{fontSize: '30px'}}/></Button>
										<Button color="link" onClick={this.handleVideoPlayPause}>{playing ? <MdPause style={{fontSize: '30px'}}/> : <MdPlayArrow style={{fontSize: '30px'}}/>}</Button>
									</ButtonGroup>
								</div>
								<div className="flex-grow-1 ">
									<div className="text-right text-muted"><Duration seconds={played*duration}/> / <Duration seconds={duration}/></div>
								</div>
							</div>
						</div>
					</Col>
					<Col xs="">
							<div className="">
								{submitted? (
									<Form url={url} width={width} height={height} annotationWidth={annotationWidth} annotationHeight={annotationHeight} mturk={mturk} mturkAction={mturkAction} mturkAssignmentId={mturkAssignmentId} objects={objects} onFormSubmit={this.handleFormFinalSubmit} onFormCancelSubmission={this.handleFormCancelSubmission} />
								):(
									<div>
									<div className="pb-3 clearfix" style={{minWidth: "400px"}}>
										<Button outline disabled={adding} color="primary" onClick={this.handleAddObject} className="d-flex align-items-center float-left"><MdAdd/> {adding ? 'Adding Box' : 'Add Box'}</Button>
										<ButtonGroup className="float-right">
											<Button disabled={this.UndoRedo.previous.length==0} outline onClick={this.handleUndo}><MdUndo/></Button>
											<Button disabled={this.UndoRedo.next.length==0} outline onClick={this.handleRedo}><MdRedo/></Button>
										</ButtonGroup>
									</div>
									<List objects= {objects}
												duration= {duration}
												played = {played}
												focusing = {focusing}
												height = {panelHeight}
												onListObjectItemClick = {this.handleListObjectItemClick}
												onListObjectDelete= {this.handleListObjectDelete}
												onListObjectShowHide={this.handleListObjectShowHide}
												onListObjectSplit={this.handleListObjectSplit}
												onListTrajectoryJump={this.handleListTrajectoryJump}
												onListTrajectoryDelete={this.handleListTrajectoryDelete}
												/>
									</div>
									)}
							</div>
					</Col>
				</Row>
				{!submitted? (<Row><Col className="text-right mb-3"><Button onClick={this.handleFormSubmit}>I finished this task</Button></Col></Row>): ""}
			</Container>
    );
  }
}
export default VideoTool;

/*onCanvasStageRef={this.handleCanvasStageRef}*/
