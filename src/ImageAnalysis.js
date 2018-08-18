import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Collapse} from 'reactstrap';
import { Form, FormGroup, Input, ButtonGroup, Button } from 'reactstrap';
import {colors, getRandomInt} from './helper.js';
import Canvas from './components/imageAnalysis/Canvas';
import List from './components/imageAnalysis/List';
import MdAdd from 'react-icons/lib/md/add';
import {UndoRedo} from './models/UndoRedo.js';
import {ImageAnnotation} from './models/2DImage.js';

class ImageAnalysis extends Component {
	constructor(props) {
    super(props);
		this.state={ adding: false, focusing: "", counter: 0, annotationScaleFactor: 1, annotationHeight: 0, annotationWidth: props.annotationWidth || 0, tasks: props.tasks }
		this.UndoRedo = new UndoRedo();
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

	/* ==================== canvas ==================== */

  /* ==================== chose category ==================== */

	/* ==================== list ==================== */

	/* ==================== options ==================== */


  /* ==================== submit ==================== */

	render() {
		const {annotationWidth, annotationHeight, tasks} = this.state
		const {url} = this.props
		const canvas = []
		const list = []

		for(let t of tasks){
			canvas.push( <Canvas key = {t.id}
													 width = {annotationWidth}
												   height = {annotationHeight}
													 color = {t.color}
													 annotations = {t.annotations}
									 />)
			list.push(<div key={t.id} className="py-3">
									<div>{t.annotator}: {t.category}</div>
									<List color = {t.color} annotations= {t.annotations} />
								</div>)
		}




		return(
			<div>
				<div className="d-flex flex-wrap px-5 justify-content-around">
					<div className="d-flex justify-content-center">
						<div style={{position: 'relative'}}>
							<img
								 width={annotationWidth}
								 className=""
								 onLoad={this.handleImgLoad}
								 src={url} />
							 {canvas}
						</div>
					</div>
					<div className="px-3">
						{list}
					</div>
				</div>
			</div>
		)}
}
export default ImageAnalysis;

/*

<Canvas width = {annotationWidth}
				height = {annotationHeight}
				annotations = {annotations}
			 />

<div>
	<div className="d-flex justify-content-between mb-3">
		<ButtonGroup>
			<Button outline active={category=="No PII"} color="info" onClick={()=>this.handleCategorySelect("No PII")} >No PII</Button>
			<Button outline active={category=="Blurry"} color="info" onClick={()=>this.handleCategorySelect("Blurry")} >Blurry</Button>
			<Button outline active={category=="Suspicious"} color="info" onClick={()=>this.handleCategorySelect("Suspicious")} >Suspicious</Button>
		</ButtonGroup>
	</div>
	<List annotations= {annotations}
				focusing = {focusing}
				options = {options}
				onListItemClick = {this.handleListItemClick}
				onListItemDelete= {this.handleListItemDelete}
				onOptionsAddOption = {this.handleOptionsAddOption}
				onOptionsInputChange = {this.handleOptionsInputChange}
				onOptionsSelectOption = {this.handleOptionsSelectOption}
				onOptionsDeleteOption = {this.handleOptionsDeleteOption}
		/>
</div>

*/
