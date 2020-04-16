import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import './styles/welcome.css';
import { Redirect } from 'react-router-dom';

const Welcome = props => {
  const [verified, setVerified] = useState(false);
  const { setCurrentBoard } = props;

  useEffect(() => {
    // check if user already has a session
    fetch('/checkLogin')
      .then(resp => resp.json())
      .then(data => {
        console.log('DATA: ', data);
        // if user session has boardid, re-route them to /dashboard
        if (data.authorized === true) {
          setVerified(true);
          setCurrentBoard(data.boardId);
        }
      })
      .catch(err => console.log(err));
    // adds event listeners for sliding panel on login/signup
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
      container.classList.add('right-panel-active');
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove('right-panel-active');
    });
    return () => {
      signUpButton.removeEventListener('click', () => {
        container.classList.add('right-panel-active');
      });
      signInButton.removeEventListener('click', () => {
        container.classList.remove('right-panel-active');
      });
    };
  }, []);

  // handling of signup

  const handleSignUp = e => {
    e.preventDefault();

    const signUpInformation = {
      name: e.target.signUpBoard.value,
      username: e.target.signUpUser.value,
      password: e.target.signUpPass.value,
    };

    fetch('/auth/signup', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(signUpInformation),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.boardId) {
          setCurrentBoard(data.boardId);
        }

        if (data.authorized) {
          setVerified(true);
        }
      });
    // TO DO: HOW ARE WE HANDLING RESPONSE BACK FROM SERVER
    // SERVER SHOULD BE RETURNING A USERID# THEN REROUTING
    // HOW ARE WE STORING THAT IN STATE?
  };

  const handleSignIn = e => {
    e.preventDefault();

    const signInInformation = {
      username: e.target.signInUser.value,
      password: e.target.signInPass.value,
    };

    fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(signInInformation),
    })
      .then(res => res.json())
      .then(data => {
        if (data.boardId) {
          setCurrentBoard(data.boardId);
        }

        if (data.authorized) {
          setVerified(true);
        }
      });
    // TO DO: HOW ARE WE HANDLING RESPONSE BACK FROM SERVER
    // SERVER SHOULD BE RETURNING A USERID# THEN REROUTING
    // HOW ARE WE STORING THAT IN STATE?
  };

  if (verified) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <>
      <div className='container' id='container'>
        <div className='form-container sign-up-container'>
          <form onSubmit={e => handleSignUp(e)}>
            <h1 className='header'>Create A Board</h1>
            <span>Enter your information below</span>
            <input name='signUpBoard' type='text' placeholder='Name' />
            <input name='signUpUser' type='text' placeholder='Username' />
            {/* TO DO: DELAYED DB CHECK FOR EXISTING EMAIL???? */}
            <input name='signUpPass' type='password' placeholder='Password' />
            {/* TO DO: PASSWORD VALIDATION? */}
            <Button id='primary-signup' variant='contained' type='submit'>
              Sign Up
            </Button>
          </form>
        </div>
        <div className='form-container sign-in-container'>
          <form onSubmit={e => handleSignIn(e)}>
            <h1 className='header'>Sign in</h1>
            <span>Enter your email and password below</span>
            <input name='signInUser' type='text' placeholder='Username' />
            <input name='signInPass' type='password' placeholder='Password' />
            <Button id='primary-signin' variant='contained' type='submit'>
              Sign In
            </Button>
          </form>
        </div>
        <div className='overlay-container'>
          <div className='overlay'>
            <div className='overlay-panel overlay-left'>
              <h1>Welcome Back</h1>
              <p>Sign back in using the button below</p>
              <Button className='ghost' id='signIn' variant='outlined'>
                Sign In
              </Button>
            </div>
            <div className='overlay-panel overlay-right'>
              <h1>Hey! First time here?</h1>
              <p>Click the button below to quickly get started</p>
              <Button className='ghost' id='signUp' variant='outlined'>
                Create a Board
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
