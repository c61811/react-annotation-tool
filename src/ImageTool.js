import React, { Component } from 'react';
import {normalize, denormalize, schema} from 'normalizr';
import { Button, ButtonGroup} from 'reactstrap';
import { MdAdd, MdUndo, MdRedo } from 'react-icons/md';
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
		if(props.menu && Object.keys(props.menu).length!==0){
			const option = new schema.Entity('options')
			const options = new schema.Array(option);
			option.define({ options });
			const normalizedMenu = normalize(props.menu, option)
			entities.options = normalizedMenu.entities.options
			optionRoot = normalizedMenu.result
		}else {
			optionRoot="0";
			entities.options["0"]={id:"0", value:"root", options:[]}
		}

		if(props.annotations && props.annotations.length!==0){
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
				if(this.props.onPreviousClick)
					this.handleSubmit('Previous');
				break
			case 83:
				if(this.props.onSkipClick)
					this.handleSubmit('Skip');
				break
			case 68:
				if(this.props.onNextClick)
					this.handleSubmit('Next');
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
		if(this.UndoRedo.previous.length===0)
			return;
		this.setState((prevState, props) => {
			const state = this.UndoRedo.undo(prevState);
			return {...state};
		})
	}
	handleRedo = () =>{
		if(this.UndoRedo.next.length===0)
			return;
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
			const {adding, addingType, focusing, annotations, entities} = prevState;
			if(!adding)
				return;
			this.UndoRedo.save(prevState)
			// handle poly
			if(addingType==POLYGON){
				//first add
				if(!focusing){
					vertices = [];
					vertices.push({id: `${timeNow}`, name: `${timeNow}`, x: x, y: y})
					entities.annotations[`${timeNow}`] = new ImageAnnotation({id: `${timeNow}`, name: `${timeNow}`, type: POLYGON, color: color, vertices: vertices})
					return { category: "Others",
									 focusing: `${timeNow}`,
									 annotations: [...annotations, `${timeNow}`],
									 entities: {...entities, ["annotations"]: entities.annotations}}
				}
				//continue add vertex
				entities.annotations[focusing].vertices.push({id: `${timeNow}`, name: `${timeNow}`, x: x, y: y})
				return { entities: {...entities, ['annotations']: entities.annotations}}
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
		this.setState((prevState, props) => {
			const {entities} = prevState;
			const annotations = entities.annotations;
			if(annotations[group.name()].type==POLYGON){
				vertices = annotations[group.name()].vertices.map( v=> {
					if(v.name!==activeVertex.name())
						return v;
					return {...v, x: activeVertex.x(), y: activeVertex.y()}
				});
				annotations[group.name()].vertices = vertices
				return { entities: {...entities, ['annotations']: annotations}}
			}
		})
	}
	handleCanvasFocusing = e =>{
		const activeShape = e.target
		this.setState((prevState) => {
			if(!prevState.adding)
				return {focusing: activeShape.name()}

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


	handleSubmit = (type) =>{
		const { annotationScaleFactor, annotationWidth, annotationHeight, annotations, category, entities, optionRoot } = this.state
		const { url } = this.props
		const annotation = new schema.Entity('annotations')
		const denormalizedAnnotations = denormalize({ annotations: annotations }, {annotations: [annotation]}, entities).annotations;
		const option = new schema.Entity('options')
		const options = new schema.Array(option);
		option.define({ options });
		const denormalizedMenu = denormalize({ menu: optionRoot }, {menu: option}, entities).menu
		switch(type){
			case "Skip":
				this.props.onSkipClick({url: url, category: category, annotationScaleFactor: annotationScaleFactor, annotationWidth: annotationWidth, annotationHeight: annotationHeight, annotations: denormalizedAnnotations, menu: denormalizedMenu});
				break;
			case "Previous":
				this.props.onPreviousClick({url: url, category: category, annotationScaleFactor: annotationScaleFactor, annotationWidth: annotationWidth, annotationHeight: annotationHeight, annotations: denormalizedAnnotations, menu: denormalizedMenu});
				break;
			case "Next":
				this.props.onNextClick({url: url, category: category, annotationScaleFactor: annotationScaleFactor, annotationWidth: annotationWidth, annotationHeight: annotationHeight, annotations: denormalizedAnnotations, menu: denormalizedMenu});
				break;
			default:
				break;
		}
	}


	render() {
		const {adding, addingMessage, focusing, magnifying, annotationWidth, annotationHeight, annotations, category, entities, optionRoot} = this.state
		const {url, dynamicOptions, disabledOptionLevels} = this.props

		return(
			<div>
			<div className="d-flex justify-content-center pb-5">
				<ButtonGroup>
					{this.props.onPreviousClick && <Button color="primary" onClick={ ()=>this.handleSubmit('Previous') }>Previous (A)</Button>}
					{this.props.onPreviousClick && <Button color="primary" onClick={ ()=>this.handleSubmit('Skip') }>Skip (S)</Button>}
					{this.props.onNextClick && <Button color="primary" onClick={ ()=>this.handleSubmit('Next') }>Next (D)</Button>}
				</ButtonGroup>
			</div>
			<div className="d-flex flex-wrap justify-content-around">
				<div className="mb-1">
					<div className="mb-3">
						<ButtonGroup className="float-right">
							<Button disabled={this.UndoRedo.previous.length==0} outline onClick={this.handleUndo}><MdUndo/> (Z)</Button>
							<Button disabled={this.UndoRedo.next.length==0} outline onClick={this.handleRedo}><MdRedo/> (X)</Button>
						</ButtonGroup>
						<Button outline color="primary" onClick={this.handleToggleMagnifier} className="d-flex align-items-center"><GoSearch/> {magnifying ? 'Turn Off' : 'Turn On'} (Shift)</Button>
					</div>
					<div style={{position: 'relative'}}>
						<Canvas url = {url}
										width = {annotationWidth}
										height = {annotationHeight}
										adding = {adding}
										addingMessage = {addingMessage}
										annotations= {annotations}
										entities = {entities}
										focusing = {focusing}
										magnifying = {magnifying}
										onImgLoad = {this.handleCanvasImgLoad}
										onStageMouseDown = {this.handleCanvasStageMouseDown}
										onVertexMouseDown = {this.handleCanvasVertexMouseDown}
										onVertexDragEnd ={this.handleCanvasVertexDragEnd}
										onLabelMouseDown ={this.handleCanvasFocusing}
										onLineMouseDown ={this.handleCanvasFocusing}
										/>
					</div>
				</div>
				<div className="mb-1">
					<div className="d-flex justify-content-between mb-3">
						<Button outline color="primary" onClick={this.handleAddPolyClick} className="d-flex align-items-center"><MdAdd/> {adding ? 'Adding Polygon' : 'Add ploygon'} (C)</Button>
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
