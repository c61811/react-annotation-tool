import React, { Component} from "react";
import {hot} from "react-hot-loader";
import {VideoTool} from "../Main.js";
import "./App.css";

class App extends Component{

	constructor(props) {
	  super(props);
	}

	handleSubmit = objects => {
    console.log(objects)
  }


  render(){
    return(
      <div className="App">
					<VideoTool onSubmit={this.handleSubmit}
										 videoUrl="https://cildata.crbs.ucsd.edu/media/videos/15790/15790_web.mp4"
										 videoWidth={500}
										 mturkAction={"https://workersandbox.mturk.com/mturk/externalSubmit"}
										 onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default hot(module)(App);
