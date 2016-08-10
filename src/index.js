import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import createLogger from 'redux-logger'
import { reducer as formReducer } from 'redux-form';
import AppointmentForm from './AppointmentForm';
import './index.css';

var rootReducer = combineReducers({
  form: formReducer
});

const loggerMiddleware = createLogger();

let store = createStore(
  rootReducer,
  {},
  compose(applyMiddleware(loggerMiddleware), window.devToolsExtension ? window.devToolsExtension() : f => f)
)

const mapStateToProps = (state) => {
  return {
    appointmentDate: state.appointmentDate
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    test: () => console.log('test')
  }
}


class App extends Component {
  onAuthStateChanged() {
    console.log('test');
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  handleClick() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  render() {
    return (
      <div>
        <AppointmentForm {...this.props} />
        <section id="page-splash">
          <h3 className="logo">Database Web Quickstart</h3>
          <div>
            <button onClick={this.handleClick} id="sign-in-button" className="btn btn-default">
              <i className="glyphicon glyphicon-play"></i> Sign in with Google
            </button>
            <button onClick={e=>test()}>Test</button>
          </div>
        </section>

      </div>
    );
  }
}

const ConnectedRootComponent = connect(mapStateToProps, mapDispatchToProps)(App)

// App = connect(mapStateToProps, mapDispatchToProps) (App);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
