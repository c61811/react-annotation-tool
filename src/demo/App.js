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
					<VideoTool url="https://cildata.crbs.ucsd.edu/media/videos/40986/40986_web.mp4"
										 width={1344}
										 height={1024}
										 annotationWidth={600}
										 mturk
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
