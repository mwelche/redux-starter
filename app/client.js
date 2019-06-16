// app/client.js

/* eslint no-console: 0 */

// Pollyfills
import 'core-js/es6/map'; // Map recquired by React 16
import 'core-js/es6/set'; // Set recquired by React 16
import 'core-js/es6/promise'; // Promise polyfill required for ie11
import 'core-js/es7/object'; // Object.entries polyfill required
import 'raf/polyfill'; // requestAnimationFrame recquired by React 16
// React
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
// Helpers
import ApiClient from './utils/ApiClient';
import createStore from './redux/create';
// Routing
import getRoutes from './routes';
// Third Party
import useScroll from 'scroll-behavior/lib/useStandardScroll';
import { fromJS } from 'immutable';

const initialState = window.__INITIAL_DATA__;
window.__INITIAL_DATA__ = null;
console.log('INITIAL STATE', initialState);
// Convert initialState to Immutable.js object
// before client hydration
Object.keys(initialState).forEach((key) => {
  // reduxAsyncConnect does not yet support Immutable.js
  if (key !== 'reduxAsyncConnect') {
    initialState[key] = fromJS(initialState[key]);
  }
});

const options = { token: '' };
const client = new ApiClient(null, options);
const history = useScroll(() => browserHistory)();
const dest = document.getElementById('content');
const store = createStore(history, client, initialState);
const component = (
  <Router history={history}>
    {getRoutes(store, history, null, null, options)}
  </Router>
);

ReactDOM.hydrate(
  <Provider store={store} key="provider">
    {component}
  </Provider>,
  dest,
);

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger
  // TODO: debugger
}
