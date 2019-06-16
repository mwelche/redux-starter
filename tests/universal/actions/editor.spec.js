// tests/universal/actions/subscription.spec.js

// Redux
import configureMockStore from 'redux-mock-store';
import clientMiddleware from '../../../app/redux/middleware/clientMiddleware';
// Actions
import {
  editBackgroundPosition,
  editText,
} from '../../../app/actions/editor';
// Constants
import ActionTypes from '../../../app/constants/ActionTypes';

const {
  EDITOR_BGPOSITION_START,
  EDITOR_BGPOSITION_END,
  EDITOR_EDITTEXT_START,
  EDITOR_EDITTEXT_END,
} = ActionTypes;
//
import { expect } from 'chai';
import { Map } from 'immutable';

const middlewares = [clientMiddleware()];
const mockStore = configureMockStore(middlewares);
const store = mockStore(new Map({
  error: null,
  editBgPosition: false,
  editText: false,
  editTextIndex: -1,
  exporting: false,
  exportCompletion: 0,
  exportCompleted: false,
  exportDownload: '',
  exportJob: 0,
  exportResult: '',
  exportRetries: 0,
  exportStatus: '',
}));

describe('ACTIONS: editor', () => {
  afterEach(() => {
    store.clearActions();
  });

  it('should expect EDITOR_BGPOSITION_START', () => {
    const expectedActions = [
      {
        type: EDITOR_BGPOSITION_START,
      },
    ];

    store.dispatch(editBackgroundPosition(true));

    expect(store.getActions()).to.deep.equal(expectedActions);
  });

  it('should expect EDITOR_BGPOSITION_END', () => {
    const expectedActions = [
      {
        type: EDITOR_BGPOSITION_END,
      },
    ];

    store.dispatch(editBackgroundPosition(false));

    expect(store.getActions()).to.deep.equal(expectedActions);
  });

  it('should expect EDITOR_EDITTEXT_START with index', () => {
    const index = 1;
    const expectedActions = [
      {
        type: EDITOR_EDITTEXT_START,
        index,
      },
    ];

    store.dispatch(editText(true, index));

    expect(store.getActions()).to.deep.equal(expectedActions);
  });

  it('should expect EDITOR_EDITTEXT_END', () => {
    const expectedActions = [
      {
        type: EDITOR_EDITTEXT_END,
      },
    ];

    store.dispatch(editText(false));

    expect(store.getActions()).to.deep.equal(expectedActions);
  });
});
