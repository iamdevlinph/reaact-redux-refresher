import { render } from "react-dom";
import React from "react"
import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { Provider } from 'react-redux'

import App from './container/App'

const mathReducer = (state = {
  result: 1,
  lastvalues: []
}, action) => {
  switch (action.type) {
    case 'ADD':
      state = {
        ...state,
        result: state.result + action.payload,
        lastvalues: [...state.lastvalues, action.payload]
      }
      break;
    case 'SUBTRACT':
      state = {
        ...state,
        result: state.result - action.payload,
        lastvalues: [...state.lastvalues, action.payload]
      }
      break;
  }

  return state
}

const userReducer = (state = {
  name: 'Devlin',
  age: 20
}, action) => {
  switch (action.type) {
    case 'SET_NAME':
      state = {
        ...state,
        name: action.payload,
      }
      break;
    case 'SET_AGE':
      state = {
        ...state,
        age: action.payload
      }
      break;
  }

  return state
}

const myLogger = (store) => (next) => (action) => {
  console.log('logged action', action)
  next(action)
}

const store = createStore(
  combineReducers({ math: mathReducer, user: userReducer }),
  {},
  applyMiddleware(logger)
)

store.subscribe(() => {
  // console.log('store is updated', store.getState())
})

render(
  <Provider store={store}>
    <App />
  </Provider>,
  window.document.getElementById('app'));
