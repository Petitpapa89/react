import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';


class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Welcome to React Router Class</h1>
          <ul>
            <li><Link to="/One">One</Link></li>
            <li><Link to="/Two">Two</Link></li>
            <li><Link to="/Three">Three</Link></li>
            <li><Link to="/Four">Four</Link></li>
          </ul>
        </header>
      </div>
    );
  }
}

export default App;
