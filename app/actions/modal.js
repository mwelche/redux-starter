// app/actions/modal.js
// -------------------
// Modal Actions
// - Show
// - Dismiss

// Constants
import ActionTypes from '../constants/ActionTypes';

const {
  MODAL_RECEIVED,
  MODAL_DISMISS,
} = ActionTypes;

/*
 * Show Modal in overlay
 * @payload Object:
 *  {
 *    component: React.Component
 *    rootClose: Boolean (optional)
 *  }
 */
export function showModal(payload) {
  return {
    type: MODAL_RECEIVED,
    payload,
  };
}

// Dismiss Modal
export function closeModal() {
  return {
    type: MODAL_DISMISS,
  };
}
