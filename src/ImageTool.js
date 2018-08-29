import React, { Component } from 'react';
import {colors, getRandomInt} from './helper.js';
import Image from 'components/ImageTool/Image';
import Canvas from 'components/ImageTool/Canvas';
import List from 'components/ImageTool/List';
import {ImageAnnotation, POLYGON, BOX} from 'models/2DImage.js';
import {UndoRedo} from 'models/UndoRedo.js';
import { Button, ButtonGroup} from 'reactstrap';
import { MdAdd } from 'react-icons/md';
import { GoSearch } from 'react-icons/go';



class ImageTool extends Component {
	constructor(props) {
    super(props);
		this.state = { adding: false, addingType: "", addingMessage: "", focusing: "", magnifying: false,
								   annotationScaleFactor: 1, annotationHeight: 0, annotationWidth: props.annotationWidth || 0, annotations: props.annotations || [],
								   category: props.category || "", options: props.options || {} }
		this.UndoRedo = new UndoRedo();
  }
	componentDidMount(){
    document.addEventListener("keydown", this.handleKeydown, false);
  }
	handleKeydown = e => {
    if(event.keyCode === 90) {
			this.handleUndo();
			return;
    }
		if(event.keyCode === 88) {
			this.handleRedo();
			return;
    }
		if(event.keyCode === 16) {
			this.handleToggleMagnifier()
    }
		if(event.keyCode === 68) {
			this.handleAddPolyClick()
    }
  }
	handleAddPolyClick = () =>{
		this.setState((prevState, props) => {
			return {adding: !prevState.adding, addingType: (!prevState.adding?POLYGON:""), addingMessage: (!prevState.adding?"Click here to add a new polygon":""), focusing: "", category: "Others"};
		});
	}
	/* ==================== chose category ==================== */
	handleCategorySelect = category =>{
			this.setState({ category: category, annotations:[] })
	}
	handleToggleMagnifier = () =>{
		this.setState((prevState, props) => ({magnifying: !prevState.magnifying}))
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

	/* ==================== canvas ==================== */
	handleCanvasImgLoad = e => {
			const {annotationWidth} = this.state
			const target = e.target
			this.setState({ annotationScaleFactor: annotationWidth/target.naturalWidth , annotationHeight: target.height});
	}
	handleCanvasStageMouseDown = e =>{
		const stage = e.target.getStage();
		const {x, y} = stage.getPointerPosition();
		const timeNow = new Date().getTime().toString(36);
		const color = colors[getRandomInt(colors.length)];
		let vertices;
		this.setState((prevState, props) => {
			const {adding, addingType, focusing, annotations} = prevState;
			if(!adding)
				return;
			this.UndoRedo.save(prevState)
			// handle poly
			if(addingType==POLYGON){
				//first add
				if(!focusing){
					vertices = [];
					vertices.push({id: `${timeNow}`, name: `${timeNow}`, x: x, y: y})
					return { category: "Others",
									 focusing: `${timeNow}`,
									 annotations: [...annotations,
																 new ImageAnnotation({id: `${timeNow}`, name: `${timeNow}`, type: POLYGON, color: color, vertices: vertices})]};
				}
				//continue add vertex
				const ann = annotations.find( ann => {
					return ann.name == focusing
				});
				return { annotations: annotations.map( ann =>{	if(ann.name !== focusing)
																													return ann;
																													vertices = ann.vertices;
																													vertices.push({id: `${timeNow}`, name: `${timeNow}`, x: x, y: y})
																												return { ...ann, vertices: vertices};
																											})}
			}
			// handle box
			if(addingType==BOX){
				return;
			}
		})
	}
	//polygon
	handleCanvasVertexMouseDown = e =>{
		const activeVertex = e.target
		const group = activeVertex.getParent();
		this.setState((prevState, props) => {
			const {adding, addingType, focusing, annotations} = prevState;
			if(adding && addingType==POLYGON){
				return {adding: false, addingType: "", addingMessage: ""}
			}
			return {focusing: group.name()}
		})
	}
	handleCanvasVertexMouseMove = e =>{}
	handleCanvasVertexDragEnd = e =>{
		const activeVertex = e.target
		const group = activeVertex.getParent();
		let vertices;
		//group.draggable(true)
		this.setState((prevState, props) => {
			return { annotations: prevState.annotations.map( ann =>{
				if(ann.name !== group.name())
					return ann;
					//handle poly
					if(ann.type==POLYGON){
						//console.log(activeVertex.name())
						vertices = ann.vertices.map( v=> {
							if(v.name!==activeVertex.name())
								return v;
							return {...v, x: activeVertex.x(), y: activeVertex.y()}
						});
						return { ...ann, vertices: vertices};
					}
					//handle box

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
	/* ==================== options ==================== */
	//new option
	handleOptionsAddOption = (event, name, parents) => {
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
			children[id] = { id: id, value: values[parents[i].id], children: {}}
			return children;
		}
		children[parents[i+1].id].children =  this.addOption(children[parents[i+1].id].children, values, parents, i+1);
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
			console.log(updatedAnnotations)
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
			delete children[parents[i].id];
			return children;
		}
		children[parents[i].id].children = this.deleteOption( children[parents[i].id].children, parents, i+1);
		return children;
	}
	/* ==================== submit ==================== */
	handlePreviousClick = () =>{
		const { annotationScaleFactor, annotationWidth, annotationHeight, options, annotations, category } = this.state
		const { url } = this.props
		this.props.onPreviousClick({url: url, category: category, annotationScaleFactor: annotationScaleFactor, annotationWidth: annotationWidth, annotationHeight: annotationHeight, options: options, annotations: annotations});
	}
	handleNextClick = () =>{
		const { annotationScaleFactor, annotationWidth, annotationHeight, options, annotations, category } = this.state
		const { url } = this.props
		this.props.onNextClick({url: url, category: category, annotationScaleFactor: annotationScaleFactor, annotationWidth: annotationWidth, annotationHeight: annotationHeight, options: options, annotations: annotations});
	}

	render() {
		const {adding, addingMessage, focusing, magnifying, annotationWidth, annotationHeight, annotations, options, category} = this.state
		const {url, dynamicOptions, disabledOptionLevels} = this.props
		return(
			<div>
			<div className="d-flex justify-content-center pb-5">
				<ButtonGroup>
					<Button disabled={!category} color="primary" onClick={this.handlePreviousClick}>Previous</Button>
					<Button disabled={!category} color="primary" onClick={this.handleNextClick}>Next</Button>
				</ButtonGroup>
			</div>
			<div className="d-flex flex-wrap justify-content-around">
				<div className="d-flex justify-content-center">
					<div style={{position: 'relative'}}>
						<Canvas url = {url}
										width = {annotationWidth}
										height = {annotationHeight}
										adding = {adding}
										addingMessage = {addingMessage}
										annotations= {annotations}
										focusing = {focusing}
										magnifying = {magnifying}
										onImgLoad = {this.handleCanvasImgLoad}
										onStageMouseDown = {this.handleCanvasStageMouseDown}
										onVertexMouseDown = {this.handleCanvasVertexMouseDown}
										onVertexDragEnd ={this.handleCanvasVertexDragEnd}
										/>
						<Button outline color="primary" onClick={this.handleToggleMagnifier} className="d-flex align-items-center"><GoSearch/> {magnifying ? 'Turn Off' : 'Turn On'}</Button>
					</div>
				</div>
				<div>
					<div className="d-flex justify-content-between mb-3">
						<Button outline color="primary" onClick={this.handleAddPolyClick} className="d-flex align-items-center"><MdAdd/> {adding ? 'Adding Polygon' : 'Add ploygon'}</Button>
						<ButtonGroup>
							<Button outline active={category=="No PII"} color="info" onClick={()=>this.handleCategorySelect("No PII")} >No PII</Button>
							<Button outline active={category=="Blurry"} color="info" onClick={()=>this.handleCategorySelect("Blurry")} >Blurry</Button>
							<Button outline active={category=="Suspicious"} color="info" onClick={()=>this.handleCategorySelect("Suspicious")} >Suspicious</Button>
						</ButtonGroup>
					</div>
					<List dynamicOptions = {dynamicOptions}
								disabledOptionLevels = {disabledOptionLevels}
								options = {options}
								annotations = {annotations}
				 				focusing = {focusing}
								onListItemClick = {this.handleListItemClick}
								onListItemDelete= {this.handleListItemDelete}
								onOptionsAddOption = {this.handleOptionsAddOption}
								onOptionsInputChange = {this.handleOptionsInputChange}
								onOptionsSelectOption = {this.handleOptionsSelectOption}
								onOptionsDeleteOption = {this.handleOptionsDeleteOption}
					/>
			  </div>
			</div>
			</div>
		)}
}
export default ImageTool;

/*
<Image url = {url} annotationHeight = {annotationHeight} annotationWidth = {annotationWidth} onImgLoad = {this.handleImgLoad}/>

*/
