import React, { Component } from 'react';
import {colors, getRandomInt} from './helper.js';
import Image from 'components/ImageTool/Image';
import Canvas from 'components/ImageTool/Canvas';
import List from 'components/ImageTool/List';
import {ImageAnnotation, POLYGON, BOX} from 'models/2DImage.js';
import {UndoRedo} from 'models/UndoRedo.js';
import {Button} from 'reactstrap';
import MdAdd from 'react-icons/lib/md/add';



class ImageTool extends Component {
	constructor(props) {
    super(props);
		this.state = { adding: false, addingType: "", addingMessage: "", focusing: "",
								   annotationScaleFactor: 1, annotationHeight: 0, annotationWidth: props.annotationWidth || 0, annotations: props.annotations || [],
								   category: props.category || "", options: props.options || {} }
		this.UndoRedo = new UndoRedo();
		//this.Image = new Image();
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
  }
	handleAddPolyClick = () =>{
		this.setState((prevState, props) => {
			return {adding: !prevState.adding, addingType: (!prevState.adding?POLYGON:""), addingMessage: (!prevState.adding?"Click here to add a new polygon":""), focusing: "", category: "Others"};
		});
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
		const timeNow = new Date().getTime()
		const name = timeNow.toString(36);
		const color = colors[getRandomInt(timeNow%colors.length)];
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
					vertices.push({name: `${name}`, x: x, y: y})
					return { category: "Others",
									 focusing: `${name}`,
									 annotations: [...annotations,
																 new ImageAnnotation({id: `${name}`, name: `${name}`, type: POLYGON, color: color, vertices: vertices})]};
				}
				//continue
				const ann = annotations.find( ann => {
					return ann.name == focusing
				});


				//??????
				//if(x!=ann.vertices[0].x || y!=ann.vertices[0].y){
				return { annotations: annotations.map( ann =>{
																												if(ann.name !== focusing)
																													return ann;
																													vertices = ann.vertices;
																													vertices.push({name: `${name}`, x: x, y: y})
																												return { ...ann, vertices: vertices};
																											})}
				//}


				//return;
			}
			// handle box
			if(addingType==BOX){
				return;
			}



		})


/*
		const {addingType, focusing} = this.state
		if(!this.state.adding)
			return;
		const stage = e.target.getStage();
		const position = stage.getPointerPosition();
		const timeNow = new Date().getTime()
		const name = timeNow.toString(36);
		const color = colors[getRandomInt(timeNow%colors.length)];
		// handle poly
		if(addingType==POLYGON){
			//first add
			if(!focusing){
				this.setState((prevState, props) => {
					const vertices = [];
					vertices.push({x: position.x, y: position.y})
					return { category: "Others",
									 focusing: `${name}`,
									 annotations: [...prevState.annotations,
					 											 new ImageAnnotation({id: `${name}`, name: `${name}`, color: color, vertices: vertices})]};
				})
				return;
			}
			//continue

			this.setState((prevState, props) => {
					const ann = prevState.annotations.find( anno => {
						return anno.name == focusing
					});


							const vertices = [];
							vertices.push({x: position.x, y: position.y})
							return { category: "Others",
											 adding: !prevState.adding,
											 focusing: `${name}`,
											 annotations: [...prevState.annotations,
							 											 new ImageAnnotation({id: `${name}`, name: `${name}`, color: color, vertices: vertices})]};
							})



			return;
		}
		// handle box
		if(addingType==BOX){
			return;
		}
    // handle box

		this.setState((prevState, props) => {
			const {options} = prevState
			return { category: "Others",
							 adding: !prevState.adding,
							 counter: prevState.counter+1,
							 focusing: `${name}`,
							 annotations: [...prevState.annotations,
														new ImageAnnotation({id: `${name}`, name: `${name}`, color: color, x: position.x, y: position.y, height: 1, width: 1, options})]};
		});*/
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

	render() {
		const {adding, addingMessage, focusing, annotationWidth, annotationHeight, annotations, options, category} = this.state
		const {url} = this.props
		return(
			<div>
			<div className="d-flex justify-content-center pb-5">
				<Button disabled={!category} color="primary">Next</Button>
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
										onImgLoad = {this.handleCanvasImgLoad}
										onStageMouseDown = {this.handleCanvasStageMouseDown}
										onVertexMouseDown = {this.handleCanvasVertexMouseDown}
										onVertexDragEnd ={this.handleCanvasVertexDragEnd}
										/>

					</div>
				</div>
				<div>
					<div className="d-flex justify-content-between mb-3">
						<Button outline color="primary" onClick={this.handleAddPolyClick} className="d-flex align-items-center"><MdAdd/> {adding ? 'Adding Polygon' : 'Add ploygon'}</Button>
					</div>
					<List annotations= {annotations}
				 				focusing = {focusing}
								onListItemClick = {this.handleListItemClick}
								onListItemDelete= {this.handleListItemDelete}
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
