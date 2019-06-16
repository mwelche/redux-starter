// app/actions/auth.js
// -------------------
// Authentication Actions
// - Token (request, success, failure)
// - Login (request, success, failure)
// - Logout (request, success, failure)

// Constants

import ActionTypes from '../constants/ActionTypes';

const {
  AUTH_LOAD_REQUEST,
  AUTH_LOAD_SUCCESS,
  AUTH_LOAD_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_RESET_REQUEST,
  AUTH_RESET_SUCCESS,
  AUTH_RESET_FAILURE,
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAILURE,
  ACCOUNT_UPDATE_REQUEST,
  ACCOUNT_UPDATE_SUCCESS,
  ACCOUNT_UPDATE_FAILURE,
  ACCOUNT_CHANGEPW_REQUEST,
  ACCOUNT_CHANGEPW_SUCCESS,
  ACCOUNT_CHANGEPW_FAILURE,
  ACCOUNT_DELETE_REQUEST,
  ACCOUNT_DELETE_SUCCESS,
  ACCOUNT_DELETE_FAILURE,
  ACCOUNT_VERIFY_REQUEST,
  ACCOUNT_VERIFY_SUCCESS,
  ACCOUNT_VERIFY_FAILURE,
} = ActionTypes;

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.get('loaded');
}

export function load() {
  return {
    types: [AUTH_LOAD_REQUEST, AUTH_LOAD_SUCCESS, AUTH_LOAD_FAILURE],
    promise: api => api.get('/me'),
  };
}

// Login or create account
// @payload Object
// email - String (required)
// password - String (required)
export function login({ email, username, password } = {}) {
  const payload = {
    password,
  };
  if (email) {
    payload.email = email;
  }
  if (username) {
    payload.username = username;
  }

  return {
    types: [AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE],
    promise: api => api.post('/auth', {
      data: payload,
    }),
  };
}

// Login or create account with social provider
// @payload Object
// provider - String (required)
// token - String (required)
// isLogin - Bool (required)
export function socialAuth({
  provider, token, isLogin, redirect_url,
} = {}) {
  const payload = {
    provider,
    token,
    isLogin,
    redirect_url,
  };

  return {
    types: [AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE],
    promise: api => api.post('/auth', {
      data: payload,
    }),
  };
}

/* Reset password
 * @payload Object
 * password - String (required)
 * token - String (required)
*/
export function reset({ password, token } = {}) {
  const payload = {
    password,
    token,
  };

  return {
    types: [AUTH_RESET_REQUEST, AUTH_RESET_SUCCESS, AUTH_RESET_FAILURE],
    promise: api => api.post('/auth/reset', {
      data: payload,
    }),
  };
}

export function logout() {
  return {
    types: [AUTH_LOGOUT_REQUEST, AUTH_LOGOUT_SUCCESS, AUTH_LOGOUT_FAILURE],
    promise: api => api.post('/auth/logout', {}),
  };
}


// Account/Profile Change Action

export function update(payload) {
  return {
    types: [ACCOUNT_UPDATE_REQUEST, ACCOUNT_UPDATE_SUCCESS, ACCOUNT_UPDATE_FAILURE],
    promise: api => api.put('/me', {
      data: payload,
    }),
  };
}

/* Change password
 * @payload Object
 * {
 *   old_password: password,
 *   new_password: newPassword,
 *   confirm_password: confirmNewPassword,
 * }
*/
export function changePassword(payload) {
  return {
    types: [ACCOUNT_CHANGEPW_REQUEST, ACCOUNT_CHANGEPW_SUCCESS, ACCOUNT_CHANGEPW_FAILURE],
    promise: api => api.put('/me/password', {
      data: payload,
    }),
  };
}

export function deactivate() {
  return {
    types: [ACCOUNT_DELETE_REQUEST, ACCOUNT_DELETE_SUCCESS, ACCOUNT_DELETE_FAILURE],
    promise: api => api.del('/me'),
  };
}

/*  Verify email
 *  @payload Object
 *  {
 *    code: String (required)
 *    typeof: String (required)
 *  }
*/
export function verify({ code, typeof: type } = {}) {
  const payload = {
    code,
    typeof: type,
  };

  return {
    types: [ACCOUNT_VERIFY_REQUEST, ACCOUNT_VERIFY_SUCCESS, ACCOUNT_VERIFY_FAILURE],
    promise: api => api.post('/auth/verify', {
      data: payload,
    }),
  };
}

