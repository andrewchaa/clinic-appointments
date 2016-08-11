import React, { PropTypes } from 'react';

const SplashPage = (props) => {
  return (
    <section id="page-splash">
      <h3 className="logo">Database Web Quickstart</h3>
      <div>
        <button onClick={props.handleClick} id="sign-in-button" className="btn btn-default">
          <i className="glyphicon glyphicon-play"></i> Sign in with Google
        </button>
      </div>
    </section>
  )
}

export default SplashPage;
