import React, { Component} from "react";
import {hot} from "react-hot-loader";
import {VideoTool} from "../Main.js";
import {ImageTool} from "../Main.js";
import "./App.css";

class App extends Component{

	constructor(props) {
	  super(props);
	}

	handleSubmit = annotation => {
    console.log(annotation)
  }


  render(){
		const options = { '1':{id: '1', name: "Blurry Images", children: {}},
									 '2':{id: '2', name: "Scene", children: {
										 '2a':{id: '2a', name: "Suspicious", children: {}},
										 '2b':{id: '2b', name: "Location Inferrable", children: {}},
									 }},
									 '3':{id: '3', name: "Object", children: {}},
									 '4':{id: '4', name: "Text", children: {}},
								 	}
		const annotations	= []
    return(
			<div>
	      <div className="App">
						<VideoTool url={"https://cildata.crbs.ucsd.edu/media/videos/26271/26271_web.mp4"}
											 width={150}
											 height={150}
											 annotationWidth={400}
											 mturkAction={"https://workersandbox.mturk.com/mturk/externalSubmit"}
											 mturkAssignmentId={1234567890}
											 onSubmit={this.handleSubmit} />
	      </div>
				<div>
							<ImageTool
											options={options}
											onSubmit={this.handleSubmit}
											url={"https://lh3.googleusercontent.com/JNJBaQnNximJ229F-jbkXPzu8tvIPAWHPfi_wlscspHMGPf9fRGGk5EjHp9cIPMprEuYPHDG7DAQClk0_wraO59uNwP32i1SON-yhD1HIitsvrklqLHbU3ZMcYxUhfwKCN36xVmqFFu4HzyZPb5w1IC-sjIRDsC5PzaYyC4NfPDKb0Gtd2DAMNsN_iFL1NFp-ym9V94rqDncEIBZmwGBRUqpStBNRaNUHjHmgcZw11aN9ZBfm-zQMxChRiWQ_yZUwcAWB9yaFgbZaZucRs3DL73ieYzKai7VyNDcZu6FIg_c-J5ErguK_yxD67pDZ9Z0cZbml-7tka-YbwDIP7R4Gg6CR08Ei2WOYADYQqg2edISrqKPwhMKsKum0342irInTCEwuY4JDTVcLBFOCY_etjWMRkTs2DN3XnwBVKPKCsMCQkqMHqPbWnLtBMulCEO9-kMMdYtbl9HrbtzF_qa4x5XmwPFQt7ESssk-ohDBvFclNA7m6VUZtTUJCHLJ_CAIhEv4UAPsW13SJQMwbeWbHHegfkmiJS9VlGmUMMbNc7cb5ckBACfDo5s3DN8z0hjX7k-k03Fhe5mgR85vQ0wvoLYcE5wAsDHY5ehCXp3uLsVZvO472BXE3kn33UYByoUlXt91-00Ya4YjRa0BLyhEitn5ppJbZ5PkkQ=w599-h798-no"}

							/>
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
