// tests/universal/reducers/subscription.spec.js

import { expect } from 'chai';
import { fromJS, Map } from 'immutable';
import ActionTypes from '../../../app/constants/ActionTypes';

const {
  AUTH_LOGOUT_SUCCESS,
  SUBSCRIPTION_GETPLANS_REQUEST,
  SUBSCRIPTION_GETPLANS_SUCCESS,
  SUBSCRIPTION_GETPLANS_FAILURE,
  SUBSCRIPTION_MYPLAN_REQUEST,
  SUBSCRIPTION_MYPLAN_SUCCESS,
  SUBSCRIPTION_MYPLAN_FAILURE,
  SUBSCRIPTION_SUBSCRIBE_REQUEST,
  SUBSCRIPTION_SUBSCRIBE_SUCCESS,
  SUBSCRIPTION_SUBSCRIBE_FAILURE,
  SUBSCRIPTION_CHANGEPLAN_REQUEST,
  SUBSCRIPTION_CHANGEPLAN_SUCCESS,
  SUBSCRIPTION_CHANGEPLAN_FAILURE,
  SUBSCRIPTION_CANCEL_REQUEST,
  SUBSCRIPTION_CANCEL_SUCCESS,
  SUBSCRIPTION_CANCEL_FAILURE,
} = ActionTypes;

// Reducer
import subscription from '../../../app/reducers/subscription';

describe('REDUCER: subscription', () => {
  // INITIAL STATE
  it('should return the initial state', () => {
    // Expected Initial state

    const expectedInitialState = new Map({
      error: null,
      plans: null,
      loading: false,
      loaded: false,
      myplan: null,
    });

    expect(subscription(undefined, {})).to.deep.equal(expectedInitialState);
  });

  // SUBSCRIPTION_GETPLANS_REQUEST
  it('should handle SUBSCRIPTION_GETPLANS_REQUEST', () => {
    // Initial state
    const initialState = new Map({
      loading: false,
    });

    // Action
    const type = SUBSCRIPTION_GETPLANS_REQUEST;
    const action = {
      type,
    };

    // Expected Result
    const expectedState = {
      loading: true,
    };

    expect(subscription(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // SUBSCRIPTION_GETPLANS_SUCCESS
  it('should handle SUBSCRIPTION_GETPLANS_SUCCESS', () => {
    // Initial state
    const initialState = new Map({
      loading: true,
      loaded: false,
      plans: null,
    });

    // Action
    const type = SUBSCRIPTION_GETPLANS_SUCCESS;
    const result = {
      data: {

      },
    };
    const action = {
      type,
      result,
    };

    // Expected Result
    const expectedState = {
      loading: false,
      loaded: true,
      plans: fromJS(action.result.data),
    };

    expect(subscription(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // SUBSCRIPTION_GETPLANS_FAILURE
  it('should handle SUBSCRIPTION_GETPLANS_FAILURE', () => {
    // Initial state
    const initialState = new Map({
      loading: true,
      loaded: false,
      error: null,
    });

    // Action
    const type = SUBSCRIPTION_GETPLANS_FAILURE;
    const error = {
      message: 'Error!',
      statusCode: 412,
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

    expect(subscription(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // SUBSCRIPTION_MYPLAN_REQUEST
  it('should handle SUBSCRIPTION_MYPLAN_REQUEST', () => {
    // Initial state
    const initialState = new Map({
      loading: false,
    });

    // Action
    const type = SUBSCRIPTION_MYPLAN_REQUEST;
    const action = {
      type,
    };

    // Expected Result
    const expectedState = {
      loading: true,
    };

    expect(subscription(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // SUBSCRIPTION_MYPLAN_SUCCESS
  it('should handle SUBSCRIPTION_MYPLAN_SUCCESS', () => {
    // Initial state
    const initialState = new Map({
      loading: true,
      loaded: false,
      myplan: null,
    });

    // Action
    const type = SUBSCRIPTION_MYPLAN_SUCCESS;
    const result = {
      data: {

      },
    };
    const action = {
      type,
      result,
    };

    // Expected Result
    const expectedState = {
      loading: false,
      loaded: true,
      myplan: fromJS(action.result.data),
    };

    expect(subscription(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // SUBSCRIPTION_MYPLAN_FAILURE
  it('should handle SUBSCRIPTION_MYPLAN_FAILURE', () => {
    // Initial state
    const initialState = new Map({
      loading: true,
      loaded: false,
      error: null,
    });

    // Action
    const type = SUBSCRIPTION_MYPLAN_FAILURE;
    const error = {
      message: 'Error!',
      statusCode: 412,
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

    expect(subscription(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // SUBSCRIPTION_SUBSCRIBE_REQUEST
  it('should handle SUBSCRIPTION_SUBSCRIBE_REQUEST', () => {
    // Initial state
    const initialState = new Map({
      loading: false,
    });

    // Action
    const type = SUBSCRIPTION_SUBSCRIBE_REQUEST;
    const action = {
      type,
    };

    // Expected Result
    const expectedState = {
      loading: true,
    };

    expect(subscription(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // SUBSCRIPTION_SUBSCRIBE_SUCCESS
  it('should handle SUBSCRIPTION_SUBSCRIBE_SUCCESS', () => {
    // Initial state
    const initialState = new Map({
      loading: true,
      loaded: false,
    });

    // Action
    const type = SUBSCRIPTION_SUBSCRIBE_SUCCESS;
    const action = {
      type,
    };

    // Expected Result
    const expectedState = {
      loading: false,
      loaded: true,
    };

    expect(subscription(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // SUBSCRIPTION_SUBSCRIBE_FAILURE
  it('should handle SUBSCRIPTION_SUBSCRIBE_FAILURE', () => {
    // Initial state
    const initialState = new Map({
      loading: true,
      loaded: false,
      error: null,
    });

    // Action
    const type = SUBSCRIPTION_SUBSCRIBE_FAILURE;
    const error = {
      message: 'Error!',
      statusCode: 412,
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

    expect(subscription(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // SUBSCRIPTION_CHANGEPLAN_REQUEST
  it('should handle SUBSCRIPTION_CHANGEPLAN_REQUEST', () => {
    // Initial state
    const initialState = new Map({
      loading: false,
    });

    // Action
    const type = SUBSCRIPTION_CHANGEPLAN_REQUEST;
    const action = {
      type,
    };

    // Expected Result
    const expectedState = {
      loading: true,
    };

    expect(subscription(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // SUBSCRIPTION_CHANGEPLAN_SUCCESS
  it('should handle SUBSCRIPTION_CHANGEPLAN_SUCCESS', () => {
    // Initial state
    const initialState = new Map({
      loading: true,
      loaded: false,
      myplan: null,
    });

    // Action
    const type = SUBSCRIPTION_CHANGEPLAN_SUCCESS;
    const result = {
      data: {

      },
    };
    const action = {
      type,
      result,
    };

    // Expected Result
    const expectedState = {
      loading: false,
      loaded: true,
      myplan: fromJS(action.result.data),
    };

    expect(subscription(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // SUBSCRIPTION_CHANGEPLAN_FAILURE
  it('should handle SUBSCRIPTION_CHANGEPLAN_FAILURE', () => {
    // Initial state
    const initialState = new Map({
      loading: true,
      loaded: false,
      error: null,
    });

    // Action
    const type = SUBSCRIPTION_CHANGEPLAN_FAILURE;
    const error = {
      message: 'Error!',
      statusCode: 412,
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

    expect(subscription(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // SUBSCRIPTION_CANCEL_REQUEST
  it('should handle SUBSCRIPTION_CANCEL_REQUEST', () => {
    // Initial state
    const initialState = new Map({
      loading: false,
    });

    // Action
    const type = SUBSCRIPTION_CANCEL_REQUEST;
    const action = {
      type,
    };

    // Expected Result
    const expectedState = {
      loading: true,
    };

    expect(subscription(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // SUBSCRIPTION_CANCEL_SUCCESS
  it('should handle SUBSCRIPTION_CANCEL_SUCCESS', () => {
    // Initial state
    const initialState = new Map({
      loading: true,
      loaded: false,
    });

    // Action
    const type = SUBSCRIPTION_CANCEL_SUCCESS;
    const action = {
      type,
    };

    // Expected Result
    const expectedState = {
      loading: false,
      loaded: true,
    };

    expect(subscription(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // SUBSCRIPTION_CANCEL_FAILURE
  it('should handle SUBSCRIPTION_CANCEL_FAILURE', () => {
    // Initial state
    const initialState = new Map({
      loading: true,
      loaded: false,
      error: null,
    });

    // Action
    const type = SUBSCRIPTION_CANCEL_FAILURE;
    const error = {
      message: 'Error!',
      statusCode: 412,
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

    expect(subscription(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // AUTH_LOGOUT_SUCCESS
  it('should handle AUTH_LOGOUT_SUCCESS', () => {
    // Initial state
    const initialState = new Map({
      loaded: true,
      myplan: new Map({}),
    });

    // Action
    const type = AUTH_LOGOUT_SUCCESS;
    const action = {
      type,
    };

    // Expected Result
    const expectedState = {
      loaded: false,
      myplan: null,
    };

    expect(subscription(initialState, action)).to.deep.equal(fromJS(expectedState));
  });
});
