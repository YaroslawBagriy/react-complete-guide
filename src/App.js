import React, { Component } from 'react';
import './App.css';
import Radium from 'radium';
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

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id
    });

    // Use the ... syntax to create a copy
    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons})
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
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };

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
              changed={(event) => this.nameChangedHandler(event, person.id)} />
          })}
          </div>
      );

      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      };
    }

    let classes = [];

    if (this.state.persons.length <= 1) {
      classes.push('red');
    }

    if (this.state.persons.length <= 2) {
      classes.push('bold');
    }

    return (
      <div className="App">
       <h1 className={classes.join(' ')}>Hi, I'm a react app.</h1>
       <button style={style} onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {persons}
      </div>
    );
  }
}

// Example of higher order components
export default Radium(App);