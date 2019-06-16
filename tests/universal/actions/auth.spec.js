// tests/universal/actions/subscription.spec.js
import configureMockStore from 'redux-mock-store';
import clientMiddleware from './MockMiddleware';
import MockClient from './MockClient';
import { expect } from 'chai';
import { Map } from 'immutable';
import ActionTypes from '../../../app/constants/ActionTypes';

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

import {
  isLoaded,
  load,
  login,
  reset,
  logout,
  update,
  changePassword,
  deactivate,
  verify,
} from '../../../app/actions/auth';

const client = new MockClient();
const middlewares = [clientMiddleware(client)];
const mockStore = configureMockStore(middlewares);
const store = mockStore(new Map({
  error: null,
  loaded: false,
  loading: false,
  loggingIn: false,
  loggingOut: false,
  token: null,
  user: null,
  proxyUser: null,
}));

describe('ACTIONS: auth', () => {
  afterEach(() => {
    client.reset();
    store.clearActions();
  });

  it('should expect isLoaded return false', () => {
    const globalState = {
      auth: store.getState(),
    };

    expect(isLoaded(globalState)).to.equal(false);
  });

  it('should expect AUTH_LOAD_REQUEST & AUTH_LOAD_SUCCESS', () => {
    client.getOnce('/me', { body: {} });

    const expectedActions = [
      { type: AUTH_LOAD_REQUEST },
      { type: AUTH_LOAD_SUCCESS, result: {} },
    ];

    return store.dispatch(load()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('should expect AUTH_LOAD_REQUEST & AUTH_LOAD_FAILURE', () => {
    client.getOnce('/me', { error: 'some error' });

    const expectedActions = [
      { type: AUTH_LOAD_REQUEST },
      { type: AUTH_LOAD_FAILURE, error: 'some error' },
    ];

    return store.dispatch(load()).catch(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('should expect AUTH_LOGIN_REQUEST & AUTH_LOGIN_SUCCESS', () => {
    const payload = {
      email: 'user@test.com',
      password: '1234',
    };
    const result = {
      data: {},
    };
    client.postOnce('/auth', { body: result });

    const expectedActions = [
      {
        type: AUTH_LOGIN_REQUEST,
        data: payload,
      },
      {
        type: AUTH_LOGIN_SUCCESS,
        result,
      },
    ];

    return store.dispatch(login(payload)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('should expect AUTH_LOGIN_REQUEST & AUTH_LOGIN_FAILURE', () => {
    const payload = {
      email: 'notauser@test.com',
      password: 'wrongpassword',
    };
    const error = {
      message: 'some error',
    };
    client.postOnce('/auth', { error });

    const expectedActions = [
      {
        type: AUTH_LOGIN_REQUEST,
        data: payload,
      },
      {
        type: AUTH_LOGIN_FAILURE,
        error,
      },
    ];

    return store.dispatch(login(payload)).catch(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('should expect AUTH_RESET_REQUEST & AUTH_RESET_SUCCESS', () => {
    const payload = {
      password: '1234',
      token: 'abc12345',
    };
    const result = {
      data: {},
    };
    client.postOnce('/auth/reset', { body: result });

    const expectedActions = [
      {
        type: AUTH_RESET_REQUEST,
        data: payload,
      },
      {
        type: AUTH_RESET_SUCCESS,
        result,
      },
    ];

    return store.dispatch(reset(payload)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('should expect AUTH_RESET_REQUEST & AUTH_RESET_FAILURE', () => {
    const payload = {
      password: '1234',
      token: 'invalidtoken',
    };
    const error = {
      message: 'some error',
    };
    client.postOnce('/auth/reset', { error });

    const expectedActions = [
      {
        type: AUTH_RESET_REQUEST,
        data: payload,
      },
      {
        type: AUTH_RESET_FAILURE,
        error,
      },
    ];

    return store.dispatch(reset(payload)).catch(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('should expect AUTH_LOGOUT_REQUEST & AUTH_LOGOUT_SUCCESS', () => {
    const result = {
      data: {},
    };
    client.postOnce('/auth/logout', { body: result });

    const expectedActions = [
      { type: AUTH_LOGOUT_REQUEST },
      {
        type: AUTH_LOGOUT_SUCCESS,
        result,
      },
    ];

    return store.dispatch(logout()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('should expect AUTH_LOGOUT_REQUEST & AUTH_LOGOUT_FAILURE', () => {
    const error = {
      message: 'some error',
    };
    client.postOnce('/auth/logout', { error });

    const expectedActions = [
      { type: AUTH_LOGOUT_REQUEST },
      {
        type: AUTH_LOGOUT_FAILURE,
        error,
      },
    ];

    return store.dispatch(logout()).catch(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('should expect ACCOUNT_UPDATE_REQUEST & ACCOUNT_UPDATE_SUCCESS', () => {
    const payload = {
      name: 'tester',
    };
    const result = {
      data: {
        name: 'tester',
      },
    };
    client.putOnce('/me', { body: result });

    const expectedActions = [
      {
        type: ACCOUNT_UPDATE_REQUEST,
        data: payload,
      },
      {
        type: ACCOUNT_UPDATE_SUCCESS,
        result,
      },
    ];

    return store.dispatch(update(payload)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('should expect ACCOUNT_UPDATE_REQUEST & ACCOUNT_UPDATE_FAILURE', () => {
    const payload = {
      name: 'tester',
    };
    const error = {
      message: 'some error',
    };
    client.putOnce('/me', { error });

    const expectedActions = [
      {
        type: ACCOUNT_UPDATE_REQUEST,
        data: payload,
      },
      {
        type: ACCOUNT_UPDATE_FAILURE,
        error,
      },
    ];

    return store.dispatch(update(payload)).catch(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('should expect ACCOUNT_CHANGEPW_REQUEST & ACCOUNT_CHANGEPW_SUCCESS', () => {
    const payload = {
      old_password: '1234',
      new_password: 'abcd',
      confirm_password: 'abcd',
    };
    const result = {
      data: true,
    };
    client.putOnce('/me/password', { body: result });

    const expectedActions = [
      {
        type: ACCOUNT_CHANGEPW_REQUEST,
        data: payload,
      },
      {
        type: ACCOUNT_CHANGEPW_SUCCESS,
        result,
      },
    ];

    return store.dispatch(changePassword(payload)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('should expect ACCOUNT_CHANGEPW_REQUEST & ACCOUNT_CHANGEPW_FAILURE', () => {
    const payload = {
      old_password: '1234',
      new_password: '1234',
      confirm_password: '1234',
    };
    const error = {
      message: 'same password',
    };
    client.putOnce('/me/password', { error });

    const expectedActions = [
      {
        type: ACCOUNT_CHANGEPW_REQUEST,
        data: payload,
      },
      {
        type: ACCOUNT_CHANGEPW_FAILURE,
        error,
      },
    ];

    return store.dispatch(changePassword(payload)).catch(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('should expect ACCOUNT_DELETE_REQUEST & ACCOUNT_DELETE_SUCCESS', () => {
    const result = {};
    client.delOnce('/me', { body: result });

    const expectedActions = [
      { type: ACCOUNT_DELETE_REQUEST },
      {
        type: ACCOUNT_DELETE_SUCCESS,
        result,
      },
    ];

    return store.dispatch(deactivate()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('should expect ACCOUNT_DELETE_REQUEST & ACCOUNT_DELETE_FAILURE', () => {
    const error = {
      message: 'some error',
    };
    client.delOnce('/me', { error });

    const expectedActions = [
      { type: ACCOUNT_DELETE_REQUEST },
      {
        type: ACCOUNT_DELETE_FAILURE,
        error,
      },
    ];

    return store.dispatch(deactivate()).catch(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('should expect ACCOUNT_VERIFY_REQUEST & ACCOUNT_VERIFY_SUCCESS', () => {
    const payload = {
      code: 'abc12345',
      typeof: 'verify',
    };
    const result = {
      data: {},
    };

    client.postOnce('/auth/verify', { body: result });

    const expectedActions = [
      {
        type: ACCOUNT_VERIFY_REQUEST,
        data: payload,
      },
      {
        type: ACCOUNT_VERIFY_SUCCESS,
        result,
      },
    ];

    return store.dispatch(verify(payload)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('should expect ACCOUNT_VERIFY_REQUEST & ACCOUNT_VERIFY_FAILURE', () => {
    const payload = {
      code: 'invalidcode',
      typeof: 'verify',
    };
    const error = {
      message: 'some error',
    };

    client.postOnce('/auth/verify', { error });

    const expectedActions = [
      {
        type: ACCOUNT_VERIFY_REQUEST,
        data: payload,
      },
      {
        type: ACCOUNT_VERIFY_FAILURE,
        error,
      },
    ];

    return store.dispatch(verify(payload)).catch(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });
});
