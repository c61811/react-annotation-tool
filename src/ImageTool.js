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
		this.state={ categorySubmitted: false, category: "", adding: false, focusing: "", counter: 0, annotationScaleFactor: 1, annotationWidth: 0, annotationHeight: 0, annotations:[], options: {} }
		this.UndoRedo = new UndoRedo();
  }

	static getDerivedStateFromProps(nextProps, prevState) {

		if( nextProps.annotationWidth!==prevState.annotationWidth ){
				const annotationWidth = nextProps.annotationWidth || prevState.annotationWidth;
				return { annotationWidth: annotationWidth }
		}
		if( nextProps.options && nextProps.options !== prevState.options ){
			//console.log(nextProps.options)
			return { options: nextProps.options }
		}

		//if( nextProps.annotations && nextProps.annotations !== prevState.annotations ){
		//	return { annotations: nextProps.annotations }
		//}
		return null;
	}


	handleImgLoad = e => {
			const {annotationWidth} = this.state
			const target = e.target
			//console.log(annotationWidth/target.naturalWidth)
			//console.log(target.width)
			//console.log(target.height)
			//console.log(annotationWidth)
			this.setState({ annotationScaleFactor: annotationWidth/target.naturalWidth , annotationHeight: target.height});
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
			const {options} = prevState
			return { adding: !prevState.adding,
							 counter: prevState.counter+1,
							 focusing: `${name}`,
							 annotations: [...prevState.annotations,
								 						new ImageAnnotation({id: prevState.counter+1, name: `${name}`, color: color, x: position.x, y: position.y, height: 1, width: 1, options})]};
		}, (a) => {
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
			return { annotations: prevState.annotations.map( anno =>{
				if(anno.name !== group.name())
					return anno;
					return { ...anno, x: minX, y: minY, height: maxY-minY, width: maxX-minX};

				})
			}
		})
	}
  /* ==================== chose category ==================== */
	handleCategorySelect = type =>{
		switch (type) {
			case 'Others':
				this.setState({categorySubmitted: true, category: 'Others'})
				break;
			default:
				const {annotationWidth, annotationHeight, annotations, options} = this.state
				const { url } = this.props
				this.props.onSubmit({url: url, category: type, annotationWidth: annotationWidth, annotationHeight: annotationHeight, options: options, annotations: annotations});
		}
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
	/* ==================== options ==================== */
	//new option
	handleOptionsAddOption = (event, name, parents) => {
		console.log(event)
		event.preventDefault();
		this.setState((prevState) => {
			let {annotations, options}  = prevState
			const anno = annotations.find( a=> a.name===name )
			const optionValues = anno.optionInputValues
			options = this.addOption(options, optionValues, parents, 0);
		  return {options: options};
		});
  }
	addOption = (children, values, parents, i) =>{
		if(i===parents.length-1){
			const id = Date.now().toString();
			children[id] = { id: id, name: values[parents[i]], children: {}}
			return children;
		}
		children[parents[i+1]].children =  this.addOption(children[parents[i+1]].children, values, parents, i+1);
		return children;
	}
	//option value
	handleOptionsInputChange = (name, e) => {
    const target = e.target;
		this.setState((prevState) => {
			const {annotations} = prevState
			const updatedAnnotations = annotations.map( anno =>{
					if(anno.name !== name)
						return anno;
					return { ...anno, optionInputValues: {...anno.optionInputValues, [target.name]: target.value}};
			})
			return {annotations: updatedAnnotations};
		});
  }
	//select item
	handleOptionsSelectOption = (name, selectedOptionPath) =>{
		this.setState((prevState) => {
			const {options, optionIsOpen, annotations} = prevState
			const updatedAnnotations = annotations.map( anno =>{
					if(anno.name !== name)
						return anno;
					return { ...anno, selectedOptionPath: selectedOptionPath};
			})
		  return {annotations: updatedAnnotations};
		});
	}
	//delete item
	handleOptionsDeleteOption = (parents) =>{
		this.setState((prevState) => {
			let {options} = prevState
			options = this.deleteOption(options, parents, 1);
		  return {options: options};
		});
	}
	deleteOption = (children, parents, i) =>{
		if(i===parents.length-1){
			delete children[parents[i]];
			return children;
		}
		children[parents[i]].children = this.deleteOption( children[parents[i]].children, parents, i+1);
		return children;
	}
  /* ==================== submit ==================== */
	handleTaskSubmit = () =>{
		const { annotationScaleFactor, annotationWidth, annotationHeight, options, annotations, category } = this.state
		const { url } = this.props
		this.props.onSubmit({url: url, category: category, annotationScaleFactor: annotationScaleFactor, annotationWidth: annotationWidth, annotationHeight: annotationHeight, options: options, annotations: annotations});
	}

	render() {
		const {adding, focusing, categorySubmitted, annotationWidth, annotationHeight, annotations, options} = this.state
		const {url} = this.props
		let panelHeight = MAX_PANEL_HEIGHT;


		let panelContent;
		if(categorySubmitted)
			panelContent = <div>
											 <Button outline disabled={adding} color="primary" onClick={this.handleAddObject} className="d-flex align-items-center my-2"><MdAdd/> {adding ? 'Adding Box' : 'Add Box'}</Button>
											 <List annotations= {annotations}
												 		 focusing = {focusing}
														 height = {panelHeight}
														 options = {options}
														 onListItemClick = {this.handleListItemClick}
														 onListItemDelete= {this.handleListItemDelete}
														 onOptionsAddOption = {this.handleOptionsAddOption}
														 onOptionsInputChange = {this.handleOptionsInputChange}
														 onOptionsSelectOption = {this.handleOptionsSelectOption}
														 onOptionsDeleteOption = {this.handleOptionsDeleteOption}
														/>
										 </div>
		else
			panelContent = <div className="d-flex justify-content-center h-100 align-items-center">
												<div>
													<Button color="primary" block onClick={()=>this.handleCategorySelect("Blurry")} >Blurry</Button>
													<Button color="primary" block onClick={()=>this.handleCategorySelect("Suspicious")} >Suspicious</Button>
													<Button color="primary" block onClick={()=>this.handleCategorySelect("Others")} >Others</Button>
												</div>
										 </div>


		return(
			<div>
			<div className="d-flex justify-content-center pb-5">
				<Button color="primary" onClick={this.handleTaskSubmit}>Submit & Go Next</Button>
			</div>
			<div className="d-flex flex-wrap px-5 justify-content-around">
				<div className="d-flex justify-content-center">
					<div style={{position: 'relative'}}>
						<img
							 width={annotationWidth}
							 className=""
							 onLoad={this.handleImgLoad}
							 src={url} />
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
					{panelContent}
				</div>
			</div>
			</div>
		)}
}
export default ImageTool;
