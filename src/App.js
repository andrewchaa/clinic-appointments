import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import EntryForm from './appointment/form';
import SignIn from './signin';
import List from './appointment/list';

class App extends Component {

  componentDidMount() {
    firebase.auth().onAuthStateChanged(this.props.onAuthStateChanged);

    var commentsRef = firebase.database().ref('post-comments/' + postId);
    commentsRef.on('child_added', function(data) {
      addCommentElement(postElement, data.key, data.val().text, data.val().author);
    });

    commentsRef.on('child_changed', function(data) {
      setCommentValues(postElement, data.key, data.val().text, data.val().author);
    });

    commentsRef.on('child_removed', function(data) {
      deleteComment(postElement, data.key);
    });
  }

  render() {

    return (
      <div>
        <SignIn {...this.props} /><br />
        <List />
        <EntryForm {...this.props} />

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
