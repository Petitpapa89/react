import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';

class Four extends Component {
  render(){
    return(
      <div>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>I am Four component</h1>
            <ul>
              <li><Link to="/GroupChat">Go to the GroupChat</Link></li>
            </ul>
          </header>
        </div>
      </div>
    );
  }
}

export default Four;
