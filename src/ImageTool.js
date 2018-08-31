import React, { Component } from 'react';
import {normalize, schema} from 'normalizr';
import { Button, ButtonGroup} from 'reactstrap';
import { MdAdd } from 'react-icons/md';
import { GoSearch } from 'react-icons/go';

import {colors, getRandomInt} from './helper.js';
import Image from 'components/ImageTool/Image';
import Canvas from 'components/ImageTool/Canvas';
import List from 'components/ImageTool/List';
import {ImageAnnotation, POLYGON, BOX} from 'models/2DImage.js';
import {UndoRedo} from 'models/UndoRedo.js';




class ImageTool extends Component {
	constructor(props) {
    super(props);
		const entities = {options:{}, annotations:{}}
		let optionRoot = ""
		let annotations = []
		//normalize
		if(props.menu){
			const option = new schema.Entity('options')
			const options = new schema.Array(option);
			option.define({ options });
			const normalizedMenu = normalize(props.menu, option)
			entities.options = normalizedMenu.entities.options
			optionRoot = normalizedMenu.result
		}
		if(props.annotations){
			const annotation = new schema.Entity('annotations')
			const normalizedAnn = normalize(props.annotations, [annotation])
			entities.annotations = normalizedAnn.entities.annotations
			annotations = normalizedAnn.result
		}
		//console.log(annotations)
		this.state = { adding: false, addingType: "", addingMessage: "", focusing: "", magnifying: false, entities: entities, optionRoot: optionRoot,
								   annotationScaleFactor: 1, annotationHeight: 0, annotationWidth: props.annotationWidth || 0, annotations: annotations,
								   category: props.category || "" }
		this.UndoRedo = new UndoRedo();
  }
	componentDidMount(){
    document.addEventListener("keydown", this.handleKeydown, false);
  }
	handleKeydown = e => {
		switch(e.keyCode){
			case 90:
				this.handleUndo();
				break
			case 88:
				this.handleRedo();
				break
			case 16:
				this.handleToggleMagnifier();
				break
			case 67:
				this.handleAddPolyClick();
				break
			case 65:
				this.handlePreviousClick();
				break
			case 83:
				this.handleNextClick();
				break
			default:
				return;
		}
  }
	handleToggleMagnifier = () =>{
		this.setState((prevState, props) => ({magnifying: !prevState.magnifying}))
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
			const {entities} = prevState
			const annotations = entities.annotations
			delete annotations[name];
			const i =  prevState.annotations.indexOf(name);
			prevState.annotations.splice( i, 1);

			return { annotations: prevState.annotations, entities: {...entities, ["annotations"]: annotations} };
		});
	}
	/* ==================== options ==================== */
	//new option
	handleOptionsAddOption = (e, parentId, value) => {
		e.preventDefault();
		this.setState((prevState) => {
			const {entities} = prevState
			const options = entities.options
			const id = new Date().getTime().toString(36);
			options[id] = {id: id, value: value, options: []}
      options[parentId].options.push(id)
			return {entities: {...entities, ["options"]: options}};
		});
	}
	//select item
	handleOptionsSelectOption = (name, selectedIds) =>{
		this.setState((prevState) => {
			const {entities} = prevState
			const selected = selectedIds.map(id => entities.options[id]);
			const updatedAnn = {...entities.annotations[name], selected: selected}
			return {entities: {...entities, ["annotations"]: { ...entities.annotations, [name]: updatedAnn }}};
		});
	}
	//delete item
	handleOptionsDeleteOption = (deleteIds) =>{
		this.setState((prevState) => {
			const {entities} = prevState
			const options = entities.options
			delete options[deleteIds[deleteIds.length-1]];
			const i =  options[deleteIds[deleteIds.length-2]].options.indexOf(deleteIds[deleteIds.length-1])
			options[deleteIds[deleteIds.length-2]].options.splice( i, 1);
			return {entities: {...entities, ["options"]: options}};
		});
	}



	/* ==================== submit ==================== */
	handlePreviousClick = () =>{
		const { annotationScaleFactor, annotationWidth, annotationHeight, annotations, category } = this.state
		const { url } = this.props
		this.props.onPreviousClick({url: url, category: category, annotationScaleFactor: annotationScaleFactor, annotationWidth: annotationWidth, annotationHeight: annotationHeight, annotations: annotations});
	}
	handleNextClick = () =>{
		const { annotationScaleFactor, annotationWidth, annotationHeight, annotations, category } = this.state
		const { url } = this.props
		this.props.onNextClick({url: url, category: category, annotationScaleFactor: annotationScaleFactor, annotationWidth: annotationWidth, annotationHeight: annotationHeight, annotations: annotations});
	}

	render() {
		const {adding, addingMessage, focusing, magnifying, annotationWidth, annotationHeight, annotations, category, entities, optionRoot, annotations} = this.state
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
				<div>
					<div className="mb-1" style={{position: 'relative'}}>
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
					</div>
					<Button outline color="primary" onClick={this.handleToggleMagnifier} className="d-flex align-items-center"><GoSearch/> {magnifying ? 'Turn Off' : 'Turn On'}</Button>
				</div>
				<div>
					<div className="d-flex justify-content-between mb-3">
						<Button outline color="primary" onClick={this.handleAddPolyClick} className="d-flex align-items-center"><MdAdd/> {adding ? 'Adding Polygon' : 'Add ploygon'}</Button>
						<ButtonGroup>
							<Button outline active={category=="No PII"} color="info" onClick={()=>this.handleCategorySelect("No PII")} >No PII</Button>
						</ButtonGroup>
					</div>
					<List dynamicOptions = {dynamicOptions}
								disabledOptionLevels = {disabledOptionLevels}
								entities = {entities}
								optionRoot = {optionRoot}
								annotations = {annotations}
				 				focusing = {focusing}
								onListItemClick = {this.handleListItemClick}
								onListItemDelete= {this.handleListItemDelete}
								onOptionsAddOption = {this.handleOptionsAddOption}
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
<Button outline color="primary" onClick={this.handleToggleMagnifier} className="d-flex align-items-center"><GoSearch/> {magnifying ? 'Turn Off' : 'Turn On'}</Button>
*/
