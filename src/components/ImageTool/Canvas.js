import React, {Component} from 'react';
import './styles/Canvas.css';
import { Stage, Layer, Rect, Group, Line, Text, Circle, Image, Label, Tag} from 'react-konva';
import {POLYGON, BOX} from 'models/2DImage.js';

class Canvas extends Component {
	constructor(props){
		super(props)
		this.state = {dotLength: 6, pointerPos: {x: 40, y: 40 }, scale: 2, glassLength: 40}
	}
	handleMouseOver = e =>{
			document.body.style.cursor = 'pointer';
	}
	handleMouseLeave = e =>{
		document.body.style.cursor = this.props.adding? 'crosshair': 'default';
	}
	handleMouseOut = e =>{
		document.body.style.cursor = this.props.adding? 'crosshair': 'default';
	}
	handleStageMouseOver = e =>{}
	handleStageMouseMove = e =>{
		const stage = e.target.getStage()
		const pos = stage.getPointerPosition();
		this.setState({pointerPos: {x: pos.x, y:  pos.y} })
	}
	handleFirstVertexMouseOver = e =>{
		document.body.style.cursor = 'cell';
	}
	handleVertexMouseOver = e =>{
		document.body.style.cursor = 'move';
	}
	handleVertexDragMove = e =>{
		document.body.style.cursor = 'move';
		const {annotations, entities} = this.props;
		const stage = e.target.getStage()
		const activeVertex = e.target
		const pos = stage.getPointerPosition();
		const group = activeVertex.getParent();
		const line = group.get('Line')[0];
		const ann = entities.annotations[group.name()]
		const linePoints = [];
		ann.vertices.forEach( v=> {
			if(v.name!==activeVertex.name()){
				linePoints.push(v.x); linePoints.push(v.y);
				return;
			}
			linePoints.push(activeVertex.x()); linePoints.push(activeVertex.y());
		});
		line.points(linePoints);
	}


	render() {
		const {width, height, adding, addingMessage, focusing, magnifying, annotations, entities, image, url} = this.props
		const {dotLength, pointerPos, scale, glassLength } = this.state
		const layerItems = [];


		annotations.forEach( id => {
			const color = entities.annotations[id].color;
			const colorWithOpacity = color.replace(/,1\)/, ",.3)")
			const name = entities.annotations[id].name
			const type = entities.annotations[id].type

			if(type==POLYGON){
				const vertices = [];
				const linePoints = [];
				const startPoint = {};
				const selected = entities.annotations[id].selected
				entities.annotations[id].vertices.forEach( (v, i)=>{
					const length = dotLength;
					if(i==0){
						startPoint.x = v.x;
						startPoint.y = v.y;
					}
					if(adding && focusing===name && i===0)
						vertices.push(<Circle x={v.x} y={v.y} key={v.name} name={v.name} radius={length*1.2} stroke={color} fill={colorWithOpacity} strokeWidth={1} draggable={true} dragOnTop={false} onMouseDown={this.props.onVertexMouseDown} onMouseOver={this.handleFirstVertexMouseOver} onMouseOut={this.handleMouseOut} />)
					else
						vertices.push(<Rect offsetX={length/2} offsetY={length/2} x={v.x} y={v.y} key={v.name} name={v.name} stroke={color} fill={color} strokeWidth={0} width={length} height={length} draggable={true} dragOnTop={false} onMouseDown={this.props.onVertexMouseDown} onMouseOver={this.handleVertexMouseOver} onMouseOut={this.handleMouseOut} onDragEnd={this.props.onVertexDragEnd} onDragMove={this.handleVertexDragMove} />)
					linePoints.push(v.x); linePoints.push(v.y);
				})
				const label = <Label offsetY={10} x={startPoint.x} y={startPoint.y} onMouseDown={this.props.onLabelMouseDown} onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave} onMouseOut={this.handleMouseOut}>
												<Tag  name={name} fill={'#000'} opacity={.4} pointerDirection={'down'} pointerWidth={10} pointerHeight={10} lineJoin={'round'}></Tag>
												<Text name={name} padding={5} fontFamily={'Calibri'} text={selected.length>0? `${selected[selected.length-1].value}` : `Not selected`} fontSize={16} lineHeight={1.2} fill={'#fff'} ></Text>
											</Label>
				const line = <Line name={name} points={linePoints} closed={ !adding || focusing!==name } fill={ focusing===name? colorWithOpacity:""} stroke={color} strokeWidth={1} lineCap={'round'} lineJoin={"round"} onMouseDown={this.props.onLineMouseDown} onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave} onMouseOut={this.handleMouseOut}/>
				layerItems.push(<Group key={name} name={name} >{line}{vertices}{label}</Group>)
				return;
			}
		});

		return(
						<div>
							<img ref={ image => this.image = image}
									 width={width}
									 style={{visibility: "hidden"}}
									 onLoad={this.props.onImgLoad}
									 src={url}
									 />
							<Stage width={width} height={height} className="konva-wrapper" onMouseOver={this.handleStageMouseOver} onMouseDown={this.props.onStageMouseDown} onMouseMove={this.handleStageMouseMove}>
							<Layer><Image image={this.image} width={width} height={height} />{layerItems}</Layer>
              {magnifying &&
								 <Layer offsetX={pointerPos.x/scale} offsetY={pointerPos.y/scale} clipX={pointerPos.x-glassLength/2} clipY={pointerPos.y-glassLength/2} clipWidth={glassLength} clipHeight={glassLength} scaleX={scale} scaleY={scale}>
									 <Image image={this.image} width={width} height={height} />{layerItems}
								 </Layer>}
							</Stage>
						</div>
					);
	}
}
export default Canvas;
