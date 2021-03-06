import React, { Component } from 'react';
import {normalize, denormalize, schema} from 'normalizr';
import {Button, ButtonGroup, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/ImageTool.css'

import {MdAdd, MdUndo, MdRedo } from 'react-icons/md';
import {GoSearch } from 'react-icons/go';
import {FaCommentAlt } from 'react-icons/fa';
import {colors, getRandomInt} from './helper.js';
import Canvas from 'components/imageTool/Canvas';
import List from 'components/imageTool/List';
import {ImageAnnotation} from 'models/2DImage.js';
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
		this.state = { adding: false, focusing: "", magnifyingOpen: false, magnifyingPower: 1, labeled: props.labeled || false, entities: entities, inputFocused: false, optionRoot: optionRoot,
								   annotationScaleFactor: 1, annotationHeight: 0, annotationWidth: props.annotationWidth || 400, annotations: annotations,
								   category: props.category || "" }
		this.UndoRedoState = new UndoRedo();
  }
	componentDidMount = () =>{
    document.addEventListener("keydown", this.handleKeydown, false);
  }
	componentWillUnmount = () =>{
    document.removeEventListener("keydown", this.handleKeydown, false);
  }

	handleKeydown = e => {
		if(this.state.inputFocused)
			return;
		switch(e.keyCode){
			case 90:
				this.handleUndo();
				break
			case 88:
				this.handleRedo();
				break
			case 16:
				this.handleToggleLabel();
				break
			case 67:
				this.handleAddClick();
				break
			case 83:
				if(this.props.onPreviousClick)
					this.handleSubmit('Previous');
				break
			case 65:
				if(this.props.onSkipClick)
					this.handleSubmit('Skip');
				break
			case 68:
				if(this.props.onNextClick)
					this.handleSubmit('Next');
				break
			case 49:
				this.handleClickMagnifier(1);
				break
			case 50:
				this.handleClickMagnifier(2);
				break
			case 51:
				this.handleClickMagnifier(3);
				break
			case 52:
				this.handleClickMagnifier(4);
				break
			default:
				return;
		}
  }
	handleClickMagnifier = p =>{
		this.setState((prevState, props) => ({magnifyingPower: p}))
	}
	handleToggleMagnifier = () => {
    this.setState(prevState => ({
      magnifyingOpen: !prevState.magnifyingOpen
    }));
  }

	handleToggleLabel = () =>{
		this.setState((prevState, props) => ({labeled: !prevState.labeled}))
	}
	handleAddClick = () =>{
		this.setState((prevState, props) => {
			return {adding: !prevState.adding, focusing: "", category: "Others"};
		});
	}

	/* ==================== chose category ==================== */
	handleCategorySelect = category =>{
			this.setState({ category: category, annotations:[] })
	}
	/* ==================== undo/redo ==================== */
	handleUndo = () =>{
		if(this.UndoRedoState.previous.length===0)
			return;
		this.setState((prevState, props) => {
			const state = this.UndoRedoState.undo(prevState);
			return {...state};
		})
	}
	handleRedo = () =>{
		if(this.UndoRedoState.next.length===0)
			return;
		this.setState((prevState, props) => {
			const state = this.UndoRedoState.redo(prevState);
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
		const timeNow = new Date().getTime().toString(36);
		const color = colors[getRandomInt(colors.length)];
		let {x, y} = stage.getPointerPosition();
		let vertices;
		this.setState((prevState, props) => {
			const {adding, focusing, annotations, entities, annotationWidth, annotationHeight} = prevState;
			if(!adding)
				return;
			//prevent x, y exceeding boundary
			x = x<0?0:x; x = x>annotationWidth?annotationWidth:x;
			y = y<0?0:y; y = y>annotationHeight?annotationHeight:y;
			this.UndoRedoState.save(prevState)
			//first add
			if(!focusing){
				vertices = [];
				vertices.push({id: `${timeNow}`, name: `${timeNow}`, x: x, y: y})
				entities.annotations[`${timeNow}`] = new ImageAnnotation({id: `${timeNow}`, name: `${timeNow}`, color: color, vertices: vertices})
				return { category: "Others",
								 focusing: `${timeNow}`,
								 annotations: [...annotations, `${timeNow}`],
								 entities: {...entities, ["annotations"]: entities.annotations}}
			}
			//continue add vertex
			entities.annotations[focusing].vertices.push({id: `${timeNow}`, name: `${timeNow}`, x: x, y: y})
			return { entities: {...entities, ['annotations']: entities.annotations}}
		})
	}

	handleCanvasVertexMouseDown = e =>{
		const activeVertex = e.target
		const group = activeVertex.getParent();
		this.setState((prevState, props) => {
			const {adding, focusing, entities} = prevState;
			if(adding){
				const annotations = entities.annotations;
				if(group.name()===focusing && annotations[focusing].vertices[0].name === activeVertex.name()){
					annotations[focusing].closed = true;
					return {adding: false, entities: {...entities, ['annotations']: annotations} }
				}
				return
			}
			return {focusing: group.name()}
		})
	}
	handleCanvasVertexMouseMove = e =>{}
	handleCanvasVertexDragEnd = e =>{
		const activeVertex = e.target
		const group = activeVertex.getParent();
		this.setState((prevState, props) => {
			const {adding, entities, annotationWidth, annotationHeight} = prevState;
			if(adding)
				return;
			const annotations = entities.annotations;
			let vertices = annotations[group.name()].vertices.map( v=> {
				if(v.name!==activeVertex.name())
					return v;
				//prevent x, y exceeding boundary
				let x = activeVertex.x(); let y = activeVertex.y();
				x = x<0?0:x; x = x>annotationWidth?annotationWidth:x;
				y = y<0?0:y; y = y>annotationHeight?annotationHeight:y;
				return {...v, x: x, y: y}
			});
			annotations[group.name()].vertices = vertices
			return { entities: {...entities, ['annotations']: annotations}}
		})
	}
	handleCanvasFocusing = e =>{
		const activeShape = e.target
		this.setState((prevState) => {
			if(prevState.adding)
				return;
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
	handleOptionsInputFocus = (e) => {
		this.setState({inputFocused: true})
	}
	handleOptionsInputBlur = (e) => {
		this.setState({inputFocused: false})
	}
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
			let selected = selectedIds.map(id => entities.options[id]);
			selected = selected.map(s => ({id: s.id, value: s.value }))
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

	handleSubmit = type =>{
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
		const {adding, focusing, magnifyingOpen, magnifyingPower, labeled, annotationWidth, annotationHeight, annotations, category, entities, optionRoot} = this.state
		const {url, dynamicOptions, disabledOptionLevels=[], categoryOptions=[], imageOnly} = this.props
		document.body.style.cursor = adding? 'crosshair': 'default';

		return(
			<div>
				{ !imageOnly &&
				<div className="d-flex justify-content-center pb-3">
					<ButtonGroup>
						{this.props.onPreviousClick && <Button color="secondary" onClick={ ()=>this.handleSubmit('Previous') }>Previous <small>(s)</small></Button>}
						{this.props.onNextClick && <Button color="secondary" onClick={ ()=>this.handleSubmit('Next') }>Next <small>(d)</small></Button>}
					</ButtonGroup>
				</div>
				}
				<div className="d-flex flex-wrap justify-content-around py-3" style={{background: "rgb(246, 246, 246)"}}>
					<div className="mb-3">
						{ !imageOnly &&
						<div className="mb-3 d-flex">
							<div className="d-flex mr-auto">
									<Button color="link" onClick={this.handleToggleLabel} className="label-button d-flex align-items-center"><FaCommentAlt className="pr-1" />{labeled? 'On': 'Off'}<small className="pl-1">(shift)</small></Button>
									<Dropdown isOpen={magnifyingOpen} toggle={this.handleToggleMagnifier} size="md">
										<DropdownToggle className={"mag-toggle d-flex align-items-center"} color={"link"} caret>
											<GoSearch className="pr-1" /> {magnifyingPower>1? `${magnifyingPower}X`: "Off" }
										</DropdownToggle>
										<DropdownMenu>
											<DropdownItem header className={''}>Power</DropdownItem>
											<DropdownItem className={'mag-item'} onClick={()=>this.handleClickMagnifier(1)}>Off <small>(1)</small></DropdownItem>
											<DropdownItem className={'mag-item'} onClick={()=>this.handleClickMagnifier(2)}>2X <small>(2)</small></DropdownItem>
											<DropdownItem className={'mag-item'} onClick={()=>this.handleClickMagnifier(3)}>3X <small>(3)</small></DropdownItem>
											<DropdownItem className={'mag-item'} onClick={()=>this.handleClickMagnifier(4)}>4X <small>(4)</small></DropdownItem>
										</DropdownMenu>
									</Dropdown>
							</div>
							<ButtonGroup className="">
								<Button disabled={this.UndoRedoState.previous.length==0} outline onClick={this.handleUndo}><MdUndo/> <small>(z)</small></Button>
								<Button disabled={this.UndoRedoState.next.length==0} outline onClick={this.handleRedo}><MdRedo/> <small>(x)</small></Button>
							</ButtonGroup>
						</div> }
						<div style={{position: 'relative'}}>
							<Canvas url = {url}
											width = {annotationWidth}
											height = {annotationHeight}
											adding = {adding}
											annotations= {annotations}
											entities = {entities}
											focusing = {focusing}
											power = {magnifyingPower}
											labeled = {labeled}
											onImgLoad = {this.handleCanvasImgLoad}
											onStageMouseDown = {this.handleCanvasStageMouseDown}
											onVertexMouseDown = {this.handleCanvasVertexMouseDown}
											onVertexDragEnd ={this.handleCanvasVertexDragEnd}
											onLabelMouseDown ={this.handleCanvasFocusing}
											onLineMouseDown ={this.handleCanvasFocusing}
											/>
						</div>
					</div>
					{ !imageOnly &&
					<div className="mb-3">
						<div className="d-flex justify-content-between mb-3">
							<Button outline color="primary" onClick={ () => this.handleAddClick()} className="d-flex align-items-center mr-2"><MdAdd/> {adding ? 'Adding Annotation' : 'Add Annotation'}<small style={{paddingLeft: 5}}>(c)</small></Button>
							<ButtonGroup>
								{ categoryOptions.map( c =>  <Button outline active={category==c} color="info" key={c} onClick={()=>this.handleCategorySelect(c)} >{c}</Button>) }
							</ButtonGroup>
						</div>
						<List dynamicOptions = {dynamicOptions}
									disabledOptionLevels = {disabledOptionLevels}
									entities = {entities}
									optionRoot = {optionRoot}
									annotations = {annotations}
					 				focusing = {focusing}
									height = {annotationHeight}
									onListItemClick = {this.handleListItemClick}
									onListItemDelete= {this.handleListItemDelete}
									onOptionsInputFocus = {this.handleOptionsInputFocus}
									onOptionsInputBlur = {this.handleOptionsInputBlur}
									onOptionsAddOption = {this.handleOptionsAddOption}
									onOptionsSelectOption = {this.handleOptionsSelectOption}
									onOptionsDeleteOption = {this.handleOptionsDeleteOption}
						/>
				  </div>
					}
				</div>
				{ !imageOnly &&
				<div className="d-flex justify-content-center pt-3">
					{this.props.onSkipClick && <Button color="secondary" onClick={ ()=>this.handleSubmit('Skip') }>Skip <small>(a)</small></Button>}
				</div>
				}
			</div>
		)}
}
export default ImageTool;

/*
<Button outline color="primary" onClick={this.handleToggleMagnifier} className="d-flex align-items-center"><GoSearch/> {magnifying ? 'Turn Off' : 'Turn On'}</Button>
*/
