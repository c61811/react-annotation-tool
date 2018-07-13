import React, {Component} from 'react';
import {Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

class Form extends Component {
	constructor(props){
		super(props)
	}
	handleSubmit = () =>{
		this.props.onFormSubmit()
	}
  render(){
		const { mturk, mturkAction, mturkAssignmentId, objects } = this.props

		if (!mturk) {
	    return <Button onClick={this.handleSubmit} size="lg">Submit</Button>;
	  }

		return (
			<form method="POST" action={action}>
				<input type="hidden" id="assignmentId" name="assignmentId" value={assignmentId}/>
				<input type="hidden" id="objects" name="objects" value={JSON.stringify(objects)}/>
				<Button size="lg">Submit this hit</Button>
			</form>
		  );
  }
}
export default Form;
