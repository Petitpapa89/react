import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Three extends Component {
  render(){
    return(
      <div>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>I am Three component</h1>
          </header>
        </div>
      </div>
    );
  }
}

export default Three;
