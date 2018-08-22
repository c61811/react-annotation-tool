import React, {Component} from 'react';
import './styles/Canvas.css';
import { Stage, Layer, Rect, Group, Line, Text} from 'react-konva';
import {POLYGON, BOX} from 'models/2DImage.js';

class Canvas extends Component {
	constructor(props){
		super(props)
		this.state = {dotLength: 6}
	}




	render() {
		const {width, height, adding, addingMessage, annotations} = this.props
		const { dotLength } = this.state
		const layerItems = [];


		annotations.forEach( ann => {
			if(ann.type==POLYGON){
				const {color} = ann;
				const vertices = [];
				const linePoints = [];
				ann.vertices.forEach( v=>{
					vertices.push(<Rect offsetX={dotLength/2} offsetY={dotLength/2} x={v.x} y={v.y} key={v.x+'-'+v.y} name={v.x+'-'+v.y} stroke={color} fill={color} strokeWidth={0} width={dotLength} height={dotLength} draggable={true} dragOnTop={false} onMouseDown={this.props.onCanvasPolyVertexMouseDown} />)
					linePoints.push(v.x); linePoints.push(v.y);
				})
				const line = <Line points={linePoints} stroke={color} strokeWidth={1} lineCap={'round'} lineJoin={"round"} />
				layerItems.push(<Group key={name} name={name} draggable={true} >{vertices}{line}</Group>)
				return;
			}



		});



		return(
						<Stage width={width} height={height} className="canvas-wrapper" onMouseDown={this.props.onCanvasStageMouseDown}>
							 {adding && <Layer><Rect fill={'#ffffff'} width={width} height={height} opacity={.3} /><Text y={height/2} width={width} text={addingMessage} align={'center'} fontSize={16} fill={'#fff'} /></Layer>}
							 <Layer>{layerItems}</Layer>
				    </Stage>
					);
	}
}
export default Canvas;

/*
			const {x, y, width, height} = ann


			const fill = (focusing===anno.name)? anno.color.replace(/,1\)/, ",.3)"): ""
			const rect = <Rect x={0} y={0} fill={fill} width={width} height={height} stroke={anno.color} strokeWidth={1}/>
			const name = <Text offsetY={20} x={0} y={0} fontFamily={'Calibri'} text={`${anno.id}`} fontSize={16} lineHeight={1.2} fill={'#fff'} ></Text>
			let dots = []
			dots.push(<Rect offsetX={dotLength/2} offsetY={dotLength/2} x={0} y={0} key={'topLeft'} name={'topLeft'} stroke={anno.color} fill={anno.color} strokeWidth={0} width={dotLength} height={dotLength} draggable={true} dragOnTop={false} onDragMove={this.handleDotDragMove} onMouseDown={this.handleDotMouseDown} onDragEnd={this.handleDotDragEnd} onMouseOver={this.handleDotMouseOver} onMouseOut={this.handleDotMouseOut}  />)
			dots.push(<Rect offsetX={dotLength/2} offsetY={dotLength/2} x={width} y={0} key={'topRight'} name={'topRight'} stroke={anno.color} fill={anno.color} strokeWidth={0} width={dotLength} height={dotLength} draggable={true} dragOnTop={false} onDragMove={this.handleDotDragMove} onMouseDown={this.handleDotMouseDown} onDragEnd={this.handleDotDragEnd} onMouseOver={this.handleDotMouseOver} onMouseOut={this.handleDotMouseOut} />)
			dots.push(<Rect offsetX={dotLength/2} offsetY={dotLength/2} x={width} y={height} key={'bottomRight'} name={'bottomRight'} stroke={anno.color} fill={anno.color} strokeWidth={0} width={dotLength} height={dotLength} draggable={true} dragOnTop={false} onDragMove={this.handleDotDragMove} onMouseDown={this.handleDotMouseDown} onDragEnd={this.handleDotDragEnd} onMouseOver={this.handleDotMouseOver} onMouseOut={this.handleDotMouseOut} />)
			dots.push(<Rect offsetX={dotLength/2} offsetY={dotLength/2} x={0} y={height} key={'bottomLeft'} name={'bottomLeft'} stroke={anno.color} fill={anno.color} strokeWidth={0} width={dotLength} height={dotLength} draggable={true} dragOnTop={false} onDragMove={this.handleDotDragMove} onMouseDown={this.handleDotMouseDown} onDragEnd={this.handleDotDragEnd} onMouseOver={this.handleDotMouseOver} onMouseOut={this.handleDotMouseOut} />)
			dots.push(<Rect offsetX={dotLength/2} offsetY={dotLength/2} x={width/2} y={0} key={'top'} name={'top'} stroke={anno.color} fill={anno.color} strokeWidth={0} width={dotLength} height={dotLength} draggable={true} dragOnTop={false} onDragMove={this.handleDotDragMove} onMouseDown={this.handleDotMouseDown} onDragEnd={this.handleDotDragEnd} onMouseOver={this.handleDotMouseOver} onMouseOut={this.handleDotMouseOut}  />)
			dots.push(<Rect offsetX={dotLength/2} offsetY={dotLength/2} x={0} y={height/2} key={'left'} name={'left'} stroke={anno.color} fill={anno.color} strokeWidth={0} width={dotLength} height={dotLength} draggable={true} dragOnTop={false} onDragMove={this.handleDotDragMove} onMouseDown={this.handleDotMouseDown} onDragEnd={this.handleDotDragEnd} onMouseOver={this.handleDotMouseOver} onMouseOut={this.handleDotMouseOut} />)
			dots.push(<Rect offsetX={dotLength/2} offsetY={dotLength/2} x={width} y={height/2} key={'right'} name={'right'} stroke={anno.color} fill={anno.color} strokeWidth={0} width={dotLength} height={dotLength} draggable={true} dragOnTop={false} onDragMove={this.handleDotDragMove} onMouseDown={this.handleDotMouseDown} onDragEnd={this.handleDotDragEnd} onMouseOver={this.handleDotMouseOver} onMouseOut={this.handleDotMouseOut} />)
			dots.push(<Rect offsetX={dotLength/2} offsetY={dotLength/2} x={width/2} y={height} key={'bottom'} name={'bottom'} stroke={anno.color} fill={anno.color} strokeWidth={0} width={dotLength} height={dotLength} draggable={true} dragOnTop={false} onDragMove={this.handleDotDragMove} onMouseDown={this.handleDotMouseDown} onDragEnd={this.handleDotDragEnd} onMouseOver={this.handleDotMouseOver} onMouseOut={this.handleDotMouseOut} />)

			layerItems.push(<Group x={x} y={y} key={anno.name} name={anno.name} draggable={true} onDragMove={this.handle} onMouseDown={this.handleGroupMouseDown} onDragEnd={this.handleGroupDragEnd} onDragStart={this.handleGroupDragStart} onDragMove={this.handleGroupDragMove}>{name}{rect}{dots}</Group>)
*/
