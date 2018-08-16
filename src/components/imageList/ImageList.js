import React, {Component} from 'react';
import Duration from '../player/Duration'
import {Rounding} from '../../helper.js'
import 'bootstrap/dist/css/bootstrap.css';
import { Button, ButtonGroup, ListGroup, ListGroupItem, Collapse} from 'reactstrap';
import { Events, scrollSpy, scroller} from 'react-scroll'
import MdDelete from 'react-icons/lib/md/delete';
import MdAdd from 'react-icons/lib/md/add';
import MdHighlightRemove from 'react-icons/lib/md/highlight-remove';
import FaChevronDown from 'react-icons/lib/fa/chevron-down';
import FaChevronUp from 'react-icons/lib/fa/chevron-up';
import IoEyeDisabled from 'react-icons/lib/io/eye-disabled';
import IoEye from 'react-icons/lib/io/eye';
import FaArrowDown from 'react-icons/lib/fa/arrow-down';
import DynamicOptions from '../dynamicOptions/DynamicOptions'


import {SPLIT, HIDE, SHOW} from '../../models/2DVideo.js';
import './ImageList.css';

class ImageList extends Component {

	constructor(props){
		super(props)
	}
	componentDidMount = () =>{
    Events.scrollEvent.register('begin', (to, element) => {});
    Events.scrollEvent.register('end', (to, element) => {});
    scrollSpy.update();
  }
	componentWillUnmount = () =>{
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }
	componentDidUpdate = (prevProps) => {
		const { focusing } = this.props;
	  if ( focusing && focusing !== prevProps.focusing) {
	    scroller.scrollTo(focusing, {containerId: 'list-wrapper'});
	  }
  }
	handleItemClick = name =>{
		this.props.onListItemClick(name)
	}
	handleItemDelete = name => {
		this.props.onListItemDelete(name)
  }
  render() {
		const { annotations, focusing, options } = this.props;
		const items = [];
		annotations.forEach( anno =>{
			const selectedOptionPath = anno.selectedOptionPath
			if(anno.name === focusing)
				items.unshift(<ListGroupItem className="object-item object-item-highlight" key={anno.name} name={anno.name} style={{borderColor: anno.color.replace(/,1\)/, ",.3)")}}>
														 <div className="d-flex align-items-center">
																<h5 className="object-item-title mr-auto">Box {anno.id}: {selectedOptionPath.length>0?`${selectedOptionPath[selectedOptionPath.length-1].name}` : "not selected" } </h5>
																<Button className="d-flex align-items-center object-item-delete" color="link" onClick={()=>{this.handleItemDelete(anno.name)}}><MdDelete/></Button>
															</div>
															<DynamicOptions options={options}
																							selected = {anno.selectedOptionPath}
																							values = {anno.optionInputValues}
																							name = {anno.name}
																							onAddOption={this.props.onOptionsAddOption}
																							onInputChange={this.props.onOptionsInputChange}
																							onSelectOption={this.props.onOptionsSelectOption}
																							onDeleteOption={this.props.onOptionsDeleteOption} />
											</ListGroupItem>)
			else
				items.unshift(<ListGroupItem className="object-item" key={anno.name} name={anno.name} onClick={()=>this.handleItemClick(anno.name)} action>
													 <div className="d-flex w-100 justify-content-between align-items-center">
															<div>Box {anno.id}: {selectedOptionPath.length>0?`${selectedOptionPath[selectedOptionPath.length-1].name}` : "not selected" }</div>
													 </div>
										  </ListGroupItem>)
		})
		if(items.length ==0)
			return (<div className="d-flex align-items-center justify-content-center">Use <Button disabled outline color="primary" onClick={this.handleAddObject} className="d-flex align-items-center explanation-add-button"><MdAdd/> Add Box</Button> button above to add a box to annotate</div>)
    return (
			<div>
				<ListGroup className="list-wrapper" id="list-wrapper">{items}</ListGroup>
			</div>
		);
  }
}
export default ImageList;
