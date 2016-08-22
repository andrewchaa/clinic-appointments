import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import createLogger from 'redux-logger'
import { reducer as formReducer } from 'redux-form';
import { Router, Route, browserHistory } from 'react-router';

import userId from './reducers/userIdReducer';
import appointmentsReducer from './reducers/appointmentsReducer';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'

var rootReducer = combineReducers({
  form: formReducer,
  userId,
  appointments: appointmentsReducer
});

const loggerMiddleware = createLogger();

let store = createStore(rootReducer, {},
  compose(applyMiddleware(loggerMiddleware), window.devToolsExtension ? window.devToolsExtension() : f => f)
)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
