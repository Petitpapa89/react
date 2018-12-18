import React, {Component} from 'react';
var firebase = require('firebase');
var uuid = require('uuid');

var config = {
  apiKey: "AIzaSyDZh7XX_AG8YcyfCkeaUtHAQzlr_wN2BZo",
  authDomain: "uservey-4e35a.firebaseapp.com",
  databaseURL: "https://uservey-4e35a.firebaseio.com",
  projectId: "uservey-4e35a",
  storageBucket: "uservey-4e35a.appspot.com",
  messagingSenderId: "368641056898"
};
firebase.initializeApp(config);

class Usurvey extends Component {

  nameSubmit(event){
    var student_name = this.refs.name.value;
    this.setState({studentName: student_name}, function(){
      console.log(this.state);
    })
  }

  answerSelected(event){

    var answers = this.state.answers;
    if (event.target.name === 'answer1'){
      answers.answer1 = event.target.value;
    } else if (event.target.name === 'answer2'){
      answers.answer2 = event.target.value;
    } else {
      answers.answer3 = event.target.value;
    }

    this.setState({answers: answers}, function (){
      console.log(this.state);
    })
  }

  questionSubmit(){
    firebase.database().ref('uServey/'+this.state.uid).set({
      studentName: this.state.studentName,
      answers: this.state.answers
    });
    this.setState({isSubmitted: true});
  }

  constructor(props){
    super(props);

    this.state = {
      uid: uuid.v1(),
      studentName: '',

      value: '',

      answers: {
        answer1: '',
        answer2: '',
        answer3: ''
      },
      isSubmitted: false
    };
    this.nameSubmit = this.nameSubmit.bind(this);
    this.answerSelected = this.answerSelected.bind(this);
    this.questionSubmit = this.questionSubmit.bind(this);
  }
  render(){
    var studentName;
    var questions;

    if(this.state.studentName === '' && this.state.isSubmitted === false){
      studentName = <div>
        <h1>Hey student, please let us know your name: </h1>
        <form onSubmit={this.nameSubmit}>
          <input className="namy" type="text" placeholder="Enter your name" ref="name" />
        </form>
      </div>;
      questions = ''
    } else if (this.state.studentName !== '' && this.state.isSubmitted === false){
      studentName = <h1>Hey there, welcome to Usurvey, {this.state.studentName}</h1>;
      questions = <div>
        <h2>Here are some questions: </h2>
        <form onSubmit={this.questionSubmit}>
          <div className='card'>
            <label>What courses do you like the most?</label> <br />
            <input type="radio" name="answer1" value="Tech" onChange={this.answerSelected} ref='choice' /> Tech
            <input type="radio" name="answer1" value="Design" onChange={this.answerSelected} ref='choice' /> Design
            <input type="radio" name="answer1" value="Marketing" onChange={this.answerSelected} ref='choice' /> Marketing
          </div>
          <div className='card'>
            <label>You are a: </label> <br />
            <input type="radio" name="answer2" value="Student" onChange={this.answerSelected} /> Student
            <input type="radio" name="answer2" value="Employed" onChange={this.answerSelected} /> Employed
            <input type="radio" name="answer2" value="Looking" onChange={this.answerSelected} /> Looking
          </div>
          <div className='card'>
            <label>Is Online Learning Helpful? </label> <br />
            <input type="radio" name="answer3" value="Yes" onChange={this.answerSelected} /> Yes
            <input type="radio" name="answer3" value="No" onChange={this.answerSelected} /> No
            <input type="radio" name="answer3" value="Maybe" onChange={this.answerSelected} /> Maybe
          </div>

          <input className="feed-back-button" type="submit" value ="submit" />
        </form>
      </div>;
    } else if (this.state.isSubmitted === true){
      studentName = <h1>Thank you!, {this.state.studentName}</h1>
    }

    return(
      <div className="App-intro">
        {studentName}
        --------------------
        {questions}
      </div>
    );
  }
}

export default Usurvey;
