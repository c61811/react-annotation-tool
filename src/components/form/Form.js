import React, {Component} from 'react';
import {Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

class Form extends Component {

	constructor(props){
		super(props)
	}
  render(){
		const { action, assignmentId, objects } = this.props
		return (
			<form method="POST" action={action}>
				<input type="hidden" id="assignmentId" name="assignmentId" value={assignmentId}/>
				<input type="hidden" id="objects" name="objects" value={JSON.stringify(objects)}/>
				<Button>Submit</Button>
			</form>
		  );
  }
}
export default Form;
