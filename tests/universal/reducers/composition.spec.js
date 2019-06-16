// tests/universal/reducers/auth.spec.js
import ActionTypes from '../../../app/constants/ActionTypes';

const {
  PROJECT_FETCH_REQUEST,
  PROJECT_FETCH_SUCCESS,
  PROJECT_FETCH_FAILURE,
  PROJECT_CREATE_REQUEST,
  PROJECT_CREATE_SUCCESS,
  PROJECT_CREATE_FAILURE,
  PROJECT_UPDATE_REQUEST,
  PROJECT_UPDATE_SUCCESS,
  PROJECT_UPDATE_FAILURE,
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
  COMPOSITION_SET_ANIMATION,
  COMPOSITION_AUDIO_MUTE,
  COMPOSITION_SET_AUDIO,
} = ActionTypes;

// Reducer
import composition from '../../../app/reducers/composition';
// Models
import TimelineModel from '../../../app/models/Timeline';
import MediaModel from '../../../app/models/Media';
import LayerModel from '../../../app/models/Layer';
import ModelConstants from '../../../app/models/helpers/ModelConstants';

const {
  LAYER_TYPE_TEXT,
  LAYER_TYPE_AUDIO,
} = ModelConstants;
//
import { expect } from 'chai';
import { fromJS, Map } from 'immutable';

describe('REDUCER: composition', () => {
  // INITIAL STATE
  it('should return the initial state', () => {
    // Expected Initial state
    const expectedInitialState = new Map({
      error: null,
      loaded: false,
      loading: false,
      id: null,
      cover: null,
      composition: fromJS(TimelineModel()),
      originalComposition: fromJS(TimelineModel()),
      saving: false,
    });

    expect(composition(undefined, {})).to.deep.equal(expectedInitialState);
  });

  // PROJECT_FETCH
  it('should handle PROJECT_FETCH_REQUEST', () => {
    // Initial state
    const initialState = new Map({
      loading: false,
    });

    // Action
    const type = PROJECT_FETCH_REQUEST;
    const action = {
      type,
    };

    // Expected Result
    const expectedState = {
      loading: true,
      id: null,
      composition: new Map({}),
      originalComposition: new Map({}),
    };

    expect(composition(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  it('should handle PROJECT_FETCH_FAILURE', () => {
    // Initial state
    const initialState = new Map({
      loading: true,
      error: null,
    });

    // Action
    const type = PROJECT_FETCH_FAILURE;
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
      error: fromJS(action.error),
    };

    expect(composition(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  it('should handle PROJECT_FETCH_SUCCESS', () => {
    // Initial state
    const initialState = new Map({
      loading: true,
      id: null,
      composition: new Map({}),
      originalComposition: new Map({}),
    });

    // Action
    const type = PROJECT_FETCH_SUCCESS;
    const result = {
      data: {
        id: 1,
        cover: {},
        composition: {},
      },
    };
    const action = {
      type,
      result,
    };

    // Expected Result
    const expectedState = {
      loading: false,
      id: action.result.data.id,
      cover: fromJS(action.result.data.cover),
      composition: fromJS(TimelineModel(action.result.data.composition)),
      originalComposition: fromJS(TimelineModel(action.result.data.composition)),
    };

    expect(composition(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // PROJECT_CREATE
  it('should handle PROJECT_CREATE_REQUEST', () => {
    // Initial state
    const initialState = new Map({
      loading: false,
    });

    // Action
    const type = PROJECT_CREATE_REQUEST;
    const action = {
      type,
    };

    // Expected Result
    const expectedState = {
      loading: true,
      id: null,
      composition: new Map({}),
      originalComposition: new Map({}),
    };

    expect(composition(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  it('should handle PROJECT_CREATE_FAILURE', () => {
    // Initial state
    const initialState = new Map({
      loading: true,
      error: null,
    });

    // Action
    const type = PROJECT_CREATE_FAILURE;
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
      error: fromJS(action.error),
    };

    expect(composition(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  it('should handle PROJECT_CREATE_SUCCESS', () => {
    // Initial state
    const initialState = new Map({
      loading: true,
      id: null,
      composition: new Map({}),
      originalComposition: new Map({}),
    });

    // Action
    const type = PROJECT_CREATE_SUCCESS;
    const result = {
      data: {
        id: 1,
        composition: TimelineModel(),
      },
    };
    const action = {
      type,
      result,
    };

    // Expected Result
    const expectedState = {
      loading: false,
      id: action.result.data.id,
      composition: fromJS(TimelineModel(action.result.data.composition)),
      originalComposition: fromJS(TimelineModel(action.result.data.composition)),
    };

    expect(composition(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // PROJECT_UPDATE
  it('should handle PROJECT_UPDATE_REQUEST', () => {
    // Initial state
    const initialState = new Map({
      saving: false,
    });

    // Action
    const type = PROJECT_UPDATE_REQUEST;
    const action = {
      type,
    };

    // Expected Result
    const expectedState = {
      saving: true,
    };

    expect(composition(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  it('should handle PROJECT_UPDATE_FAILURE', () => {
    // Initial state
    const initialState = new Map({
      saving: true,
      error: null,
    });

    // Action
    const type = PROJECT_UPDATE_FAILURE;
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
      saving: false,
      error: fromJS(action.error),
    };

    expect(composition(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  it('should handle PROJECT_UPDATE_SUCCESS', () => {
    // Initial state
    const initialState = new Map({
      saving: true,
    });

    // Action
    const type = PROJECT_UPDATE_SUCCESS;
    const result = {
      data: {
        id: 1,
        cover: {},
        composition: {},
      },
    };
    const action = {
      type,
      result,
    };

    // Expected Result
    const expectedState = {
      saving: false,
    };

    expect(composition(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // COMPOSITION_RESET
  it('should handle COMPOSITION_RESET', () => {
    const editedComposition = fromJS(TimelineModel({
      format: 'square',
    }));
    const originalComposition = fromJS(TimelineModel());
    // Initial state
    const initialState = new Map({
      composition: editedComposition,
      originalComposition,
    });

    // Action
    const type = COMPOSITION_RESET;
    const action = {
      type,
    };

    // Expected Result
    const expectedState = {
      composition: originalComposition,
      originalComposition,
    };

    expect(composition(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // COMPOSITION_SET_FORMAT
  it('should handle COMPOSITION_SET_FORMAT', () => {
    const originalComposition = fromJS(TimelineModel());
    // Initial state
    const initialState = new Map({
      composition: originalComposition,
    });

    // Action
    const type = COMPOSITION_SET_FORMAT;
    const payload = {
      format: 'square',
    };
    const action = {
      type,
      payload,
    };

    // Expected Result
    const expectedComposition = fromJS(TimelineModel({
      format: 'square',
    }));
    const expectedState = {
      composition: expectedComposition,
    };

    expect(composition(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // COMPOSITION_SET_VIDEO
  it('should handle COMPOSITION_SET_VIDEO', () => {
    // Initial state
    const originalComposition = fromJS(TimelineModel());
    const initialState = new Map({
      composition: originalComposition,
    });

    // Action
    const type = COMPOSITION_SET_VIDEO;
    const newLayer = LayerModel({
      media: {
        url: 'http://video.url',
      },
      transform: {
        timeIn: 0,
        timeOut: 10,
      },
    });
    const payload = {
      layer: newLayer,
    };
    const action = {
      index: 0,
      type,
      payload,
    };

    // Expected Result
    const expectedComposition = fromJS(TimelineModel({
      length: 10,
      videos: [newLayer],
    }));
    const expectedState = {
      composition: expectedComposition,
    };

    // Go
    expect(composition(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // COMPOSITION_VIDEO_OFFSET
  it('should handle COMPOSITION_VIDEO_OFFSET', () => {
    const originalComposition = fromJS(TimelineModel({
      videos: [
        LayerModel({
          transform: {
            offsetX: 0.5,
            offsetY: 0,
          },
        }),
      ],
    }));
    // Initial state
    const initialState = new Map({
      composition: originalComposition,
    });

    // Action
    const type = COMPOSITION_VIDEO_OFFSET;
    const payload = {
      offsetX: 0.2,
      offsetY: 0.1,
    };
    const action = {
      type,
      payload,
    };

    // Expected Result
    const expectedComposition = fromJS(TimelineModel({
      videos: [
        LayerModel({
          transform: {
            offsetX: 0.2,
            offsetY: 0.1,
          },
        }),
      ],
    }));
    const expectedState = {
      composition: expectedComposition,
    };

    expect(composition(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // COMPOSITION_SET_LAYER
  it('should handle COMPOSITION_SET_LAYER', () => {
    const originalComposition = fromJS(TimelineModel({
      layers: [
        LayerModel({
          type: LAYER_TYPE_TEXT,
        }),
        LayerModel({
          type: LAYER_TYPE_TEXT,
        }),
      ],
    }));
    // Initial state
    const initialState = new Map({
      composition: originalComposition,
    });

    // Action
    const type = COMPOSITION_SET_LAYER;
    const payload = LayerModel({
      transform: {
        offsetX: 0.5,
        offsetY: 0,
      },
      type: LAYER_TYPE_TEXT,
    });
    const action = {
      type,
      payload,
      index: 1,
    };

    // Expected Result
    const expectedComposition = fromJS(TimelineModel({
      layers: [
        LayerModel({
          type: LAYER_TYPE_TEXT,
        }),
        LayerModel({
          transform: {
            offsetX: 0.5,
            offsetY: 0,
          },
          type: LAYER_TYPE_TEXT,
        }),
      ],
    }));
    const expectedState = {
      composition: expectedComposition,
    };

    expect(composition(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // COMPOSITION_DELETE_LAYER
  it('should handle COMPOSITION_DELETE_LAYER', () => {
    const originalComposition = fromJS(TimelineModel({
      layers: [
        LayerModel({
          type: LAYER_TYPE_TEXT,
        }),
        LayerModel({
          transform: {
            offsetX: 0.5,
            offsetY: 0,
          },
          type: LAYER_TYPE_TEXT,
        }),
      ],
    }));
    // Initial state
    const initialState = new Map({
      composition: originalComposition,
    });

    // Action
    const type = COMPOSITION_DELETE_LAYER;
    const action = {
      type,
      index: 1,
    };

    // Expected Result
    const expectedComposition = fromJS(TimelineModel({
      layers: [
        LayerModel({
          type: LAYER_TYPE_TEXT,
        }),
      ],
    }));
    const expectedState = {
      composition: expectedComposition,
    };

    expect(composition(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // COMPOSITION_ADD_LAYER
  it('should handle COMPOSITION_ADD_LAYER', () => {
    const originalComposition = fromJS(TimelineModel({
      layers: [
        LayerModel({
          svg: {
            text: 'some more text',
            textAlign: 'right',
          },
          type: LAYER_TYPE_TEXT,
        }),
        LayerModel({
          svg: {
            text: 'happy day',
            textAlign: 'left', // left, center, right
          },
          type: LAYER_TYPE_TEXT,
        }),
      ],
    }));
    // Initial state
    const initialState = new Map({
      composition: originalComposition,
    });

    // Action
    const type = COMPOSITION_ADD_LAYER;
    const payload = LayerModel({
      svg: {},
      type: LAYER_TYPE_TEXT,
    });
    const action = {
      type,
      payload,
      index: 1,
    };

    // Expected Result
    const expectedComposition = fromJS(TimelineModel({
      layers: [
        LayerModel({
          svg: {
            text: 'some more text',
            textAlign: 'right',
          },
          type: LAYER_TYPE_TEXT,
        }),
        LayerModel({
          svg: {},
          type: LAYER_TYPE_TEXT,
        }),
        LayerModel({
          svg: {
            text: 'happy day',
            textAlign: 'left', // left, center, right
          },
          type: LAYER_TYPE_TEXT,
        }),
      ],
    }));
    const expectedState = {
      composition: expectedComposition,
    };

    expect(composition(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // COMPOSITION_SET_LAYER_SVG
  it('should handle COMPOSITION_SET_LAYER_SVG', () => {
    const originalComposition = fromJS(TimelineModel({
      layers: [
        LayerModel({
          svg: {},
          type: LAYER_TYPE_TEXT,
        }),
        LayerModel({
          svg: {
            text: 'happy day',
            textAlign: 'left', // left, center, right
          },
          type: LAYER_TYPE_TEXT,
        }),
      ],
    }));
    // Initial state
    const initialState = new Map({
      composition: originalComposition,
    });

    // Action
    const type = COMPOSITION_SET_LAYER_SVG;
    const payload = {
      animationId: 'animation_02',
      text: 'happy days',
      textAlign: 'center', // left, center, right
      textTransform: 'uppercase', // uppercase, lowercase, titlecase, none
      colors: ['rgb(252,20,38)', 'rgb(0,0,0)'],
    };
    const action = {
      type,
      payload,
      index: 1,
    };

    // Expected Result
    const expectedComposition = fromJS(TimelineModel({
      layers: [
        LayerModel({
          svg: {},
          type: LAYER_TYPE_TEXT,
        }),
        LayerModel({
          svg: {
            animationId: 'animation_02',
            text: 'happy days',
            textAlign: 'center', // left, center, right
            textTransform: 'uppercase', // uppercase, lowercase, titlecase, none
            colors: ['rgb(252,20,38)', 'rgb(0,0,0)'],
          },
          type: LAYER_TYPE_TEXT,
        }),
      ],
    }));
    const expectedState = {
      composition: expectedComposition,
    };

    expect(composition(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // COMPOSITION_SET_LAYER_TEXT
  it('should handle COMPOSITION_SET_LAYER_TEXT', () => {
    const originalComposition = fromJS(TimelineModel({
      layers: [
        LayerModel({
          svg: {},
          type: LAYER_TYPE_TEXT,
        }),
        LayerModel({
          svg: {
            text: 'happy day',
            textAlign: 'left', // left, center, right
          },
          type: LAYER_TYPE_TEXT,
        }),
      ],
    }));
    // Initial state
    const initialState = new Map({
      composition: originalComposition,
    });

    // Action
    const type = COMPOSITION_SET_LAYER_TEXT;
    const payload = {
      text: 'the best day',
    };
    const action = {
      index: 1,
      type,
      payload,
    };

    // Expected Result
    const expectedComposition = fromJS(TimelineModel({
      layers: [
        LayerModel({
          svg: {},
          type: LAYER_TYPE_TEXT,
        }),
        LayerModel({
          svg: {
            text: 'the best day',
            textAlign: 'left', // left, center, right
          },
          type: LAYER_TYPE_TEXT,
        }),
      ],
    }));
    const expectedState = {
      composition: expectedComposition,
    };

    expect(composition(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // COMPOSITION_LAYER_TRANSFORM
  it('should handle COMPOSITION_LAYER_TRANSFORM', () => {
    const originalComposition = fromJS(TimelineModel({
      layers: [
        LayerModel({
          type: LAYER_TYPE_TEXT,
        }),
        LayerModel({
          transform: {
            offsetX: 0.5,
            offsetY: 0,
          },
          type: LAYER_TYPE_TEXT,
        }),
      ],
    }));
    // Initial state
    const initialState = new Map({
      composition: originalComposition,
    });

    // Action
    const type = COMPOSITION_LAYER_TRANSFORM;
    const payload = {
      offsetX: 0.2,
      offsetY: 0.1,
    };
    const action = {
      type,
      payload,
      index: 1,
    };

    // Expected Result
    const expectedComposition = fromJS(TimelineModel({
      layers: [
        LayerModel({
          type: LAYER_TYPE_TEXT,
        }),
        LayerModel({
          transform: {
            offsetX: 0.2,
            offsetY: 0.1,
          },
          type: LAYER_TYPE_TEXT,
        }),
      ],
    }));
    const expectedState = {
      composition: expectedComposition,
    };

    expect(composition(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // COMPOSITION_AUDIO_MUTE
  it('should handle COMPOSITION_AUDIO_MUTE', () => {
    const originalComposition = fromJS(TimelineModel({
      audios: [
        LayerModel({
          media: MediaModel({
            isMuted: false,
          }),
          type: LAYER_TYPE_AUDIO,
        }),
      ],
    }));
    // Initial state
    const initialState = new Map({
      composition: originalComposition,
    });

    // Action
    const type = COMPOSITION_AUDIO_MUTE;
    const payload = {
      isMuted: true,
    };
    const action = {
      type,
      payload,
      index: 0,
    };

    // Expected Result
    const expectedComposition = fromJS(TimelineModel({
      audios: [
        LayerModel({
          media: MediaModel({
            isMuted: true,
          }),
          type: LAYER_TYPE_AUDIO,
        }),
      ],
    }));
    const expectedState = {
      composition: expectedComposition,
    };

    expect(composition(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // COMPOSITION_SET_AUDIO
  it('should handle COMPOSITION_SET_AUDIO', () => {
    const originalComposition = fromJS(TimelineModel({
      audios: [
        LayerModel({
          media: MediaModel({
            id: 10,
            url: 'examle.com/test1.mp3',
          }),
          type: LAYER_TYPE_AUDIO,
        }),
      ],
    }));
    // Initial state
    const initialState = new Map({
      composition: originalComposition,
    });

    // Action
    const type = COMPOSITION_SET_AUDIO;
    const payload = {
      media: MediaModel({
        id: 20,
        url: 'examle.com/test2.mp3',
      }),
    };
    const action = {
      index: 0,
      type,
      payload,
    };

    // Expected Result
    const expectedComposition = fromJS(TimelineModel({
      audios: [
        LayerModel({
          media: MediaModel({
            id: 20,
            url: 'examle.com/test2.mp3',
          }),
          type: LAYER_TYPE_AUDIO,
        }),
      ],
    }));
    const expectedState = {
      composition: expectedComposition,
    };

    expect(composition(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // COMPOSITION_SET_ANIMATION
  it('should handle COMPOSITION_SET_ANIMATION', () => {
    const originalComposition = fromJS(TimelineModel({
      layers: [
        LayerModel({
          svg: {},
          type: LAYER_TYPE_TEXT,
        }),
        LayerModel({
          svg: {
            text: 'happy day',
            textAlign: 'left', // left, center, right
          },
          type: LAYER_TYPE_TEXT,
        }),
      ],
    }));
    // Initial state
    const initialState = new Map({
      composition: originalComposition,
    });

    // Action
    const type = COMPOSITION_SET_ANIMATION;
    const payload = {
      animationId: 'animation_02',
    };
    const action = {
      index: 1,
      payload,
      type,
    };

    // Expected Result
    const expectedComposition = fromJS(TimelineModel({
      layers: [
        LayerModel({
          svg: {},
          type: LAYER_TYPE_TEXT,
        }),
        LayerModel({
          svg: {
            animationId: 'animation_02',
            text: 'happy day',
            textAlign: 'left', // left, center, right
          },
          type: LAYER_TYPE_TEXT,
        }),
      ],
    }));
    const expectedState = {
      composition: expectedComposition,
    };

    expect(composition(initialState, action)).to.deep.equal(fromJS(expectedState));
  });
});
