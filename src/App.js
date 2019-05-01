import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

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
    let persons = null;
    let btnClass = null;

    // Recommended way
    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            // Always add a key property, allows dom to update onyl what it needs
            return <ErrorBoundary key={person.id}>
              <Person 
              name={person.name}
              age={person.age}
              key={person.id}
              click={() => this.deletePersonsHandler(index)}
              changed={(event) => this.nameChangedHandler(event, person.id)} />
            </ErrorBoundary>
          })}
          </div>
      );

      btnClass = classes.Red;
    }

    let classesTitle = [];

    if (this.state.persons.length <= 1) {
      classesTitle.push(classes.red);
    }

    if (this.state.persons.length <= 2) {
      classesTitle.push(classes.bold);
    }

    return (
      <div className={classes.App}>
          <h1 className={classesTitle.join(' ')}>Hi, I'm a react app.</h1>
          <button 
            className={btnClass}
            onClick={this.togglePersonsHandler}>Toggle Persons</button>
            {persons}
        </div>
    );
  }
}

// Example of higher order components
export default App;