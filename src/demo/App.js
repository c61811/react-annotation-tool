import React, { Component} from "react";
import {hot} from "react-hot-loader";
import {VideoTool} from "../Main.js";
import {ImageTool} from "../Main.js";
import {ImageToolOld} from "../Main.js";
import {ImageAnalysis} from "../Main.js";
import "./App.css";

class App extends Component{

	constructor(props) {
	  super(props);
	}

	handleSubmit = annotation => {
    console.log(annotation)
  }


  render(){
		const options = {'1':{id: '1', name: "Scene", children: {
										 	'1-1':{id: '1-1', name: "Location Inferrable", children: {}},
										 }},
		'2':{id: '2', name: "Object", children: {
											'2-1':{id: '2-1', name: "Face", children: {}},
											'2-2':{id: '2-2', name: "Tattoo", children: {}},
											'2-3':{id: '2-3', name: "Nudity", children: {}},
											'2-4':{id: '2-4', name: "License Plate", children: {}},
										 }},
		'3':{id: '3', name: "Text", children: {
			'3-1':{id: '3-1', name: "Letter", children: {}},
			'3-2':{id: '3-2', name: "Street Sign", children: {}},
			'3-3':{id: '3-3', name: "Menu", children: {}},
			'3-4':{id: '3-4', name: "Receipt", children: {}},
			'3-5':{id: '3-5', name: "Credit Card", children: {}},
			'3-6':{id: '3-6', name: "Computer Screen", children: {}},
			'3-7':{id: '3-7', name: "Pill Bottle", children: {}},
		}},
		}
		const annotations1	= [{"id":1,"name":"jkzs52ox","color":"rgba(227,0,255,1)","x":297.171875,"y":110,"width":70.125,"height":55,"selectedOptionPath":[{"id":-1,"name":"root"},{"id":"3","name":"Text"},{"id":"3-1","name":"Letter"}],"optionInputValues":{}},{"id":2,"name":"jkzs541i","color":"rgba(227,0,255,1)","x":111.296875,"y":267,"width":112,"height":57,"selectedOptionPath":[{"id":-1,"name":"root"},{"id":"1","name":"Scene"},{"id":"1-1","name":"Location Inferrable"}],"optionInputValues":{}}]
		const annotations2  = [{"id":1,"name":"jkzttaxd","color":"rgba(0,4,255,1)","x":293.171875,"y":55,"width":72.125,"height":77,"selectedOptionPath":[{"id":-1,"name":"root"},{"id":"2","name":"Object"},{"id":"2-1","name":"Face"}],"optionInputValues":{}},{"id":2,"name":"jkzttc2m","color":"rgba(255,0,0,1)","x":60.296875,"y":93,"width":43,"height":112,"selectedOptionPath":[{"id":-1,"name":"root"},{"id":"2","name":"Object"},{"id":"2-1","name":"Face"}],"optionInputValues":{}},{"id":3,"name":"jkzttd1x","color":"rgba(0,4,255,1)","x":268.296875,"y":372,"width":89,"height":105,"selectedOptionPath":[{"id":-1,"name":"root"},{"id":"1","name":"Scene"},{"id":"1-1","name":"Location Inferrable"}],"optionInputValues":{}},{"id":4,"name":"jkztte42","color":"rgba(0,255,81,1)","x":49.296875,"y":386,"width":82,"height":62,"selectedOptionPath":[],"optionInputValues":{}},{"id":5,"name":"jkzttf4b","color":"rgba(0,4,255,1)","x":147.296875,"y":250,"width":95,"height":74,"selectedOptionPath":[{"id":-1,"name":"root"},{"id":"2","name":"Object"},{"id":"2-2","name":"Tattoo"}],"optionInputValues":{}}]

		const tasks = [{id: "1", annotator: "annotator_1", color: "rgba(0,255,81,1)", category:"Others", annotations: annotations1 },
									 {id: "2", annotator: "annotator_2", color: "rgba(255,219,0,1)", category:"Others", annotations: annotations2 }]

		return(
			<div>
				<div>
						<ImageTool
											 onSubmit={this.handleSubmit}
											 annotationWidth={400}
											 options={options}
											 url={"https://lh3.googleusercontent.com/JNJBaQnNximJ229F-jbkXPzu8tvIPAWHPfi_wlscspHMGPf9fRGGk5EjHp9cIPMprEuYPHDG7DAQClk0_wraO59uNwP32i1SON-yhD1HIitsvrklqLHbU3ZMcYxUhfwKCN36xVmqFFu4HzyZPb5w1IC-sjIRDsC5PzaYyC4NfPDKb0Gtd2DAMNsN_iFL1NFp-ym9V94rqDncEIBZmwGBRUqpStBNRaNUHjHmgcZw11aN9ZBfm-zQMxChRiWQ_yZUwcAWB9yaFgbZaZucRs3DL73ieYzKai7VyNDcZu6FIg_c-J5ErguK_yxD67pDZ9Z0cZbml-7tka-YbwDIP7R4Gg6CR08Ei2WOYADYQqg2edISrqKPwhMKsKum0342irInTCEwuY4JDTVcLBFOCY_etjWMRkTs2DN3XnwBVKPKCsMCQkqMHqPbWnLtBMulCEO9-kMMdYtbl9HrbtzF_qa4x5XmwPFQt7ESssk-ohDBvFclNA7m6VUZtTUJCHLJ_CAIhEv4UAPsW13SJQMwbeWbHHegfkmiJS9VlGmUMMbNc7cb5ckBACfDo5s3DN8z0hjX7k-k03Fhe5mgR85vQ0wvoLYcE5wAsDHY5ehCXp3uLsVZvO472BXE3kn33UYByoUlXt91-00Ya4YjRa0BLyhEitn5ppJbZ5PkkQ=w599-h798-no"}

							/>
		    </div>
				<div>
						<ImageToolOld
											 onSubmit={this.handleSubmit}
											 annotationWidth={400}
											 options={options}
											 url={"https://lh3.googleusercontent.com/JNJBaQnNximJ229F-jbkXPzu8tvIPAWHPfi_wlscspHMGPf9fRGGk5EjHp9cIPMprEuYPHDG7DAQClk0_wraO59uNwP32i1SON-yhD1HIitsvrklqLHbU3ZMcYxUhfwKCN36xVmqFFu4HzyZPb5w1IC-sjIRDsC5PzaYyC4NfPDKb0Gtd2DAMNsN_iFL1NFp-ym9V94rqDncEIBZmwGBRUqpStBNRaNUHjHmgcZw11aN9ZBfm-zQMxChRiWQ_yZUwcAWB9yaFgbZaZucRs3DL73ieYzKai7VyNDcZu6FIg_c-J5ErguK_yxD67pDZ9Z0cZbml-7tka-YbwDIP7R4Gg6CR08Ei2WOYADYQqg2edISrqKPwhMKsKum0342irInTCEwuY4JDTVcLBFOCY_etjWMRkTs2DN3XnwBVKPKCsMCQkqMHqPbWnLtBMulCEO9-kMMdYtbl9HrbtzF_qa4x5XmwPFQt7ESssk-ohDBvFclNA7m6VUZtTUJCHLJ_CAIhEv4UAPsW13SJQMwbeWbHHegfkmiJS9VlGmUMMbNc7cb5ckBACfDo5s3DN8z0hjX7k-k03Fhe5mgR85vQ0wvoLYcE5wAsDHY5ehCXp3uLsVZvO472BXE3kn33UYByoUlXt91-00Ya4YjRa0BLyhEitn5ppJbZ5PkkQ=w599-h798-no"}

							/>
		    </div>
				<div>
						<ImageAnalysis
											annotationWidth={400}
											tasks={tasks}
											url={"https://lh3.googleusercontent.com/JNJBaQnNximJ229F-jbkXPzu8tvIPAWHPfi_wlscspHMGPf9fRGGk5EjHp9cIPMprEuYPHDG7DAQClk0_wraO59uNwP32i1SON-yhD1HIitsvrklqLHbU3ZMcYxUhfwKCN36xVmqFFu4HzyZPb5w1IC-sjIRDsC5PzaYyC4NfPDKb0Gtd2DAMNsN_iFL1NFp-ym9V94rqDncEIBZmwGBRUqpStBNRaNUHjHmgcZw11aN9ZBfm-zQMxChRiWQ_yZUwcAWB9yaFgbZaZucRs3DL73ieYzKai7VyNDcZu6FIg_c-J5ErguK_yxD67pDZ9Z0cZbml-7tka-YbwDIP7R4Gg6CR08Ei2WOYADYQqg2edISrqKPwhMKsKum0342irInTCEwuY4JDTVcLBFOCY_etjWMRkTs2DN3XnwBVKPKCsMCQkqMHqPbWnLtBMulCEO9-kMMdYtbl9HrbtzF_qa4x5XmwPFQt7ESssk-ohDBvFclNA7m6VUZtTUJCHLJ_CAIhEv4UAPsW13SJQMwbeWbHHegfkmiJS9VlGmUMMbNc7cb5ckBACfDo5s3DN8z0hjX7k-k03Fhe5mgR85vQ0wvoLYcE5wAsDHY5ehCXp3uLsVZvO472BXE3kn33UYByoUlXt91-00Ya4YjRa0BLyhEitn5ppJbZ5PkkQ=w599-h798-no"}
						/>
			  </div>
				<div className="App">
						<VideoTool url={"https://cildata.crbs.ucsd.edu/media/videos/26271/26271_web.mp4"}
											 width={150}
											 height={150}
											 annotationWidth={400}
											 mturkAction={"https://workersandbox.mturk.com/mturk/externalSubmit"}
											 mturkAssignmentId={1234567890}
											 onSubmit={this.handleSubmit} />
	      </div>				
			</div>

	    );
	  }
}

export default hot(module)(App);

/*
1344

https://cildata.crbs.ucsd.edu/media/videos/35205/35205_web.mp4
*/
