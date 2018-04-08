/* eslint-disable import/default */
require("babel-core/register");
require("babel-polyfill");

require('./favicon.ico');

import './styles.scss';
import 'flexboxgrid/css/flexboxgrid.css';
import 'font-awesome/css/font-awesome.css';

import App from './containers/App';
import React from 'react';
import routes from './routes';
import {render} from 'react-dom';
import createStore from './store/createStore'
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Router, browserHistory} from 'react-router';

window.__INITIAL_STATE__ = JSON.parse(localStorage.getItem('critsit') || '{}')
const store = createStore(window.__INITIAL_STATE__)
store.subscribe(() => {
  const state = store.getState()
  const storeState = {
    auth: state.auth,
  }
  
  localStorage.setItem('critsit', JSON.stringify(storeState))
})

injectTapEventPlugin();

render(
  <App store={store}>
    <Router store={store} routes={routes(store)} history={browserHistory} />
  </App>,

  document.getElementById('app')
);
