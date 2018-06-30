import React, { Component} from "react";
import {hot} from "react-hot-loader";
import Main from "../Main.js";
import "./App.css";

class App extends Component{

	constructor(props) {
	  super(props);
	  this.state = { counter: { available: true, count: 0 } };
	}

	click = () => {
		this.setState(prevState => ({
       counter: { ...prevState.counter, count: prevState.counter.count+1 }
     }));
	}

  render(){
		const {counter} = this.state
    return(
      <div className="App">
        <h1> Hello, World!! </h1>
					<Main /><br />
					<button onClick={this.click}>
							This test counter: {counter.count}
					</button>
      </div>
    );
  }
}

export default hot(module)(App);
