// app/actions/modal.js
// -------------------
// Noticiaiton Actions
// - Show
// - Dismiss

// Constants
import ActionTypes from '../constants/ActionTypes';

const {
  NOTIFICATION_RECEIVED,
  NOTIFICATION_DISMISS,
} = ActionTypes;

export function addNotification(payload) {
  return {
    type: NOTIFICATION_RECEIVED,
    payload,
  };
}

// Dismiss Modal
export function removeNotification(payload) {
  return {
    type: NOTIFICATION_DISMISS,
    payload,
  };
}
