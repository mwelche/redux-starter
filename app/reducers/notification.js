// app/reducers/auth.js
// --------------------
// Authentication Reducer
// - Check Auth
// - Login
// - Logout

// Action Constants
import ActionTypes from '../constants/ActionTypes';

const {
  NOTIFICATION_RECEIVED,
  NOTIFICATION_DISMISS,
} = ActionTypes;
// Third Party
import { Map, List } from 'immutable';

const initialState = new Map({
  notifications: new List([]),
});

// notificaiton = {
//   content: '',
//   timestamp: <js time>
// }

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // Receive Notification
    case NOTIFICATION_RECEIVED:
      return state.update('notifications', notifications => notifications.push(action.payload));
    // Remove Notification
    case NOTIFICATION_DISMISS:
      return state.update('notifications', notifications => notifications.filter(n => n.timestamp !== action.payload));
    // Default
    default:
      return state;
  }
}
