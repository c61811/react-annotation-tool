import React, {Component} from 'react';
import {Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/Preview.css';

class Preview extends Component {
	constructor(props){
		super(props)
	}
	handleSubmit = () =>{
		this.props.onPreviewed()
	}

	render(){
		const {annotationHeight} = this.props
		return (<div className="d-flex align-items-center justify-content-center" style={{height: annotationHeight}}>
							<div>
								Please quick scan the video and observe the following points to help you complete the task
								<ul className="text-left focus-list">
						      <li>{`Cells' body range.`}</li>
						      <li>The time that cells <u>split</u>, <u>leave</u>, <u>obscured</u> and <u>show up</u>. (if applicable)</li>
					    	</ul>
								<div>
									<Button className="mt-2" color="primary" onClick={this.handleSubmit}>I scanned the video and ready to start</Button>
								</div>
							</div>
						 </div>)
	}
}
export default Preview;
