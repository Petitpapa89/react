import React, {Component} from 'react';
var firebase = require('firebase');
var uuid = require('uuid');

var config = {
    apiKey: "AIzaSyAMd8NdR4J6Uss2mWpn1kfdE5ss4vselEc",
    authDomain: "loginauth-c296c.firebaseapp.com",
    databaseURL: "https://loginauth-c296c.firebaseio.com",
    projectId: "loginauth-c296c",
    storageBucket: "loginauth-c296c.appspot.com",
    messagingSenderId: "895992495574"
  };
  firebase.initializeApp(config);



class Authen extends Component {

  login(event){
    const email = this.refs.email.value;
    const password = this.refs.password.value;

    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email, password);

    // handle login promise
    promise.then(user =>{
      var l_out = document.getElementById('logout');
      var err = 'Welcome Back '+user.user.email;
      this.setState({err: err});
      l_out.classList.remove('hide');
    });

    // catching the error message here
    promise.catch(e => {
      var err = e.message;
      this.setState({err: err});
    });
  };

  signup(event){
    const email = this.refs.email.value;
    const password = this.refs.password.value;

    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email, password);
    // catching the error message here
    promise.then(user => {
      var err = "Welcome "+user.user.email;
      console.log(user);
      firebase.database().ref('users/'+this.state.uid).set({
        email: user.user.email
      });
      this.setState({err: err});
    });

    promise
    .catch(e => {
      var err = e.message;
      this.setState({err: err});
    });
  }

  logout(event){
    firebase.auth().signOut();
    var l_out = document.getElementById('logout');
    var err = 'Thanks. Please Come Again';
    this.setState({err: err});

    l_out.classList.add('hide');
  }

  google() {
    console.log("I am in google method");

    var provider = new firebase.auth.GoogleAuthProvider();
    var promise = firebase.auth().signInWithPopup(provider);

    promise.then(result => {
      var user = result.user;
      console.log('result::', result );

      firebase.database().ref('users/'+user.uid).set({
        email: user.email,
        name: user.displayName
      });
    });
    promise.catch(e => {
      var msg = e.message;
      console.log(msg);
    })
  }

  googleRedirect (){
    console.log("I am in googleRedirect");
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    var getresult = firebase.auth().getRedirectResult();

    getresult.then(result => {
      // var token = result.credential.accessToken;
      if (result.credential){
        var token = result.credential.accessToken;
      }

      var user = result.user;
      console.log('result: ',result);
      console.log('user:', user);
    });
    getresult.catch(e => {
      var msg = e.message;
      console.log('msg: ', msg);
    });
  }

  constructor(props){
    super(props);

    this.state = {
      uid: uuid.v1(),
      err: ''
    };

    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.logout = this.logout.bind(this);
    this.google = this.google.bind(this);
    this.googleRedirect = this.googleRedirect.bind(this);
  }

  render(){
    return(
      <div className='App-authen'>
        <input id="email" ref="email" type="email" placeholder="Enter your email"/><br />
        <input id="password" ref="password" type="password" placeholder="Enter your password"/><br />
        <p>{this.state.err}</p> {/*passing error message here*/}
        <button onClick={this.login}>Log In</button>
        <button onClick={this.signup}>Sign Up</button>
        <button id="logout" className="hide" onClick={this.logout}>Log Out</button> <br />
        <button id="google" onClick={this.google} className="google">Sign In With Google</button>
        <button id="googleRedirect" onClick={this.googleRedirect} className="googleRedirect">Sign In With Google</button>
      </div>
    );
  }
}

export default Authen;
