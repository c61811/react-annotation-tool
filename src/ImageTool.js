import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Collapse} from 'reactstrap';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import {colors, getRandomInt} from './helper.js';
import Canvas from './components/imageCanvas/ImageCanvas';
import List from './components/imageList/ImageList';
import MdAdd from 'react-icons/lib/md/add';
import {UndoRedo} from './models/UndoRedo.js';
import {ImageAnnotation} from './models/2DImage.js';
const MAX_PANEL_HEIGHT = 1440;

class ImageTool extends Component {
	constructor(props) {
    super(props);
		this.state={adding: false, focusing: "", counter: 0, annotationWidth: 300, annotationHeight: 300, annotations:[]}
		this.UndoRedo = new UndoRedo();
  }
	onImgLoad = e => {
			const target = e.target
			this.setState({ annotationHeight: target.height, annotationWidth: target.width });
	}
	handleAddObject = () =>{
		this.setState((prevState, props) => {
			return {adding: !prevState.adding};
		});
	}
	/* ==================== canvas ==================== */
	handleCanvasStageMouseMove = e =>{}
	handleCanvasStageMouseDown = e =>{
		if(!this.state.adding)
			return;
		const stage = e.target.getStage()
		const position = stage.getPointerPosition()
		const name = (new Date()).getTime().toString(36);
		const color = colors[getRandomInt(colors.length)]
		//this.UndoRedo.save({...this.state, adding: false}); // Undo/Redo
		this.setState((prevState, props) => {
			return { adding: !prevState.adding,
							 counter: prevState.counter+1,
							 focusing: `${name}`,
							 annotations: [...prevState.annotations,
								 						new ImageAnnotation({id: prevState.counter+1, name: `${name}`, color: color, x: position.x, y: position.y, height: 1, width: 1})]};
		}, () => {
			const group = stage.find(`.${name}`)[0]
			const bottomRight = group.get('.bottomRight')[0]
			bottomRight.startDrag();
		});
	}
	handleCanvasStageMouseUp = e => {}
	handleCanvasGroupMouseDown = e =>{
		const group = e.target.findAncestor('Group')
		this.setState({focusing: group.name()});
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
			return { annotations: prevState.annotations.map( anno =>{
					if(anno.name !== group.name())
						return anno;
					return { ...anno, x: position.x, y: position.y, height: rect.height(), width: rect.width()};
				})
			}
		})
	}
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
			//const played = prevState.played
			return { annotations: prevState.annotations.map( anno =>{
				if(anno.name !== group.name())
					return anno;
					return { ...anno, x: minX, y: minY, height: maxY-minY, width: maxX-minX};

				})
			}
		})
	}
	/* ==================== list ==================== */
	handleListItemClick = name =>{
		this.setState({focusing: name})
	}
	handleListItemDelete = name => {
		this.setState((prevState) => {
			let annotations = prevState.annotations.filter( anno => {
					if(anno.name !== name)
						return true;
					return false
			});
			return { annotations: annotations, focusing: "" };
		});
	}

	render() {
		const {adding, focusing, annotationWidth, annotationHeight, annotations} = this.state
		let panelHeight = annotationHeight<=MAX_PANEL_HEIGHT? annotationHeight:MAX_PANEL_HEIGHT;
		return(
			<div className="d-flex flex-wrap px-5 justify-content-around">
				<div className="d-flex justify-content-center">
					<div className="my-3"  style={{position: 'relative'}}>
						<img
							 className=""
							 onLoad={this.onImgLoad}
							 src="https://lh3.googleusercontent.com/JNJBaQnNximJ229F-jbkXPzu8tvIPAWHPfi_wlscspHMGPf9fRGGk5EjHp9cIPMprEuYPHDG7DAQClk0_wraO59uNwP32i1SON-yhD1HIitsvrklqLHbU3ZMcYxUhfwKCN36xVmqFFu4HzyZPb5w1IC-sjIRDsC5PzaYyC4NfPDKb0Gtd2DAMNsN_iFL1NFp-ym9V94rqDncEIBZmwGBRUqpStBNRaNUHjHmgcZw11aN9ZBfm-zQMxChRiWQ_yZUwcAWB9yaFgbZaZucRs3DL73ieYzKai7VyNDcZu6FIg_c-J5ErguK_yxD67pDZ9Z0cZbml-7tka-YbwDIP7R4Gg6CR08Ei2WOYADYQqg2edISrqKPwhMKsKum0342irInTCEwuY4JDTVcLBFOCY_etjWMRkTs2DN3XnwBVKPKCsMCQkqMHqPbWnLtBMulCEO9-kMMdYtbl9HrbtzF_qa4x5XmwPFQt7ESssk-ohDBvFclNA7m6VUZtTUJCHLJ_CAIhEv4UAPsW13SJQMwbeWbHHegfkmiJS9VlGmUMMbNc7cb5ckBACfDo5s3DN8z0hjX7k-k03Fhe5mgR85vQ0wvoLYcE5wAsDHY5ehCXp3uLsVZvO472BXE3kn33UYByoUlXt91-00Ya4YjRa0BLyhEitn5ppJbZ5PkkQ=w599-h798-no" />
						 <Canvas width = {annotationWidth}
										height = {annotationHeight}
										annotations = {annotations}
										adding = {adding}
										focusing = {focusing}
										onCanvasStageMouseMove={this.handleCanvasStageMouseMove}
										onCanvasStageMouseDown={this.handleCanvasStageMouseDown}
										onCanvasStageMouseUp={this.handleCanvasStageMouseUp}
										onCanvasGroupMouseDown={this.handleCanvasGroupMouseDown}
										onCanvasGroupDragStart={this.handleCanvasGroupDragStart}
										onCanvasGroupDragEnd={this.handleCanvasGroupDragEnd}
										onCanvasDotMouseDown={this.handleCanvasDotMouseDown}
										onCanvasDotDragMove={this.handleCanvasDotDragMove}
										onCanvasDotDragEnd={this.handleCanvasDotDragEnd}
										/>
					</div>
				</div>
				<div className="px-3">
						<Button outline disabled={adding} color="primary" onClick={this.handleAddObject} className="d-flex align-items-center"><MdAdd/> {adding ? 'Adding Box' : 'Add Box'}</Button>
						<List annotations= {annotations}
									focusing = {focusing}
									height = {panelHeight}
									onListItemClick = {this.handleListItemClick}
									onListItemDelete= {this.handleListItemDelete}
									/>
				</div>
			</div>
	)}

}
export default ImageTool;
