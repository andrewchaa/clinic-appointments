import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import createLogger from 'redux-logger'
import { reducer as formReducer } from 'redux-form';
import App from './App';
import './index.css';

var reducers = {
  form: formReducer
};

var rootReducer = combineReducers(reducers);

const loggerMiddleware = createLogger();

var configureStore = function configureStore(initialState) {
    const store = createStore(rootReducer, initialState, compose(
        applyMiddleware(
            loggerMiddleware
        ),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));
    return store;
};


ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById('root')
);
