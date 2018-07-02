import React, { Component} from "react";
import {hot} from "react-hot-loader";
import {VideoTool} from "../Main.js";
import "./App.css";

class App extends Component{

	constructor(props) {
	  super(props);
	}
  render(){
    return(
      <div className="App">
					<VideoTool video={{url: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4", width: 848, height: 480}} />
      </div>
    );
  }
}

export default hot(module)(App);
