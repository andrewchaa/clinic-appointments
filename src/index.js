import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import createLogger from 'redux-logger'

import { reducer as formReducer } from 'redux-form';
import userId from './reducers/userIdReducer';
import appointmentsReducer from './reducers/appointmentsReducer';
import App from './App';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

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
    <App />
  </Provider>,
  document.getElementById('root')
);
