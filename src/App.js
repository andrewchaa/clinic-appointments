import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import AppointmentForm from './AppointmentForm';
import SignIn from './signin';

class App extends Component {

  componentDidMount() {
    firebase.auth().onAuthStateChanged(this.props.onAuthStateChanged);
  }

  render() {

    return (
      <div>
        <SignIn {...this.props} /><br />
        <AppointmentForm {...this.props} />

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
    signIn() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider);
    },
    signOut() {
      firebase.auth().signOut();
      dispatch({
        type: 'User_Id_Changed',
        userId: ''
      })
    },
    onAuthStateChanged: (user) => {
      dispatch({
        type: 'User_Id_Changed',
        userId: user.uid
      });
    }
  }
}

App = connect(mapStateToProps, mapDispatchToProps)(App)

export default App;
