import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Collapse} from 'reactstrap';
import { Form, FormGroup, Input, Button, Label } from 'reactstrap';

import { MdDelete } from 'react-icons/md';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/Options.css'

class Options extends Component {
	constructor(props) {
    super(props);
		this.state = { collapse: {} };
  }

	handleSelect = (key, annotationName, _parents, canBeSelected) => {
		this.setState( prevState => {
			return { collapse: {...prevState.collapse, [key]: !prevState.collapse[key] }};
		}, ()=>{
			if(canBeSelected)
				this.props.onSelectOption(annotationName, _parents)
		})
	}

	//build item
	buildList = (options, parents, level=1) => {
		const {values, selected, annotationName, dynamicOptions, disabledLevels} = this.props;
		const items = [];
		const id = parents[parents.length-1].id;
		for( let key of Object.keys(options)){
			const option = options[key]
			const _children = option.children;
			const _parents = parents.slice()
			_parents.push({id: option.id, value: option.value})
			const itemStyle = {paddingLeft: 20*level}

			const children = this.buildList(_children, _parents, level+1);
			if(selected.length>0 && option.id===selected[selected.length-1].id)
				itemStyle = {...itemStyle, background: '#e4e4e4'}
			items.push(<ListGroupItem key={option.id} style={itemStyle}>
										<div className="d-flex align-items-center">
											<div className="d-flex align-items-center option-list-collapse-button mr-auto" onClick={ ()=>{this.handleSelect(key, annotationName, _parents, !disabledLevels.includes(level))}}>
												{Object.keys(_children).length!==0 && this.state.collapse[key] && <FaChevronDown/>}
												{Object.keys(_children).length!==0 && !this.state.collapse[key] && <FaChevronRight/>}
												{option.value}
											</div>
											{ dynamicOptions && <Button className="" color="link" onClick={()=> this.props.onDeleteOption(_parents)}><MdDelete/></Button> }
										</div>
								 </ListGroupItem>)
			items.push(<Collapse key={option.id+"-children"} isOpen={this.state.collapse[key]}>{children}</Collapse>)
		}
		if(dynamicOptions){
			const form = <ListGroupItem key={id+"-new"} style={{paddingLeft: 20*level}}>
										 <Form inline onSubmit={ e =>{this.props.onAddOption(e, annotationName, parents)}} >
											 <Input className="mr-sm-2" type="text" name={id} value={values[id]} onChange={e => this.props.onInputChange(annotationName, e)} /><Input type="submit" value="Submit" className="my-2 my-sm-0"/>
										 </Form>
									 </ListGroupItem>
			items.push(form)
		}
		return <ListGroup className="option-list-ul">{items}</ListGroup>;
	}

	render() {
		const {options} = this.props;
		const list = this.buildList(options, [{id: -1, name: "root"}]);
		return(
			<div className="px-3">
					{list}
			</div>
	)}

}
export default Options;
