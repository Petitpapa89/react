import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {Router, Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import One from './One';
import Two from './Two';
import Three from './Three';
import Four from './Four';
import GroupChat from './GroupChat';
import FourPointOne from './FourPointOne';
import NoMatch from './NoMatch';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App}></Route>
      <Route path="/One" component={One}></Route>
      <Route path="/Two" component={Two}></Route>
      <Route path="/Three" component={Three}></Route>
      <Route path="/Four" component={Four}></Route>
      <Route path="/GroupChat" component={GroupChat}></Route>
      <Route path="*" component={NoMatch}></Route>
    </Switch>
  </BrowserRouter>


, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
