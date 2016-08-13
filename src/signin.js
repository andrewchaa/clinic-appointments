import React, { PropTypes } from 'react';

const SignIn = (props) => {
  return(
    <div className="row">
      { !props.userId ?
        <button onClick={props.signIn} id="sign-in-button"
         className="btn btn-default {props.userId ? 'userId' : '' }">
          <i className="glyphicon glyphicon-play"></i> Sign in with Google
        </button>
        :
        <button onClick={props.signOut} className="btn btn-default">
          <i className="glyphicon glyphicon-play"></i> Sign out
        </button>
      }
    </div>
  )
}

export default SignIn;
