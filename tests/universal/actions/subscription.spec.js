// tests/universal/actions/subscription.spec.js
import configureMockStore from 'redux-mock-store';
import clientMiddleware from './MockMiddleware';
import MockClient from './MockClient';
import { expect } from 'chai';
import ActionTypes from '../../../app/constants/ActionTypes';

const {
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
  SUBSCRIPTION_CHANGECARD_REQUEST,
  SUBSCRIPTION_CHANGECARD_SUCCESS,
  SUBSCRIPTION_CHANGECARD_FAILURE,
  SUBSCRIPTION_CANCEL_REQUEST,
  SUBSCRIPTION_CANCEL_SUCCESS,
  SUBSCRIPTION_CANCEL_FAILURE,
} = ActionTypes;

import {
  getPlans,
  getMyPlan,
  subscribe,
  changePlan,
  changeCard,
  unsubscribe,
} from '../../../app/actions/subscription';

const client = new MockClient();
const middlewares = [clientMiddleware(client)];
const mockStore = configureMockStore(middlewares);

describe('ACTIONS: subscription', () => {
  afterEach(() => {
    client.reset();
  });

  it('should create a success action to get plans', () => {
    client
      .getOnce('/plans', { body: { plans: ['someplan'] } });

    const expectedActions = [
      { type: SUBSCRIPTION_GETPLANS_REQUEST },
      { type: SUBSCRIPTION_GETPLANS_SUCCESS, result: { plans: ['someplan'] } },
    ];

    const store = mockStore({ plans: [] });

    return store.dispatch(getPlans()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('should create a failed action to get plans', () => {
    client
      .getOnce('/plans', { error: 'some error' });

    const expectedActions = [
      { type: SUBSCRIPTION_GETPLANS_REQUEST },
      { type: SUBSCRIPTION_GETPLANS_FAILURE, error: 'some error' },
    ];

    const store = mockStore({ error: null });

    return store.dispatch(getPlans()).catch(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('should create a success action to get my plan', () => {
    client
      .getOnce('/purchases', { body: { data: {} } });

    const expectedActions = [
      { type: SUBSCRIPTION_MYPLAN_REQUEST },
      { type: SUBSCRIPTION_MYPLAN_SUCCESS, result: { data: {} } },
    ];

    const store = mockStore({ myplan: null });

    return store.dispatch(getMyPlan()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('should create a failed action to get my plan', () => {
    client
      .getOnce('/purchases', { error: 'some error' });

    const expectedActions = [
      { type: SUBSCRIPTION_MYPLAN_REQUEST },
      { type: SUBSCRIPTION_MYPLAN_FAILURE, error: 'some error' },
    ];

    const store = mockStore({ myplan: null });

    return store.dispatch(getMyPlan()).catch(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('should create a success action to subscribe', () => {
    client
      .postOnce('/plans/subscribe', { body: { data: {} } });

    const expectedActions = [
      { type: SUBSCRIPTION_SUBSCRIBE_REQUEST, data: { source: 'some-source', slug: 'some-slug' } },
      { type: SUBSCRIPTION_SUBSCRIBE_SUCCESS, result: { data: {} } },
    ];

    const store = mockStore({ myplan: null });

    return store.dispatch(subscribe({ source: 'some-source', slug: 'some-slug' })).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('should create a failed action to subscribe', () => {
    client
      .postOnce('/plans/subscribe', { error: 'some error' });

    const expectedActions = [
      { type: SUBSCRIPTION_SUBSCRIBE_REQUEST, data: { source: 'some-source', slug: 'some-slug' } },
      { type: SUBSCRIPTION_SUBSCRIBE_FAILURE, error: 'some error' },
    ];

    const store = mockStore({ myplan: null });

    return store.dispatch(subscribe({ source: 'some-source', slug: 'some-slug' })).catch(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('should create a success action to change plan', () => {
    client
      .postOnce('/plans/change', { body: { data: {} } });

    const expectedActions = [
      { type: SUBSCRIPTION_CHANGEPLAN_REQUEST, data: { slug: 'some-slug' } },
      { type: SUBSCRIPTION_CHANGEPLAN_SUCCESS, result: { data: {} } },
    ];

    const store = mockStore({ myplan: null });

    return store.dispatch(changePlan({ slug: 'some-slug' })).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('should create a failed action to change plan', () => {
    client
      .postOnce('/plans/change', { error: 'some error' });

    const expectedActions = [
      { type: SUBSCRIPTION_CHANGEPLAN_REQUEST, data: { slug: 'some-slug' } },
      { type: SUBSCRIPTION_CHANGEPLAN_FAILURE, error: 'some error' },
    ];

    const store = mockStore({ myplan: null });

    return store.dispatch(changePlan({ slug: 'some-slug' })).catch(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });
});
