import React, { Component } from 'react';
import { connect } from 'react-redux';
import EntryForm from './appointment/form';
import SignIn from './signin';
import List from './appointment/list';

class App extends Component {

  componentDidMount() {
    firebase.auth().onAuthStateChanged(this.props.onAuthStateChanged);

    var appointmentsRef = firebase.database().ref('appointments/' + this.props.userId);
    appointmentsRef.on('child_added', this.props.populateList);
    appointmentsRef.on('child_changed', this.props.updateList);

  }

  render() {

    return (
      <div>
        <SignIn {...this.props} /><br />
        <List {...this.props} />
        <EntryForm {...this.props} />

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
    appointments: state.appointments
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
    },
    populateList(data) {
      data.forEach(function(ap) {
        var appointment = ap.val();
        appointment.key = ap.key;
        dispatch({
          type: 'appointment-added',
          appointment: appointment
        });
      })
      window.data = data;
    },
    updateList(data) {
      var appointments = [];
      data.forEach(function(ap) {
        var appointment = ap.val();
        appointment.key = ap.key;
        appointments.push(appointment);
      })

      dispatch({ type: 'appointment-changed', appointments})
    },
    deleteAppointment(userId, key) {
      var ref = firebase.database().ref('appointments/' + userId + '/' + key)
      ref.remove();
    }
  }
}

App = connect(mapStateToProps, mapDispatchToProps)(App)

export default App;
