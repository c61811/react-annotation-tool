import React, { Component} from "react";
import {hot} from "react-hot-loader";
import {VideoTool} from "../Main.js";
import {ImageTool} from "../Main.js";
//import {ImageToolOld} from "../Main.js";
//import {ImageAnalysis} from "../Main.js";
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";



class App extends Component{

	constructor(props) {
	  super(props);
	}

	handleSubmit = r => {
    console.log(r)
  }

	componentDidMount(){}

  render(){
		const menu = {id: "0", value: "root", options: [
											{id: "1", value: "Object", options: [
														{id: "1-1", value: "Face", options: []},
														{id: "1-2", value: "Face Reflection", options: []},
														{id: "1-3", value: "Framed Photo", options: []},
														{id: "1-4", value: "Tattoo", options: []},
														{id: "1-5", value: "Suspicious", options: []},
														{id: "1-6", value: "Other", options: []},
												]},
											{id: "2", value: "Text", options: [
												{id: "2-1", value: "Letter", options: []},
												{id: "2-2", value: "Computer Screen", options: []},
												{id: "2-3", value: "Pill Bottle/Box", options: []},
												{id: "2-4", value: "Miscellaneous Papers", options: []},
												{id: "2-5", value: "Menu", options: []},
												{id: "2-6", value: "Credit Card", options: []},
												{id: "2-7", value: "Business Card", options: []},
												{id: "2-8", value: "Poster", options: []},
												{id: "2-9", value: "Clothing", options: []},
												{id: "2-10", value: "Book", options: []},
												{id: "2-11", value: "Receipt", options: []},
												{id: "2-12", value: "Street Sign", options: []},
												{id: "2-13", value: "License Plate", options: []},
												{id: "2-14", value: "Newspaper", options: []},
												{id: "2-15", value: "Suspicious", options: []},
												{id: "2-16", value: "Other", options: []},
											]}
										]}
		const options1 = {'1':{id: '1', value: "Scene", children: {
										 	'1-1':{id: '1-1', value: "Location Inferrable", children: {}},
										 }},
		'2':{id: '2', value: "Object", children: {
											'2-1':{id: '2-1', value: "Face", children: {}},
											'2-2':{id: '2-2', value: "Tattoo", children: {}},
											'2-3':{id: '2-3', value: "Nudity", children: {}},
											'2-4':{id: '2-4', value: "License Plate", children: {}},
										 }},
		'3':{id: '3', value: "Text", children: {
			'3-1':{id: '3-1', value: "Letter", children: {}},
			'3-2':{id: '3-2', value: "Street Sign", children: {}},
			'3-3':{id: '3-3', value: "Menu", children: {}},
			'3-4':{id: '3-4', value: "Receipt", children: {}},
			'3-5':{id: '3-5', value: "Credit Card", children: {}},
			'3-6':{id: '3-6', value: "Computer Screen", children: {}},
			'3-7':{id: '3-7', value: "Pill Bottle", children: {}},
		}},
		}
		const options2 = {'1':{id: '1', name: "Scene", children: {
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
		const annotations1	= [{"id":"jkzs52ox","name":"jkzs52ox","color":"rgba(227,0,255,1)","x":297.171875,"y":110,"width":70.125,"height":55,"selectedOptionPath":[{"id":-1,"name":"root"},{"id":"3","name":"Text"},{"id":"3-1","name":"Letter"}],"optionInputValues":{}},{"id":2,"name":"jkzs541i","color":"rgba(227,0,255,1)","x":111.296875,"y":267,"width":112,"height":57,"selectedOptionPath":[{"id":-1,"name":"root"},{"id":"1","name":"Scene"},{"id":"1-1","name":"Location Inferrable"}],"optionInputValues":{}}]
		const annotations2 = [{"id":"jlhbb0cr","name":"jlhbb0cr","type":"Polygon","color":"rgba(227,0,255,1)","vertices":[{"id":"jlhbb0cr","name":"jlhbb0cr","x":228.8125,"y":126},{"id":"jlhbb0ng","name":"jlhbb0ng","x":254.5,"y":131},{"id":"jlhbb0uh","name":"jlhbb0uh","x":269.5,"y":145},{"id":"jlhbb11f","name":"jlhbb11f","x":280.5,"y":173},{"id":"jlhbb17w","name":"jlhbb17w","x":286.5,"y":215},{"id":"jlhbb1dw","name":"jlhbb1dw","x":287.5,"y":249},{"id":"jlhbb1jz","name":"jlhbb1jz","x":290.5,"y":281},{"id":"jlhbb1pz","name":"jlhbb1pz","x":291.5,"y":301},{"id":"jlhbb1w7","name":"jlhbb1w7","x":284.5,"y":310},{"id":"jlhbb21p","name":"jlhbb21p","x":272.5,"y":302},{"id":"jlhbb28k","name":"jlhbb28k","x":254.5,"y":299},{"id":"jlhbb2ee","name":"jlhbb2ee","x":239.5,"y":292},{"id":"jlhbb2jj","name":"jlhbb2jj","x":239.5,"y":267},{"id":"jlhbb2p1","name":"jlhbb2p1","x":234.5,"y":232},{"id":"jlhbb2uy","name":"jlhbb2uy","x":223.5,"y":206},{"id":"jlhbb30i","name":"jlhbb30i","x":220.5,"y":164},{"id":"jlhbb360","name":"jlhbb360","x":220.5,"y":141}],"selected":[{"id":"0","name":"root"},{"id":"1","value":"Scene"},{"id":"1-1","value":"Location Inferrable"}],"optionInputValues":{}},{"id":"jlhbb6tx","name":"jlhbb6tx","type":"Polygon","color":"rgba(255,219,0,1)","vertices":[{"id":"jlhbb6tx","name":"jlhbb6tx","x":103.5,"y":345},{"id":"jlhbb7hm","name":"jlhbb7hm","x":354.5,"y":306},{"id":"jlhbb80e","name":"jlhbb80e","x":385.5,"y":452},{"id":"jlhbb8st","name":"jlhbb8st","x":116.5,"y":479}],"selected":[{"id":"0","name":"root"},{"id":"2","value":"Object"},{"id":"2-1","value":"Face"}],"optionInputValues":{}}]
		const tasks = [{id: "1", annotator: "annotator_1", color: "rgba(0,255,81,1)", category:"Others", annotations: annotations1 }]
		const previewNotices = ["Cells' body range.", "The time that cells <u>split</u>, <u>leave</u>, <u>obscured</u> and <u>show up</u> (if applicable)."]
		return(
			<div>
				<div className="mb-5">
					<VideoTool url={"https://cildata.crbs.ucsd.edu/media/videos/15793/15793_web.mp4"}
										 width={150}
										 height={150}
										 annotationWidth={500}
										 mturkAction={"https://workersandbox.mturk.com/mturk/externalSubmit"}
										 mturkAssignmentId={123456789}
										 onSubmit={this.handleSubmit}										 
										 onNextClick={this.handleSubmit}
				 						 onPreviousClick={this.handleSubmit}
				 						 onSkipClick={this.handleSubmit}/>
				</div>
			</div>
	    );
	  }
}

export default hot(module)(App);

/*
<VideoTool url={"https://cildata.crbs.ucsd.edu/media/videos/26271/26271_web.mp4"}
					 width={150}
					 height={150}
					 annotationWidth={400}
					 mturkAction={"https://workersandbox.mturk.com/mturk/externalSubmit"}
					 mturkAssignmentId={1234567890}
					 onSubmit={this.handleSubmit} />
<ImageAnalysis
					 annotationWidth={400}
					 tasks={tasks}
					 url={"https://lh3.googleusercontent.com/JNJBaQnNximJ229F-jbkXPzu8tvIPAWHPfi_wlscspHMGPf9fRGGk5EjHp9cIPMprEuYPHDG7DAQClk0_wraO59uNwP32i1SON-yhD1HIitsvrklqLHbU3ZMcYxUhfwKCN36xVmqFFu4HzyZPb5w1IC-sjIRDsC5PzaYyC4NfPDKb0Gtd2DAMNsN_iFL1NFp-ym9V94rqDncEIBZmwGBRUqpStBNRaNUHjHmgcZw11aN9ZBfm-zQMxChRiWQ_yZUwcAWB9yaFgbZaZucRs3DL73ieYzKai7VyNDcZu6FIg_c-J5ErguK_yxD67pDZ9Z0cZbml-7tka-YbwDIP7R4Gg6CR08Ei2WOYADYQqg2edISrqKPwhMKsKum0342irInTCEwuY4JDTVcLBFOCY_etjWMRkTs2DN3XnwBVKPKCsMCQkqMHqPbWnLtBMulCEO9-kMMdYtbl9HrbtzF_qa4x5XmwPFQt7ESssk-ohDBvFclNA7m6VUZtTUJCHLJ_CAIhEv4UAPsW13SJQMwbeWbHHegfkmiJS9VlGmUMMbNc7cb5ckBACfDo5s3DN8z0hjX7k-k03Fhe5mgR85vQ0wvoLYcE5wAsDHY5ehCXp3uLsVZvO472BXE3kn33UYByoUlXt91-00Ya4YjRa0BLyhEitn5ppJbZ5PkkQ=w599-h798-no"}
					 />
<ImageToolOld
					 onSubmit={this.handleSubmit}
				   annotationWidth={400}
					 options={options2}
					 url={"https://lh3.googleusercontent.com/JNJBaQnNximJ229F-jbkXPzu8tvIPAWHPfi_wlscspHMGPf9fRGGk5EjHp9cIPMprEuYPHDG7DAQClk0_wraO59uNwP32i1SON-yhD1HIitsvrklqLHbU3ZMcYxUhfwKCN36xVmqFFu4HzyZPb5w1IC-sjIRDsC5PzaYyC4NfPDKb0Gtd2DAMNsN_iFL1NFp-ym9V94rqDncEIBZmwGBRUqpStBNRaNUHjHmgcZw11aN9ZBfm-zQMxChRiWQ_yZUwcAWB9yaFgbZaZucRs3DL73ieYzKai7VyNDcZu6FIg_c-J5ErguK_yxD67pDZ9Z0cZbml-7tka-YbwDIP7R4Gg6CR08Ei2WOYADYQqg2edISrqKPwhMKsKum0342irInTCEwuY4JDTVcLBFOCY_etjWMRkTs2DN3XnwBVKPKCsMCQkqMHqPbWnLtBMulCEO9-kMMdYtbl9HrbtzF_qa4x5XmwPFQt7ESssk-ohDBvFclNA7m6VUZtTUJCHLJ_CAIhEv4UAPsW13SJQMwbeWbHHegfkmiJS9VlGmUMMbNc7cb5ckBACfDo5s3DN8z0hjX7k-k03Fhe5mgR85vQ0wvoLYcE5wAsDHY5ehCXp3uLsVZvO472BXE3kn33UYByoUlXt91-00Ya4YjRa0BLyhEitn5ppJbZ5PkkQ=w599-h798-no"}
					 />
<ImageAnalysis
					 annotationWidth={400}
					 tasks={tasks}
					 url={"https://lh3.googleusercontent.com/JNJBaQnNximJ229F-jbkXPzu8tvIPAWHPfi_wlscspHMGPf9fRGGk5EjHp9cIPMprEuYPHDG7DAQClk0_wraO59uNwP32i1SON-yhD1HIitsvrklqLHbU3ZMcYxUhfwKCN36xVmqFFu4HzyZPb5w1IC-sjIRDsC5PzaYyC4NfPDKb0Gtd2DAMNsN_iFL1NFp-ym9V94rqDncEIBZmwGBRUqpStBNRaNUHjHmgcZw11aN9ZBfm-zQMxChRiWQ_yZUwcAWB9yaFgbZaZucRs3DL73ieYzKai7VyNDcZu6FIg_c-J5ErguK_yxD67pDZ9Z0cZbml-7tka-YbwDIP7R4Gg6CR08Ei2WOYADYQqg2edISrqKPwhMKsKum0342irInTCEwuY4JDTVcLBFOCY_etjWMRkTs2DN3XnwBVKPKCsMCQkqMHqPbWnLtBMulCEO9-kMMdYtbl9HrbtzF_qa4x5XmwPFQt7ESssk-ohDBvFclNA7m6VUZtTUJCHLJ_CAIhEv4UAPsW13SJQMwbeWbHHegfkmiJS9VlGmUMMbNc7cb5ckBACfDo5s3DN8z0hjX7k-k03Fhe5mgR85vQ0wvoLYcE5wAsDHY5ehCXp3uLsVZvO472BXE3kn33UYByoUlXt91-00Ya4YjRa0BLyhEitn5ppJbZ5PkkQ=w599-h798-no"}
					 />
*/

/*
<div className="mb-5">
		<ImageTool onNextClick={this.handleSubmit}
							 onPreviousClick={this.handleSubmit}
							 onSkipClick={this.handleSubmit}
							 annotationWidth={500}
							 menu={menu}
							 category={"Others"}
							 categoryOptions = {["No Objects", "No Image"]}
							 annotations = {[]}
							 disabledOptionLevels={[]}
							 dynamicOptions
							 url={"https://images.pexels.com/photos/57750/pexels-photo-57750.jpeg"}
		/>
</div>

*/
