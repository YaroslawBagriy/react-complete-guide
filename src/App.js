import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: '0', name: 'max', age: 28 },
      { id: '1', name: 'manu', age: 29 },
      { id: '2', name: 'steph', age: 23 },
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

  deletePersonsHandler = (personIndex) => {
    // Slice makes a copy of state
    // const persons = this.state.persons.slice();

    // Always update state in an immutable fashion
    const persons = [...this.state.persons]
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  render () {

    let persons = null;

    // Recommended way
    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            // Always add a key property, allows dom to update onyl what it needs
            return <Person 
              name={person.name}
              age={person.age}
              key={person.id}
              click={() => this.deletePersonsHandler(index)}
              changed={this.nameChangedHandler} />
          })}
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