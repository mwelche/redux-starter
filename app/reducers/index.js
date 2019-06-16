// app/reducers/index.js

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './auth';
import modal from './modal';
import notification from './notification';

export default combineReducers({
  routing: routerReducer,
  auth,
  modal,
  notification,
});
