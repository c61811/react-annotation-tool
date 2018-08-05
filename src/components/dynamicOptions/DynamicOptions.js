import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Collapse} from 'reactstrap';
import { Form, FormGroup, Input, Button } from 'reactstrap';

import FaChevronRight from 'react-icons/lib/fa/chevron-right';
import FaChevronDown from 'react-icons/lib/fa/chevron-down';
import MdDelete from 'react-icons/lib/md/delete';
import 'bootstrap/dist/css/bootstrap.css';
import './DynamicOptions.css'

class DynamicOptions extends Component {
	constructor(props) {
    super(props);
		this.state = {labels: { '1a':{id: '1a', name: "Asgard group", children: {
															 '2a':{id: '2a', name: "DP group 123", children: {
																		'3':{id: '3', name: "Candidatus Heimdallarchaeota", children: {
																			'4':{id: '4', name: "A", children: {}},
																			'5':{id: '5', name: "B", children: {}},
																			'6':{id: '6', name: "B", children: {}},
																		}},
																		'7':{id: '7', name: "Candidatus Lokiarchaeota", children: {}},
																		'8':{id: '8', name: "Candidatus Odinarchaeota", children: {}},
																		'9':{id: '9', name: "Thorarchaeota", children: {}}
																}},
																'10':{id: '10', name: "DPANN group", children: {
 																		'11':{id: '11', name: "Candidatus Heimdallarchaeota", children: {
 																			'12':{id: '12', name: "A", children: {}},
 																			'13':{id: '13', name: "B", children: {}},
 																			'14':{id: '14', name: "B", children: {}},
 																		}},
 																		'17':{id: '17', name: "Candidatus Lokiarchaeota", children: {}},
 																		'18':{id: '18', name: "Candidatus Odinarchaeota", children: {}},
 																		'19':{id: '19', name: "Thorarchaeota", children: {}}
 																}},
														 }},
													 	 '22a':{id: '22a', name: "DPANN group", children: {}},
														 '23a':{id: '23a', name: "Candidatus Parvarchaeota", children: {}},
														 '24a':{id: '24a', name: "Candidatus Woesearchaeota", children: {}},
	 												 },
									values: {}, isOpen: {}, selected: []};
  }
	handleNewSubmit = (parents) => {
		event.preventDefault();
		this.setState((prevState) => {
			let {values, labels}  = prevState
			labels = this.addNewItem(labels, values, parents, 0);
		  return {labels: labels};
		});

  }
	addNewItem = (children, values, parents, i) =>{
		if(i===parents.length-1){
			const id = Date.now().toString();
			children[id] = { id: id, name: values[parents[i]], children: {}}
			return children;
		}
		children[parents[i+1]].children =  this.addNewItem(children[parents[i+1]].children, values, parents, i+1);
		return children;
	}

	handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
		this.setState((prevState) => {
			const values = {...prevState.values, [name]: value}
		  return {values: values};
		});
  }


	//select item
	handleSelectItem = (parents) =>{

		this.setState((prevState) => {
			const {labels, isOpen} = prevState
			this.selectItemDFS(labels, isOpen, parents)
		  return {labels: labels, isOpen: isOpen, selected: parents};
		});
	}
	selectItemDFS = (labels, isOpen, parents) => {
		if(Object.keys(labels).length==0)
			return;
		for(let key of Object.keys(labels)){
			isOpen[key] = parents.indexOf(key) != -1;
			this.selectItemDFS(labels[key].children, isOpen, parents);
		}
	}


	//delete item
	handleDeleteItem = (parents) =>{
		this.setState((prevState) => {
			let {labels, isOpen, values } = prevState
			labels = this.deleteChild(labels, isOpen, values, parents, 1);
		  return {labels: labels, isOpen: isOpen, values: values};
		});
	}
	deleteChild = (children, isOpen, values, parents, i) =>{
		if(i===parents.length-1){
			delete children[parents[i]];
			return children;
		}
		children[parents[i]].children = this.deleteChild( children[parents[i]].children, isOpen, values, parents, i+1);
		return children;
	}

	//build item
	buildList = (labels, parents, level=1) => {
		const { isOpen, values, selected} = this.state;
		const items = [];
		const id = parents[parents.length-1];
		for( let key of Object.keys(labels)){
			const label = labels[key]
			const _children = label.children;
			const _parents = parents.slice()
			_parents.push(label.id)
			const children = this.buildList(_children, _parents, level+1);
			const itemStyle = {paddingLeft: 20*level}
			if(label.id===selected[selected.length-1])
				itemStyle = {...itemStyle, background: '#e4e4e4'}
			items.push(<ListGroupItem key={label.id} style={itemStyle}>
										<div className="d-flex align-items-center">
											<div className="d-flex align-items-center label-list-collapse-button mr-auto" onClick={()=> this.handleSelectItem(_parents)}> {isOpen[label.id]||false? <FaChevronDown/>:<FaChevronRight/>} {label.name}</div>
											<Button className="" color="link" onClick={()=> this.handleDeleteItem(_parents)}><MdDelete/></Button>
										</div>
								 </ListGroupItem>)
			items.push(<Collapse key={label.id+"-children"} isOpen={isOpen[label.id]||false}>{children}</Collapse>)
		}
		const form = <ListGroupItem key={id+"-new"} style={{paddingLeft: 20*level}}>
									 <Form inline>
										 <Input className="mr-sm-2" type="text" name={id} value={values[id]} onChange={this.handleInputChange} /><Button outline className="my-2 my-sm-0" onClick={()=>{this.handleNewSubmit(parents)}}>New</Button>
									 </Form>
								 </ListGroupItem>
		items.push(form)
		return <ListGroup className="label-list-ul">{items}</ListGroup>;
	}

	render() {
		const {labels} = this.state;
		const list = this.buildList(labels, [-1]);
		return(
			<div className="px-3">
					{list}
			</div>
	)}

}
export default DynamicOptions;
