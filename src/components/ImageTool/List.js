import React, {Component} from 'react';
import Duration from './Duration'
import Options from './Options'
import {Rounding} from '../../helper.js'
import 'bootstrap/dist/css/bootstrap.css';
import { Button, ButtonGroup, ListGroup, ListGroupItem, Collapse} from 'reactstrap';
import { Events, scrollSpy, scroller} from 'react-scroll'
import {MdDelete, MdAdd, MdHighlightRemove} from 'react-icons/md';
import {FaChevronDown, FaChevronUp, FaArrowDown} from 'react-icons/fa';
import {IoEyeDisabled, IoEye} from 'react-icons/io';



import './styles/List.css';

class List extends Component {

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
		const { annotations, focusing, options, dynamicOptions, disabledOptionLevels } = this.props;
		const items = [];
		annotations.forEach( ann =>{
			const selectedOptionPath = ann.selectedOptionPath
			if(ann.name === focusing)
				items.unshift(<ListGroupItem className="object-item object-item-highlight" key={ann.name} name={ann.name} style={{borderColor: ann.color.replace(/,1\)/, ",.3)")}}>
														 <div className="d-flex align-items-center">
																<h5 className="object-item-title mr-auto">{selectedOptionPath.length>0?`${selectedOptionPath[selectedOptionPath.length-1].value}` : "Not selected" } </h5>
																<Button className="d-flex align-items-center object-item-delete" color="link" onClick={()=>{this.handleItemDelete(ann.name)}}><MdDelete/></Button>
															</div>
															<Options dynamicOptions={dynamicOptions}
																			 options={options}
																			 disabledLevels={disabledOptionLevels}
																			 selected = {ann.selectedOptionPath}
																			 values = {ann.optionInputValues}
																			 annotationName = {ann.name}
																			 onAddOption={this.props.onOptionsAddOption}
																			 onInputChange={this.props.onOptionsInputChange}
																			 onSelectOption={this.props.onOptionsSelectOption}
																			 onDeleteOption={this.props.onOptionsDeleteOption} />
											</ListGroupItem>)
			else
				items.unshift(<ListGroupItem className="object-item" key={ann.name} name={ann.name} onClick={()=>this.handleItemClick(ann.name)} action>
													 <div className="d-flex w-100 justify-content-between align-items-center">
															<div>{selectedOptionPath.length>0?`${selectedOptionPath[selectedOptionPath.length-1].value}` : "Not selected" }</div>
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
export default List;
