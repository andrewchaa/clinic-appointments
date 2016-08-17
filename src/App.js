import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import EntryForm from './appointment/form';
import SignIn from './signin';
import List from './appointment/list';

class App extends Component {

  componentDidMount() {
    firebase.auth().onAuthStateChanged(this.props.onAuthStateChanged);

    var appointmentsRef = firebase.database().ref('user-appointments/' + this.props.userId);
    appointmentsRef.on('child_added', this.props.populateList);

    // appointmentsRef.on('child_changed', function(data) {
    //   setCommentValues(postElement, data.key, data.val().text, data.val().author);
    // });
    //
    // appointmentsRef.on('child_removed', function(data) {
    //   deleteComment(postElement, data.key);
    // });
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
        console.log(ap.key);
        console.log(ap.val());
        dispatch({
          type: 'appointment-added',
          appointment: ap.val()
        });
      })
      window.data = data;

      // addCommentElement(postElement, data.key, data.val().text, data.val().author);
    }
  }
}

App = connect(mapStateToProps, mapDispatchToProps)(App)

export default App;
