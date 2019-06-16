// tests/universal/reducers/auth.spec.js
import ActionTypes from '../../../app/constants/ActionTypes';

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
} = ActionTypes;
import auth from '../../../app/reducers/auth';
import { expect } from 'chai';
import { fromJS, Map } from 'immutable';

const exampleToken = 'abc';

describe('REDUCER: auth', () => {
  // INITIAL STATE
  it('should return the initial state', () => {
    // Expected Initial state
    const expectedInitialState = new Map({
      error: null,
      loaded: false,
      loading: false,
      loggingIn: false,
      loggingOut: false,
      token: null,
      user: null,
      proxyUser: null,
    });

    expect(auth(undefined, {})).to.deep.equal(expectedInitialState);
  });

  // AUTH_LOAD
  it('should handle AUTH_LOAD_REQUEST', () => {
    // Initial state
    const initialState = new Map({
      loading: false,
    });

    // Action
    const type = AUTH_LOAD_REQUEST;
    const action = {
      type,
    };

    // Expected Result
    const expectedState = {
      loading: true,
    };

    expect(auth(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  it('should handle AUTH_LOAD_FAILURE', () => {
    // Initial state
    const initialState = new Map({});

    // Action
    const type = AUTH_LOAD_FAILURE;
    const error = {
      message: 'Error!',
      statusCode: 500,
    };
    const action = {
      type,
      error,
    };

    // Expected Result
    const expectedState = {
      loading: false,
      loaded: true,
      error: fromJS(action.error),
    };

    expect(auth(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  it('should handle AUTH_LOAD_SUCCESS: Registered User', () => {
    // Initial state
    const initialState = new Map({});

    // Action
    const type = AUTH_LOAD_SUCCESS;
    const result = {
      typeof: 'registered_user',
    };
    const action = {
      type,
      result,
    };

    // Expected Result
    const expectedState = {
      loading: false,
      loaded: true,
      user: fromJS(action.result),
      proxyUser: null,
    };

    expect(auth(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  it('should handle AUTH_LOAD_SUCCESS: Proxy User', () => {
    // Initial state
    const initialState = new Map({});

    // Action
    const type = AUTH_LOAD_SUCCESS;
    const result = {
      typeof: 'proxy_user',
    };
    const action = {
      type,
      result,
    };

    // Expected Result
    const expectedState = {
      loading: false,
      loaded: true,
      user: null,
      proxyUser: fromJS(action.result),
    };

    expect(auth(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // AUTH_LOGIN
  it('should handle AUTH_LOGIN_REQUEST', () => {
    // Initial state
    const initialState = new Map({
      loggingIn: false,
    });

    // Action
    const type = AUTH_LOGIN_REQUEST;
    const action = {
      type,
    };

    // Expected Result
    const expectedState = {
      loggingIn: true,
    };

    expect(auth(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  it('should handle AUTH_LOGIN_FAILURE', () => {
    // Initial state
    const initialState = new Map({});

    // Action
    const type = AUTH_LOGIN_FAILURE;
    const error = {
      message: 'Error!',
      statusCode: 500,
    };
    const action = {
      type,
      error,
    };

    // Expected Result
    const expectedState = {
      loggingIn: false,
      token: null,
      error: fromJS(action.error),
    };

    expect(auth(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  it('should handle AUTH_LOGIN_SUCCESS', () => {
    // Initial state
    const initialState = new Map({});

    // Action
    const type = AUTH_LOGIN_SUCCESS;
    const result = exampleToken;
    const action = {
      type,
      result,
    };

    // Expected Result
    const expectedState = {
      loggingIn: false,
      token: fromJS(action.result),
    };

    expect(auth(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // AUTH_LOGOUT
  it('should handle AUTH_LOGOUT_REQUEST', () => {
    // Initial state
    const initialState = new Map({
      loggingOut: false,
    });

    // Action
    const type = AUTH_LOGOUT_REQUEST;
    const action = {
      type,
    };

    // Expected Result
    const expectedState = {
      loggingOut: true,
    };

    expect(auth(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  it('should handle AUTH_LOGOUT_FAILURE', () => {
    // Initial state
    const initialState = new Map({
      error: null,
      loggingOut: true,
      proxyUser: null,
      token: exampleToken,
      user: fromJS({}),
    });

    // Action
    const type = AUTH_LOGOUT_FAILURE;
    const error = {
      message: 'Error!',
      statusCode: 500,
    };
    const action = {
      type,
      error,
    };

    // Expected Result
    const expectedState = {
      error: fromJS(action.error),
      loggingOut: false,
      proxyUser: null,
      token: exampleToken,
      user: fromJS({}),
    };

    expect(auth(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  it('should handle AUTH_LOGOUT_SUCCESS', () => {
    // Initial state
    const initialState = new Map({
      loaded: true,
      loggingOut: true,
      proxyUser: null,
      token: exampleToken,
      user: fromJS({}),
    });

    // Action
    const type = AUTH_LOGOUT_SUCCESS;
    const action = {
      type,
    };

    // Expected Result
    const expectedState = {
      loaded: false,
      loggingOut: false,
      proxyUser: null,
      token: null,
      user: null,
    };

    expect(auth(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // AUTH_UPDATE
  it('should handle ACCOUNT_UPDATE_REQUEST', () => {
    // Initial state
    const initialState = new Map({
      loading: false,
    });

    // Action
    const type = ACCOUNT_UPDATE_REQUEST;
    const action = {
      type,
    };

    // Expected Result
    const expectedState = {
      loading: true,
    };

    expect(auth(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  it('should handle ACCOUNT_UPDATE_FAILURE', () => {
    // Initial state
    const initialState = new Map({
      loaded: false,
      loading: true,
      user: fromJS({}),
    });

    // Action
    const type = ACCOUNT_UPDATE_FAILURE;
    const error = {
      message: 'Error!',
      statusCode: 500,
    };
    const action = {
      type,
      error,
    };

    // Expected Result
    const expectedState = {
      error: fromJS(action.error),
      loaded: true,
      loading: false,
      user: fromJS({}),
    };

    expect(auth(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  it('should handle ACCOUNT_UPDATE_SUCCESS', () => {
    // Initial state
    const initialState = new Map({
      loaded: true,
      loading: true,
      user: fromJS({}),
    });

    // Action
    const type = ACCOUNT_UPDATE_SUCCESS;
    const action = {
      type,
      result: {
        data: {
          user: {
            username: 'bob',
          },
        },
      },
    };

    // Expected Result
    const expectedState = {
      loaded: true,
      loading: false,
      user: fromJS(action.result.data.user),
    };

    expect(auth(initialState, action)).to.deep.equal(fromJS(expectedState));
  });
});
