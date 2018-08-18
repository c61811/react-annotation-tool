import React, {Component} from 'react';
import Duration from '../player/Duration'
import {Rounding} from '../../helper.js'
import 'bootstrap/dist/css/bootstrap.css';
import { Button, ButtonGroup, ListGroup, ListGroupItem, Collapse} from 'reactstrap';
import './styles/List.css';

class List extends Component {

	constructor(props){
		super(props)
	}
	componentDidMount = () =>{
  }
	componentWillUnmount = () =>{

  }
	componentDidUpdate = (prevProps) => {
  }

  render() {
		const { annotations, color } = this.props;
		const items = [];
		annotations.forEach( anno =>{
			const selectedOptionPath = anno.selectedOptionPath.map(p=>p.name).join('->')
			items.unshift(<ListGroupItem className="object-item" key={anno.name} name={anno.name} style={{borderColor: color.replace(/,1\)/, ",.3)")}} action>
												 <div className="d-flex w-100 justify-content-between align-items-center">
														<div>Box {anno.id}: {selectedOptionPath.length>0?`${selectedOptionPath}` : "not selected" }</div>
												 </div>
									  </ListGroupItem>)
		})
    return (
			<div>
				<ListGroup className="list-wrapper" id="list-wrapper">{items}</ListGroup>
			</div>
		);
  }
}
export default List;
