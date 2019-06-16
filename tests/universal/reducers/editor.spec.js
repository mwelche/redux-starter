// tests/universal/reducers/editor.spec.js

import { expect } from 'chai';
import { fromJS, Map } from 'immutable';
import ActionTypes from '../../../app/constants/ActionTypes';

const {
  EDITOR_BGPOSITION_START,
  EDITOR_BGPOSITION_END,
  EDITOR_EDITTEXT_START,
  EDITOR_EDITTEXT_END,
  PROJECT_EXPORT_REQUEST,
  PROJECT_EXPORT_SUCCESS,
  PROJECT_EXPORT_FAILURE,
  PROJECT_EXPORT_STATUS_REQUEST,
  PROJECT_EXPORT_STATUS_SUCCESS,
  PROJECT_EXPORT_STATUS_FAILURE,
} = ActionTypes;

// Reducer
import editor from '../../../app/reducers/editor';

describe('REDUCER: editor', () => {
  // INITIAL STATE
  it('should return the initial state', () => {
    // Expected Initial state

    const expectedInitialState = new Map({
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
    });

    expect(editor(undefined, {})).to.deep.equal(expectedInitialState);
  });

  // EDITOR_BGPOSITION_START
  it('should handle EDITOR_BGPOSITION_START', () => {
    // Initial state
    const initialState = new Map({
      editBgPosition: false,
    });

    // Action
    const type = EDITOR_BGPOSITION_START;
    const action = {
      type,
    };

    // Expected Result
    const expectedState = {
      editBgPosition: true,
    };

    expect(editor(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // EDITOR_BGPOSITION_END
  it('should handle EDITOR_BGPOSITION_END', () => {
    // Initial state
    const initialState = new Map({
      editBgPosition: true,
    });

    // Action
    const type = EDITOR_BGPOSITION_END;
    const action = {
      type,
    };

    // Expected Result
    const expectedState = {
      editBgPosition: false,
    };

    expect(editor(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // EDITOR_EDITTEXT_START
  it('should handle EDITOR_EDITTEXT_START', () => {
    // Initial state
    const index = 1;
    const initialState = new Map({
      editText: false,
      editTextIndex: -1,
    });

    // Action
    const type = EDITOR_EDITTEXT_START;
    const action = {
      type,
      index,
    };

    // Expected Result
    const expectedState = {
      editText: true,
      editTextIndex: index,
    };

    expect(editor(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // EDITOR_EDITTEXT_END
  it('should handle EDITOR_EDITTEXT_END', () => {
    // Initial state
    const initialState = new Map({
      editText: true,
      editTextIndex: 1,
    });

    // Action
    const type = EDITOR_EDITTEXT_END;
    const action = {
      type,
    };

    // Expected Result
    const expectedState = {
      editText: false,
      editTextIndex: -1,
    };

    expect(editor(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // PROJECT_EXPORT_REQUEST
  it('should handle PROJECT_EXPORT_REQUEST', () => {
    // Initial state
    const initialState = new Map({
      error: null,
      exporting: false,
      exportCompletion: 100,
      exportCompleted: true,
      exportDownload: '',
      exportJob: 0,
      exportResult: '',
      exportRetries: 3,
      exportStatus: '',
    });

    // Action
    const type = PROJECT_EXPORT_REQUEST;
    const action = {
      type,
    };

    // Expected Result
    const expectedState = {
      error: null,
      exporting: false,
      exportCompleted: false,
      exportCompletion: 0,
      exportDownload: '',
      exportJob: 0,
      exportResult: '',
      exportRetries: 0,
      exportStatus: '',
    };

    expect(editor(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // PROJECT_EXPORT_SUCCESS
  it('should handle PROJECT_EXPORT_SUCCESS', () => {
    // Initial state
    const initialState = new Map({
      exportJob: 0,
      exporting: false,
    });

    // Action
    const type = PROJECT_EXPORT_SUCCESS;
    const result = {
      data: {
        job: 100,
      },
    };
    const action = {
      type,
      result,
    };

    // Expected Result
    const expectedState = {
      exportJob: action.result.data.job,
      exporting: true,
    };

    expect(editor(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // PROJECT_EXPORT_FAILURE
  it('should handle PROJECT_EXPORT_FAILURE', () => {
    // Initial state
    const initialState = new Map({
      error: null,
      exporting: true,
    });

    // Action
    const type = PROJECT_EXPORT_FAILURE;
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
      error: fromJS(action.error),
      exporting: false,
    };

    expect(editor(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // PROJECT_EXPORT_STATUS_REQUEST
  it('should handle PROJECT_EXPORT_STATUS_REQUEST', () => {
    // Initial state
    const initialState = new Map({});

    // Action
    const type = PROJECT_EXPORT_STATUS_REQUEST;
    const action = {
      type,
    };

    // Expected Result
    const expectedState = {};

    expect(editor(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // PROJECT_EXPORT_STATUS_SUCCESS
  it('should handle PROJECT_EXPORT_STATUS_SUCCESS', () => {
    const completion = 100;
    const downloadUrl = 'http://www.example.com/download/video.mp4';
    const retries = 0;
    const secureUrl = 'http://www.example.com/video.mp4';
    const status = 'complete';
    const videoPoster = 'http://www.example.com/image.jpg';
    // Initial state
    const initialState = new Map({
      exportCompletion: 0,
      exportCompleted: false,
      exportImage: '',
      exportResult: '',
      exportStatus: '',
      exportDownload: '',
      exportRetries: 0,
    });

    // Action
    const type = PROJECT_EXPORT_STATUS_SUCCESS;
    const result = {
      data: {
        link: {
          download: downloadUrl,
          secure_url: secureUrl,
          video_poster: videoPoster,
        },
        retries,
        typeof: status,
      },
    };
    const action = {
      type,
      result,
    };

    // Expected Result
    const expectedState = {
      exportCompletion: completion,
      exportCompleted: completion === 100,
      exportDownload: downloadUrl,
      exportImage: videoPoster,
      exportResult: secureUrl,
      exportRetries: retries,
      exportStatus: status,
    };

    expect(editor(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // PROJECT_EXPORT_STATUS_FAILURE
  it('should handle PROJECT_EXPORT_STATUS_FAILURE', () => {
    // Initial state
    const initialState = new Map({
      error: null,
    });

    // Action
    const type = PROJECT_EXPORT_STATUS_FAILURE;
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
      error: fromJS(action.error),
    };

    expect(editor(initialState, action)).to.deep.equal(fromJS(expectedState));
  });
});
