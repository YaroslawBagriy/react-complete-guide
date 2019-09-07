import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import withClass from '../hoc/withClass'
import Aux from '../hoc/Aux'
import AuthContext from '../context/auth-context'

// This container should only manage and manipulate its own state
// State of other components should be either passed in as a prop
// Or originated from the component itself

// Components should be narrowly focused
// They should have one specific purpose
 
// All containers be as lean as possible
// Some containers may not even have CSS
// Since the coontainer's components will do it all for them

// Stateful Components: Components/containers that manage state
// This does not necessarily mean that classes are stateful components
// But this is seen a lot, and is standard

// Presentational Components:  Historyiclly functional components
// Does not manage state 
// Since React 16.8, functional components can manage state
// You want to have many presentational components in your app
// It should be a majority. The reason is we need the app managable
// We know where the state changes, the other components only render
// Stateless components are modular and can be used anywhere
 

class App extends Component {
  constructor(props) {
    super(props);

  }

  state = {
    persons: [
      { id: '0', name: 'max', age: 28 },
      { id: '1', name: 'manu', age: 29 },
      { id: '2', name: 'steph', age: 23 },
    ],
    showPersons: false,
    showCockpit: true,
    authenticated: false
  }

  static getDerivedStateFromProps(props, state) {
    return state;
  }

  // componentWillMount() {

  // }

  componentDidMount() {
    console.log('[App.js] componentDidMount')
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate')
    return true
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate')
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

  loginHandler = () => {
    this.setState({authenticated: true});
  };

  render () {
    let persons = null;

    // Recommended way
    if (this.state.showPersons) {
      persons = <Persons 
                  persons={this.state.persons}
                  clicked={this.deletePersonsHandler}
                  changed={this.nameChangedHandler}
                  isAuthenticated={this.state.authenticated}
                  />;
    }

    let classesTitle = [];

    return (
      <Aux classes={classes.App}>
      <button onClick={() => {
        this.setState({ showCockpit: false });
      }}>Remove Cockpit</button>

      <AuthContext.Provider value={{authenticated: this.state.authenticated, login: this.loginHandler}}>
        { this.state.showCockpit ? ( 
          <Cockpit 
            showPersons={this.state.showPersons}
            personsLength={this.state.showPersons.length}
            persons={this.state.persons}
            clicked={this.togglePersonsHandler}
            login={this.loginHandler}
            />
        ) : null}
        {persons}
      </AuthContext.Provider>
      
      </Aux>
    );
  }
}

// Example of higher order components
export default withClass(App, classes.App);