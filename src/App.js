import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { name: 'max', age: 28 },
      { name: 'manu', age: 29 },
      { name: 'steph', age: 23 },
    ],
    showPersons: false
  }

  switchNameHandler = (newName) => {
    this.setState({
      persons: [
        { name: newName, age: 28 },
        { name: 'manu', age: 29 },
        { name: 'steph', age: 23 },
      ]
    })
  }

  nameChangedHandler = (event) => {
    this.setState({
      persons: [
        { name: event.target.value, age: 28 },
        { name: 'Manu', age: 29 },
        { name: 'steph', age: 23 },
      ]
    })
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render () {

    let persons = null;

    // Recommended way
    if (this.state.showPersons) {
      persons = (
        <div>
          <Person 
            name={this.state.persons[0].name} 
            click={this.switchNameHandler.bind(this, 'MaxTest2')}
            changed={this.nameChangedHandler}>Comps</Person>
          <Person 
            name={this.state.persons[1].name} 
            click={this.switchNameHandler.bind(this, 'MaxTest2')}
            changed={this.nameChangedHandler}>Comps</Person>
          <Person 
            name={this.state.persons[2].name} 
            click={this.switchNameHandler.bind(this, 'MaxTest2')}
            changed={this.nameChangedHandler}>Comps</Person>
          </div>
      );
    }

    return (
      <div className="App">
       <h1>Hi, I'm a react app.</h1>
       <button className="ButtonSwitch" onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {persons}
      </div>
    );
  }
}

export default App;