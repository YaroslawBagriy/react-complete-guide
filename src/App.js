import React, { useState } from 'react';
import './App.css';
import Person from './Person/Person';

const app = props => {
  const [ personsState, setPersonsState ] = useState({
    persons: [
      { name: 'max', age: 28 },
      { name: 'manu', age: 29 },
      { name: 'steph', age: 23 },
    ]
  });

  const switchNameHandler = (newName) => {
    setPersonsState({
      persons: [
        { name: newName, age: 28 },
        { name: 'manu', age: 29 },
        { name: 'steph', age: 23 },
      ]
    });
  };

  const nameChangedHandler = (event) => {
    setPersonsState({
      persons: [
        { name: event.target.value, age: 28 },
        { name: 'Manu', age: 29 },
        { name: 'steph', age: 23 },
      ]
    });
  }

  return (
    <div className="App">
     <h1>Hi, I'm a react app.</h1>
     <button className="ButtonSwitch" onClick={() => switchNameHandler('TestTest')}>Switch name</button>
     <Person 
        name={personsState.persons[0].name} 
        click={switchNameHandler.bind(this, 'MaxTest2')}
        changed={nameChangedHandler}>Comps</Person>
    </div>
  )
}

export default app;