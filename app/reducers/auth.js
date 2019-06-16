// app/reducers/auth.js
// --------------------
// Authentication Reducer
// - Check Auth
// - Login
// - Logout
// - Disable Account

// Action Constants
import ActionTypes from '../constants/ActionTypes';

const {
  AUTH_LOAD_REQUEST,
  AUTH_LOAD_SUCCESS,
  AUTH_LOAD_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAILURE,
  ACCOUNT_UPDATE_REQUEST,
  ACCOUNT_UPDATE_SUCCESS,
  ACCOUNT_UPDATE_FAILURE,
  ACCOUNT_CHANGEPW_REQUEST,
  ACCOUNT_CHANGEPW_SUCCESS,
  ACCOUNT_CHANGEPW_FAILURE,
} = ActionTypes;
// Third Party
import { Map, fromJS } from 'immutable';
import Storage from '../utils/Storage';

const initialState = new Map({
  error: null,
  loaded: false,
  loading: false,
  loggingIn: false,
  loggingOut: false,
  token: null,
  user: null,
});

export default function reducer(state = initialState, action = {}) {
  // console.log('auth reducer', action)
  switch (action.type) {
    // Load
    case AUTH_LOAD_REQUEST:
      return state.set('loading', true);

    case AUTH_LOAD_SUCCESS:
      return state.merge(new Map({
        loading: false,
        loaded: true,
        user: fromJS(action.result),
      }));

    case AUTH_LOAD_FAILURE:
      return state.merge(new Map({
        loading: false,
        loaded: true,
        error: fromJS(action.error),
      }));

    // Login
    case AUTH_LOGIN_REQUEST:
      return state.set('loggingIn', true);

    case AUTH_LOGIN_SUCCESS:
      return state.merge(new Map({
        loggingIn: false,
        token: fromJS(action.result),
      }));

    case AUTH_LOGIN_FAILURE:
      return state.merge(new Map({
        loggingIn: false,
        token: null,
        error: fromJS(action.error),
      }));

    // Logout
    case AUTH_LOGOUT_REQUEST:
      return state.set('loggingOut', true);

    case AUTH_LOGOUT_SUCCESS:
      Storage.remove('token_magic', { path: '/' });

      return state.merge(new Map({
        loaded: false,
        loggingOut: false,
        token: null,
        user: null,
      }));

    case AUTH_LOGOUT_FAILURE:
      return state.merge(new Map({
        loggingOut: false,
        error: fromJS(action.error),
      }));


    // Update Profile
    case ACCOUNT_UPDATE_REQUEST:
      return state.set('loading', true);

    case ACCOUNT_UPDATE_SUCCESS:
      return state.merge(new Map({
        loading: false,
        loaded: true,
        user: fromJS(action.result.data.user),
      }));

    case ACCOUNT_UPDATE_FAILURE:
      return state.merge(new Map({
        loading: false,
        loaded: true,
        error: fromJS(action.error),
      }));

    // Default
    default:
      return state;
  }
}
