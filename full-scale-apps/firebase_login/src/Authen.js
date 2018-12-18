import React, {Component} from 'react';
var firebase = require('firebase');
var uuid = require('uuid');

{/*
  var config = {
      apiKey: "AIzaSyAMd8NdR4J6Uss2mWpn1kfdE5ss4vselEc",
      authDomain: "loginauth-c296c.firebaseapp.com",
      databaseURL: "https://loginauth-c296c.firebaseio.com",
      projectId: "loginauth-c296c",
      storageBucket: "loginauth-c296c.appspot.com",
      messagingSenderId: "895992495574"
    };
    firebase.initializeApp(config);
  */}


var config = {
    apiKey: "AIzaSyDJxYTx6ex7jJnG5b29ztkGvVRCOO8L07o",
    authDomain: "authen-1812d.firebaseapp.com",
    databaseURL: "https://authen-1812d.firebaseio.com",
    projectId: "authen-1812d",
    storageBucket: "authen-1812d.appspot.com",
    messagingSenderId: "425823308292"
  };
firebase.initializeApp(config);


class Authen extends Component {

  login(event){
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    console.log(email, password);

    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email, password);

    // handle login promise

    // catching the error message here
    promise.catch(e => {
      var err = e.message;
      console.log(err);
      this.setState({err: err});
    });
  };

  signup(event){
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    console.log(email, password);

    var auth = firebase.auth(); // maye we should not set it as a constant

    var promise = auth.createUserWithEmailAndPassword(email, password); // maye we should not set it as a constant

    // catching the error message here
    promise.then(user => {
      var err = "Welcome "+user.email;
      console.log(user);
      console.log('user uid:'+user.user.uid);
      firebase.database().ref('users/'+user.user.uid).set({
        email: user.email
      });
      console.log(user);
      this.setState({err: err});
    });

    promise
    .catch(e => {
      var err = e.message;
      console.log(err);
      this.setState({err: err});
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
  }

  render(){
    return(
      <div className='App-authen'>
        <input id="email" ref="email" type="email" placeholder="Enter your email"/><br />
        <input id="password" ref="password" type="password" placeholder="Enter your password"/><br />
        <p>{this.state.err}</p> {/*passing error message here*/}
        <button onClick={this.login}>Log In</button>
        <button onClick={this.signup}>Sign Up</button>
        <button>Log Out</button>
      </div>
    );
  }
}

export default Authen;
