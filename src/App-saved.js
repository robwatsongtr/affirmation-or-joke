

import React from 'react';
import './App.css';

function NewQuoteButton(props) {
  return (
    <button type="button" className="button-box" onClick={props.onClick}>
        Click here for a new quote or joke 
    </button>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      isJoke: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.fetchJoke = this.fetchJoke.bind(this);
    this.fetchQuote = this.fetchQuote.bind(this);
  }

  // When properties or state changes, return true only 
  // if it's the text that has changed.
  shouldComponentUpdate(nextprops, nextstate) {        
    return (nextstate.text !== this.state.text);    
  }

  fetchJoke() {
    this.setState( {isBusy:true}  )
    fetch('https://icanhazdadjoke.com/', {
      headers: {
        "Accept": "application/json"
      }
    })
      .then(result => result.json())
      .then(
        (data) => {
          this.setState( {text: data.joke, isJoke: false, isBusy: false} )
        }
      )
      .catch(console.log)
  }

  fetchQuote() {
    this.setState( {text: "Here is a famous quote.", isJoke: true} )
  }

  handleClick() {
    if(this.state.isBusy){
      this.setState({text: "*still loading*"});
      return
    }
    const isJoke = this.state.isJoke;
    if(isJoke) {
      this.fetchJoke()
    } else
      this.fetchQuote()
  }

  render() {
    return (
    <div className="App">
      <header>
        <p>Quote or Joke?</p>    
      </header>
        <div className="text-box">
          {this.state.text}
        </div>
          <br></br>
        <NewQuoteButton onClick={this.handleClick} />
          <br></br>
      <footer>
        Rob Watson 2020 
      </footer>
    </div>
    );
  }
}




export default App;
