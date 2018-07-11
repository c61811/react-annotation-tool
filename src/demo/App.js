import React, { Component} from "react";
import {hot} from "react-hot-loader";
import {VideoTool} from "../Main.js";
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
      <div className="App">
					<VideoTool url="https://cildata.crbs.ucsd.edu/media/videos/34849/34849_web.mp4"
										 width={673}
										 height={513}
										 annotationWidth={800}
										 mturkAction={"https://workersandbox.mturk.com/mturk/externalSubmit"}
										 onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default hot(module)(App);

/*
1344

https://cildata.crbs.ucsd.edu/media/videos/35205/35205_web.mp4
*/
