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



		const annotations3 = [{"id":"jn16mxig","name":"jn16mxig","color":"rgba(227,0,255,1)","trajectories":[{"id":"jn16mxie","name":"jn16mxie","x":329.75,"y":273,"width":59,"height":46,"time":0.2685566222222222,"status":"Show"},{"id":"jn16n6zm","name":"jn16n6zm","x":445.75,"y":423,"width":54.25,"height":46,"time":0.6314432888888889,"status":"Show"}],"children":[],"parent":"jn16mjd6"},{"id":"jn16mxif","name":"jn16mxif","color":"rgba(227,0,255,1)","trajectories":[{"id":"jn16mxie","name":"jn16mxie","x":182.75,"y":368,"width":59,"height":46,"time":0.2685566222222222,"status":"Show"},{"id":"jn16n8aq","name":"jn16n8aq","x":377.75,"y":450,"width":59,"height":46,"time":0.6314432888888889,"status":"Show"}],"children":[],"parent":"jn16mjd6"},{"id":"jn16mcqp","name":"jn16mcqp","color":"rgba(255,219,0,1)","trajectories":[{"id":"jn16mcqp","name":"jn16mcqp","x":220.75,"y":90,"width":209,"height":200,"time":0,"status":"Show"},{"id":"jn16msdn","name":"jn16msdn","x":214.75,"y":127,"width":209,"height":200,"time":0.472680412371134,"status":"Show"},{"id":"jn16n3jo","name":"jn16n3jo","x":485.75,"y":438,"width":14.25,"height":62,"time":0.6314432888888889,"status":"Show"}],"children":[],"parent":""},{"id":"jn16mdz2","name":"jn16mdz2","color":"rgba(227,0,255,1)","trajectories":[{"id":"jn16mdz2","name":"jn16mdz2","x":289.75,"y":328,"width":91,"height":77,"time":0,"status":"Show"},{"id":"jn16n5z1","name":"jn16n5z1","x":446.75,"y":477,"width":53.25,"height":23,"time":0.6314432888888889,"status":"Show"}],"children":[],"parent":""},{"id":"jn16mf41","name":"jn16mf41","color":"rgba(255,219,0,1)","trajectories":[{"id":"jn16mf41","name":"jn16mf41","x":75.75,"y":281,"width":112,"height":158,"time":0,"status":"Show"},{"id":"jn16n28z","name":"jn16n28z","x":152.43047082224646,"y":285.40894120247185,"width":112,"height":158,"time":0.2685566222222222,"status":"Show"},{"id":"jn16mssx","name":"jn16mssx","x":129.75,"y":287,"width":112,"height":158,"time":0.472680412371134,"status":"Show"},{"id":"jn16n50i","name":"jn16n50i","x":365.75,"y":390,"width":112,"height":108,"time":0.6314432888888889,"status":"Show"}],"children":[],"parent":""},{"id":"jn16mgz6","name":"jn16mgz6","color":"rgba(255,0,0,1)","trajectories":[{"id":"jn16mgz6","name":"jn16mgz6","x":97.75,"y":101,"width":126,"height":120,"time":0,"status":"Show"},{"id":"jn16mu5o","name":"jn16mu5o","x":149.75,"y":160,"width":126,"height":120,"time":0.2685566222222222,"status":"Show"},{"id":"jn16n4eh","name":"jn16n4eh","x":421.75,"y":330,"width":78.25,"height":120,"time":0.6314432888888889,"status":"Show"}],"children":[],"parent":""},{"id":"jn16mi1y","name":"jn16mi1y","color":"rgba(0,255,81,1)","trajectories":[{"id":"jn16mi1y","name":"jn16mi1y","x":241.75,"y":408,"width":144,"height":58,"time":0,"status":"Show"},{"id":"jn16mrjm","name":"jn16mrjm","x":221.75,"y":302,"width":144,"height":58,"time":0.472680412371134,"status":"Show"},{"id":"jn16n5h8","name":"jn16n5h8","x":317.75,"y":397,"width":144,"height":58,"time":0.6314432888888889,"status":"Show"}],"children":[],"parent":""},{"id":"jn16mjd6","name":"jn16mjd6","color":"rgba(255,219,0,1)","trajectories":[{"id":"jn16mjd6","name":"jn16mjd6","x":175.75,"y":300,"width":118,"height":92,"time":0,"status":"Show"},{"id":"jn16mxie","name":"jn16mxie","x":175.75,"y":300,"width":118,"height":92,"time":0.2685566222222222,"status":"Split"}],"children":["jn16mxif","jn16mxig"],"parent":""},{"id":"jn16mkj2","name":"jn16mkj2","color":"rgba(227,0,255,1)","trajectories":[{"id":"jn16mkj2","name":"jn16mkj2","x":398.75,"y":293,"width":57,"height":57,"time":0,"status":"Show"},{"id":"jn16n8x8","name":"jn16n8x8","x":500,"y":457,"width":0,"height":43,"time":0.6314432888888889,"status":"Show"}],"children":[],"parent":""},{"id":"jn16mlin","name":"jn16mlin","color":"rgba(0,255,81,1)","trajectories":[{"id":"jn16mlin","name":"jn16mlin","x":302.75,"y":29,"width":88,"height":68,"time":0,"status":"Show"},{"id":"jn16n9p4","name":"jn16n9p4","x":460.75,"y":375,"width":39.25,"height":68,"time":0.6314432888888889,"status":"Show"}],"children":[],"parent":""},{"id":"jn16mmiw","name":"jn16mmiw","color":"rgba(255,219,0,1)","trajectories":[{"id":"jn16mmiw","name":"jn16mmiw","x":131.75,"y":40,"width":113,"height":125,"time":0,"status":"Show"},{"id":"jn16muof","name":"jn16muof","x":53.75,"y":105,"width":113,"height":125,"time":0.2685566222222222,"status":"Show"},{"id":"jn16naje","name":"jn16naje","x":374.75,"y":414,"width":113,"height":86,"time":0.6314432888888889,"status":"Show"}],"children":[],"parent":""}]

		const tasks = [{id: "1", annotator: "annotator_1", color: "rgba(0,255,81,1)", category:"Others", annotations: annotations1 }]
		const previewNotices = ["Cells' body range.", "The time that cells <u>split</u>, <u>leave</u>, <u>obscured</u> and <u>show up</u> (if applicable)."]
		return(
			<div>

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
										 labeled
										 imageOnly
										 url={"https://images.pexels.com/photos/57750/pexels-photo-57750.jpeg"}
					/>
				</div>
			</div>
	    );
	  }
}

export default hot(module)(App);


/*
mturkAction={"https://workersandbox.mturk.com/mturk/externalSubmit"}
mturkAssignmentId={123456789}

*/

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
	<VideoTool onSubmit={this.handleSubmit}
						 url={"https://cildata.crbs.ucsd.edu/media/videos/15793/15793_web.mp4"}
						 annotationWidth={500}
						 annotations = {annotations3}
						 previewNotices = {previewNotices}
						 />
</div>

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
