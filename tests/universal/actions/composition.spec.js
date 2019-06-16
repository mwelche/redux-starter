// tests/universal/actions/subscription.spec.js

// Redux
import configureMockStore from 'redux-mock-store';
import clientMiddleware from './MockMiddleware';
// Actions
import {
  isLoaded,
  resetComposition,
  setFormat,
  setSvgForLayerAtIndex,
  setLayerAtIndex,
  deleteLayerAtIndex,
  addLayerAtIndex,
  setVideo,
  setVideoOffset,
  setLayerText,
  setTransform,
  setAudioMute,
  setAudio,
  setAnimation,
} from '../../../app/actions/composition';
// Models
import LayerModel from '../../../app/models/Layer';
import SVGModel from '../../../app/models/SVG';
import MediaModel from '../../../app/models/Media';
import TimelineModel from '../../../app/models/Timeline';
import TransformModel from '../../../app/models/Transform';
import ModelConstants from '../../../app/models/helpers/ModelConstants';

const {
  LAYER_TYPE_TEXT,
  LAYER_TYPE_VIDEO,
} = ModelConstants;
// Constants
import ActionTypes from '../../../app/constants/ActionTypes';

const {
  COMPOSITION_RESET,
  COMPOSITION_SET_FORMAT,
  COMPOSITION_SET_VIDEO,
  COMPOSITION_VIDEO_OFFSET,
  COMPOSITION_SET_LAYER_SVG,
  COMPOSITION_SET_LAYER_TEXT,
  COMPOSITION_SET_LAYER,
  COMPOSITION_DELETE_LAYER,
  COMPOSITION_ADD_LAYER,
  COMPOSITION_LAYER_TRANSFORM,
  COMPOSITION_AUDIO_MUTE,
  COMPOSITION_SET_AUDIO,
  COMPOSITION_SET_ANIMATION,
} = ActionTypes;
//
import { expect } from 'chai';
import { Map, fromJS } from 'immutable';

const middlewares = [clientMiddleware()];
const mockStore = configureMockStore(middlewares);
const store = mockStore(new Map({
  error: null,
  loaded: false,
  loading: false,
  id: null,
  cover: null,
  composition: fromJS(TimelineModel()),
  originalComposition: fromJS(TimelineModel()),
  saving: false,
}));

describe('ACTIONS: composition', () => {
  afterEach(() => {
    store.clearActions();
  });

  it('should expect isLoaded return false', () => {
    const index = 99;
    const globalState = {
      composition: store.getState(),
    };

    expect(isLoaded(globalState, index)).to.equal(false);
  });

  it('should expect COMPOSITION_RESET', () => {
    const expectedActions = [
      { type: COMPOSITION_RESET },
    ];

    store.dispatch(resetComposition());

    expect(store.getActions()).to.deep.equal(expectedActions);
  });

  it('should expect COMPOSITION_SET_FORMAT with format string', () => {
    const expectedActions = [
      {
        type: COMPOSITION_SET_FORMAT,
        payload: {
          format: 'square',
        },
      },
    ];

    store.dispatch(setFormat('square'));

    expect(store.getActions()).to.deep.equal(expectedActions);
  });

  it('should expect COMPOSITION_SET_VIDEO with layer object and index', () => {
    const video = LayerModel({
      type: LAYER_TYPE_VIDEO,
    });
    const expectedActions = [
      {
        type: COMPOSITION_SET_VIDEO,
        payload: {
          layer: video,
        },
        index: 0,
      },
    ];

    store.dispatch(setVideo({
      index: 0,
      layer: video,
    }));

    expect(store.getActions()).to.deep.equal(expectedActions);
  });

  it('should expect COMPOSITION_VIDEO_OFFSET with offsetX and offsetY payload', () => {
    const payload = {
      offsetX: 0.2,
      offsetY: 0.1,
    };
    const expectedActions = [
      {
        type: COMPOSITION_VIDEO_OFFSET,
        payload,
      },
    ];

    store.dispatch(setVideoOffset(payload));

    expect(store.getActions()).to.deep.equal(expectedActions);
  });

  it('should expect COMPOSITION_SET_LAYER_SVG SVGModel object and index', () => {
    const svg = SVGModel();
    const index = 0;
    const expectedActions = [
      {
        type: COMPOSITION_SET_LAYER_SVG,
        payload: svg,
        index,
      },
    ];

    store.dispatch(setSvgForLayerAtIndex(svg, index));

    expect(store.getActions()).to.deep.equal(expectedActions);
  });

  it('should expect COMPOSITION_SET_LAYER_TEXT text string and index', () => {
    const index = 1;
    const payload = {
      text: 'HELLO WORLD',
    };
    const expectedActions = [
      {
        type: COMPOSITION_SET_LAYER_TEXT,
        index,
        payload,
      },
    ];

    store.dispatch(setLayerText({
      index,
      ...payload,
    }));

    expect(store.getActions()).to.deep.equal(expectedActions);
  });

  it('should expect COMPOSITION_SET_LAYER with text layer object and index', () => {
    const index = 1;
    const layer = LayerModel({
      type: LAYER_TYPE_TEXT,
    });
    const expectedActions = [
      {
        type: COMPOSITION_SET_LAYER,
        index,
        payload: layer,
      },
    ];

    store.dispatch(setLayerAtIndex(layer, index));

    expect(store.getActions()).to.deep.equal(expectedActions);
  });

  it('should expect COMPOSITION_DELETE_LAYER with index', () => {
    const index = 2;
    const expectedActions = [
      {
        type: COMPOSITION_DELETE_LAYER,
        index,
      },
    ];

    store.dispatch(deleteLayerAtIndex(index));

    expect(store.getActions()).to.deep.equal(expectedActions);
  });

  it('should expect COMPOSITION_ADD_LAYER with layer model object and index', () => {
    const index = 1;
    const layer = LayerModel({
      type: LAYER_TYPE_TEXT,
    });
    const expectedActions = [
      {
        type: COMPOSITION_ADD_LAYER,
        index,
        payload: layer,
      },
    ];

    store.dispatch(addLayerAtIndex(layer, index));

    expect(store.getActions()).to.deep.equal(expectedActions);
  });

  it('should expect COMPOSITION_LAYER_TRANSFORM with TransformModel object and index', () => {
    const index = 1;
    const transform = TransformModel();
    const expectedActions = [
      {
        type: COMPOSITION_LAYER_TRANSFORM,
        index: 1,
        payload: transform,
      },
    ];

    store.dispatch(setTransform({
      index,
      ...transform,
    }));

    expect(store.getActions()).to.deep.equal(expectedActions);
  });

  it('should expect COMPOSITION_AUDIO_MUTE with isMuted boolean and index', () => {
    const index = 0;
    const payload = {
      isMuted: false,
    };
    const expectedActions = [
      {
        type: COMPOSITION_AUDIO_MUTE,
        index,
        payload,
      },
    ];

    store.dispatch(setAudioMute({
      index,
      ...payload,
    }));

    expect(store.getActions()).to.deep.equal(expectedActions);
  });

  it('should expect COMPOSITION_SET_AUDIO with MediaModel object and index', () => {
    const index = 0;
    const payload = {
      media: MediaModel(),
    };
    const expectedActions = [
      {
        type: COMPOSITION_SET_AUDIO,
        index,
        payload,
      },
    ];

    store.dispatch(setAudio({
      index,
      ...payload,
    }));

    expect(store.getActions()).to.deep.equal(expectedActions);
  });

  it('should expect COMPOSITION_SET_ANIMATION with animationId string and index', () => {
    const index = 2;
    const animationId = 'animation_01';
    const payload = {
      animationId,
    };
    const expectedActions = [
      {
        type: COMPOSITION_SET_ANIMATION,
        index,
        payload,
      },
    ];

    store.dispatch(setAnimation({
      index,
      ...payload,
    }));

    expect(store.getActions()).to.deep.equal(expectedActions);
  });
});
