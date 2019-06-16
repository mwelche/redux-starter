// tests/universal/reducers/product.spec.js

import { expect } from 'chai';
import { fromJS, Map } from 'immutable';
import ActionTypes from '../../../app/constants/ActionTypes';

const {
  PRODUCT_GETPRODUCTS_REQUEST,
  PRODUCT_GETPRODUCTS_SUCCESS,
  PRODUCT_GETPRODUCTS_FAILURE,
  PRODUCT_BUY_REQUEST,
  PRODUCT_BUY_SUCCESS,
  PRODUCT_BUY_FAILURE,
} = ActionTypes;

// Reducer
import product from '../../../app/reducers/product';

describe('REDUCER: product', () => {
  // INITIAL STATE
  it('should return the initial state', () => {
    // Expected Initial state

    const expectedInitialState = new Map({
      error: null,
      products: null,
      loading: false,
      loaded: false,
      // newCharge: null
    });

    expect(product(undefined, {})).to.deep.equal(expectedInitialState);
  });

  // PRODUCT_GETPRODUCTS_REQUEST
  it('should handle PRODUCT_GETPRODUCTS_REQUEST', () => {
    // Initial state
    const initialState = new Map({
      loading: false,
    });

    // Action
    const type = PRODUCT_GETPRODUCTS_REQUEST;
    const action = {
      type,
    };

    // Expected Result
    const expectedState = {
      loading: true,
    };

    expect(product(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // PRODUCT_GETPRODUCTS_SUCCESS
  it('should handle PRODUCT_GETPRODUCTS_SUCCESS', () => {
    // Initial state
    const initialState = new Map({
      loading: true,
      products: null,
      loaded: false,
    });

    // Action
    const type = PRODUCT_GETPRODUCTS_SUCCESS;
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
      products: fromJS(action.result.data),
      loading: false,
      loaded: true,
    };

    expect(product(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // PRODUCT_GETPRODUCTS_FAILURE
  it('should handle PRODUCT_GETPRODUCTS_FAILURE', () => {
    // Initial state
    const initialState = new Map({
      loading: true,
      loaded: false,
      error: null,
    });

    // Action
    const type = PRODUCT_GETPRODUCTS_FAILURE;
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

    expect(product(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // PRODUCT_BUY_REQUEST
  it('should handle PRODUCT_BUY_REQUEST', () => {
    // Initial state
    const initialState = new Map({
      loading: false,
    });

    // Action
    const type = PRODUCT_BUY_REQUEST;
    const action = {
      type,
    };

    // Expected Result
    const expectedState = {
      loading: true,
    };

    expect(product(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // PRODUCT_BUY_SUCCESS
  it('should handle PRODUCT_BUY_SUCCESS', () => {
    // Initial state
    const initialState = new Map({
      loading: true,
      loaded: false,
    });

    // Action
    const type = PRODUCT_BUY_SUCCESS;
    const action = {
      type,
    };

    // Expected Result
    const expectedState = {
      loading: false,
      loaded: true,
    };

    expect(product(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // PRODUCT_BUY_FAILURE
  it('should handle PRODUCT_BUY_FAILURE', () => {
    // Initial state
    const initialState = new Map({
      loading: true,
      loaded: false,
      error: null,
    });

    // Action
    const type = PRODUCT_BUY_FAILURE;
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

    expect(product(initialState, action)).to.deep.equal(fromJS(expectedState));
  });
});
