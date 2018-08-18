import React, {Component} from 'react';
import './styles/Canvas.css';
import { Stage, Layer, Rect, Group, Text} from 'react-konva';

class Canvas extends Component {
	constructor(props){
		super(props)
		this.state = {dotLength: 6}
	}

	handle = e => {} //for testing

	render() {
		const { height, width, annotations, color} = this.props;
		const { dotLength } = this.state
		const layerItems = [];
		annotations.slice().reverse().forEach( anno => {

			const {x, y, width, height} = anno
			const rect = <Rect x={0} y={0} width={width} height={height} stroke={color} strokeWidth={1}/>
			const name = <Text offsetY={20} x={0} y={0} fontFamily={'Calibri'} text={anno.selectedOptionPath.length>0? `${anno.id} ${anno.selectedOptionPath[anno.selectedOptionPath.length-1].name}` : `${anno.id} not selected`} fontSize={16} lineHeight={1.2} fill={'#fff'} ></Text>
			let dots = []
			dots.push(<Rect offsetX={dotLength/2} offsetY={dotLength/2} x={0} y={0} key={'topLeft'} name={'topLeft'} stroke={color} fill={color} strokeWidth={0} width={dotLength} height={dotLength} draggable={true} dragOnTop={false}  />)
			dots.push(<Rect offsetX={dotLength/2} offsetY={dotLength/2} x={width} y={0} key={'topRight'} name={'topRight'} stroke={color} fill={color} strokeWidth={0} width={dotLength} height={dotLength} draggable={true} dragOnTop={false}  />)
			dots.push(<Rect offsetX={dotLength/2} offsetY={dotLength/2} x={width} y={height} key={'bottomRight'} name={'bottomRight'} stroke={color} fill={color} strokeWidth={0} width={dotLength} height={dotLength} draggable={true} dragOnTop={false}  />)
			dots.push(<Rect offsetX={dotLength/2} offsetY={dotLength/2} x={0} y={height} key={'bottomLeft'} name={'bottomLeft'} stroke={color} fill={color} strokeWidth={0} width={dotLength} height={dotLength} draggable={true} dragOnTop={false}  />)
			dots.push(<Rect offsetX={dotLength/2} offsetY={dotLength/2} x={width/2} y={0} key={'top'} name={'top'} stroke={color} fill={color} strokeWidth={0} width={dotLength} height={dotLength} draggable={true} dragOnTop={false}   />)
			dots.push(<Rect offsetX={dotLength/2} offsetY={dotLength/2} x={0} y={height/2} key={'left'} name={'left'} stroke={color} fill={color} strokeWidth={0} width={dotLength} height={dotLength} draggable={true} dragOnTop={false}  />)
			dots.push(<Rect offsetX={dotLength/2} offsetY={dotLength/2} x={width} y={height/2} key={'right'} name={'right'} stroke={color} fill={color} strokeWidth={0} width={dotLength} height={dotLength} draggable={true} dragOnTop={false}  />)
			dots.push(<Rect offsetX={dotLength/2} offsetY={dotLength/2} x={width/2} y={height} key={'bottom'} name={'bottom'} stroke={color} fill={color} strokeWidth={0} width={dotLength} height={dotLength} draggable={true} dragOnTop={false}  />)
			layerItems.push(<Group x={x} y={y} key={anno.name} name={anno.name}>{name}{rect}{dots}</Group>)


		});
		return(
						<Stage width={width} height={height} className="konva-wrapper" >
							 <Layer>{layerItems}</Layer>
				    </Stage>
					);
	}
}
export default Canvas;
