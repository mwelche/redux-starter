// app/reducers/auth.js
// --------------------
// Authentication Reducer
// - Check Auth
// - Login
// - Logout

// Action Constants
import ActionTypes from '../constants/ActionTypes';

const {
  MODAL_RECEIVED,
  MODAL_DISMISS,
} = ActionTypes;
// Third Party
import { Map } from 'immutable';

const initialState = new Map({
  component: null,
  isActive: false,
  rootClose: true,
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // Receive Modal
    case MODAL_RECEIVED:
      return state.merge(new Map({
        component: action.payload.component,
        isActive: true,
        rootClose: typeof action.payload.rootClose !== 'undefined'
          ? action.payload.rootClose
          : true,
      }));

    // Close Modal
    case MODAL_DISMISS:
      return state.merge(initialState);

    // Default
    default:
      return state;
  }
}
