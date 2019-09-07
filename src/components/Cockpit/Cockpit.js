import React, { useEffect, useRef, useContext  } from 'react';

import classes from './Cockpit.css';
import AuthContext from '../../context/auth-context';

const cockpit = (props) => {
    const toggleBtnRef = useRef(null );
    const authContext = useContext(AuthContext);
    
    console.log(authContext.authenticated);

    useEffect( () => {
        console.log('[Cockpit.js] useEffect');
        // HTTP request
        // setTimeout(() => {
        //     alert('Saved data to cloud')
        // }, 1000);

        toggleBtnRef.current.click();

        return () => {
            console.log('[Cockpit.js] cleanup work in useEffect');
        }
    }, [props.persons]);

    useEffect( () => {
        console.log('[Cockpit.js] 2nd useEffect');

        return () => {
            console.log('[Cockpit.js] cleanup work in 2nd useEffect');
        }
    });

    const assignedClasses = [];
    let btnClass = '';

    if (props.showPersons) {
        btnClass = classes.Red;
    }

    if (props.personsLength <= 1) {
        assignedClasses.push( classes.red );
      }
  
    if (props.personsLength <= 2) {
        assignedClasses.push( classes.bold );
    }

    return (
        // Classes.Cockpit allows for scoped classes
        <div className={classes.Cockpit}>
            <h1 className={assignedClasses.join(' ')}>Hi, I'm a react app.</h1>
            <button 
                className={btnClass}
                ref={toggleBtnRef}
                onClick={props.clicked}>Toggle Persons
            </button>
            <button onClick={authContext.login}>Log In</button>
        </div>
    );
};

export default React.memo(cockpit);