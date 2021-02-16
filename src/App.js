
import React from 'react';
import './App.css';

function NewJokeAffirmation(props) {
  return (
    <button type="button" className="button-box" onClick={props.onClick}>
        Click here for a new affirmation or dad joke 
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
    this.fetchAffirmation = this.fetchAffirmation.bind(this);
  }

  // On launch, app will display an affirmation from the API:
  componentDidMount() {
    fetch('https://dulce-affirmations-api.herokuapp.com/affirmation', {
      headers: {
        "Accept": "application/json"
      }
    })
    .then(result => result.json())
    .then( (data) => {
        this.setState({
          text: data[0].phrase, 
          isJoke: true, 
          isBusy: false
        })
    })
    .catch(console.log)
  }

  fetchJoke() {
    this.setState( {isBusy:true}  )
    fetch('https://icanhazdadjoke.com/', {
      headers: {
        "Accept": "application/json"
      }
    })
    .then(result => result.json())
    .then( (data) => {
        this.setState({
          text: data.joke, 
          isJoke: false, 
          isBusy: false
        })
    })
    .catch(console.log)
  }

  fetchAffirmation() {
    this.setState( {isBusy:true} )
    fetch('https://dulce-affirmations-api.herokuapp.com/affirmation', {
      headers: {
        "Accept": "application/json"
      }
    })
    .then(result => result.json())
    .then( (data) => {
        this.setState({
          text: data[0].phrase , 
          isJoke: true, 
          isBusy: false
        })
    })
    .catch(console.log)
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
      this.fetchAffirmation()
  }

  render() {
    return (
    <div className="App">
      <header>
        <p>Affirmation or Dad Joke</p>    
      </header>
        <div className="text-box">
          {this.state.text}
        </div>
          <br></br>
        <NewJokeAffirmation onClick={this.handleClick} />
          <br></br>
      <footer>
        Rob Watson 2020 - 2021 
      </footer>
    </div>
    );
  }
}


export default App;
