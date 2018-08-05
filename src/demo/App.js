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
    return(
			<div>
	      <div className="App">
						<VideoTool url="https://cildata.crbs.ucsd.edu/media/videos/26271/26271_web.mp4"
											 width={150}
											 height={150}
											 annotationWidth={400}
											 mturkAction={"https://workersandbox.mturk.com/mturk/externalSubmit"}
											 mturkAssignmentId={1234567890}
											 onSubmit={this.handleSubmit} />
	      </div>
				<div>
						<ImageTool />
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
