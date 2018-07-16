import React, {Component} from 'react';
import {Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

class Form extends Component {
	constructor(props){
		super(props)
	}
	handleConfirmToSubmit = () =>{
		this.props.onFormConfirmToSubmit()
	}

	handleCancelSubmission = () =>{
		this.props.onFormCancelSubmission()
	}

  render(){
		const { mturk, mturkAction, mturkAssignmentId, objects, submitted, height } = this.props
		let submitButton
		if (!mturk)
	    submitButton = <Button onClick={this.handleSubmit}>Everything is great, submit it!</Button>;
	  else
			submitButton = <form method="POST" action={action}>
												<input type="hidden" id="assignmentId" name="assignmentId" value={assignmentId}/>
												<input type="hidden" id="objects" name="objects" value={JSON.stringify(objects)}/>
												<Button>Everything is great, submit it!</Button>
											</form>

		return (
			<div className="d-flex align-items-center justify-content-center text-center" style={{height: height-60}}>
				<div>
					<div>The video is replaying</div>
					<div className="mb-3">Make sure all the bounding boxes are <b className="text-danger">PRECISELY</b> bound the cells</div>
					<div>
						<Button color="primary" onClick={this.handleCancelSubmission}>I want to adjust some boxes</Button> {submitButton}
					</div>
				</div>
			</div>

		  );
  }
}
export default Form;
