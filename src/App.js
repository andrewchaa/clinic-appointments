import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import AppointmentForm from './AppointmentForm';
import SplashPage from './SplashPage';

class App extends Component {

  componentDidMount() {
    firebase.auth().onAuthStateChanged(this.props.onAuthStateChanged);
  }

  render() {

    return (
      <div>
        <AppointmentForm {...this.props} />
        <SplashPage {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.userId
  };
}

const mapDispatchToProps = function(dispatch) {
  return {
    handleClick() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider);
    },
    onAuthStateChanged: (user) => {
      console.log(user);
      dispatch({
        type: 'User_Id_Changed',
        userId: user.uid
      });
    },
    testFunction: function() {
      console.log('test');
    }
  }
}

App = connect(mapStateToProps, mapDispatchToProps)(App)

export default App;
