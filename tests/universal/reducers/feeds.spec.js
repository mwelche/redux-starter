// tests/universal/reducers/feeds.spec.js

import { expect } from 'chai';
import { fromJS, Map } from 'immutable';
// Reducer
import feeds from '../../../app/reducers/feeds';
// utils
import { feedFactory } from '../../../app/reducers/helpers/factory';
// Constants
import ActionTypes from '../../../app/constants/ActionTypes';

const {
  EXPORTS_FETCH_REQUEST,
  EXPORTS_FETCH_SUCCESS,
  EXPORTS_FETCH_FAILURE,
  EXPORTS_PAGINATE_REQUEST,
  EXPORTS_PAGINATE_SUCCESS,
  EXPORTS_PAGINATE_FAILURE,
  FAVORITES_FETCH_REQUEST,
  FAVORITES_FETCH_SUCCESS,
  FAVORITES_FETCH_FAILURE,
  FAVORITES_PAGINATE_REQUEST,
  FAVORITES_PAGINATE_SUCCESS,
  FAVORITES_PAGINATE_FAILURE,
  MYPROJECTS_FETCH_REQUEST,
  MYPROJECTS_FETCH_SUCCESS,
  MYPROJECTS_FETCH_FAILURE,
  MYPROJECTS_PAGINATE_REQUEST,
  MYPROJECTS_PAGINATE_SUCCESS,
  MYPROJECTS_PAGINATE_FAILURE,

  PROJECT_CREATE_REQUEST,
  PROJECT_CREATE_SUCCESS,
  PROJECT_CREATE_FAILURE,
  PROJECT_DELETE_OPTIMISTIC,
  PROJECT_DELETE_REQUEST,
  PROJECT_DELETE_SUCCESS,
  PROJECT_DELETE_FAILURE,

  TEMPLATES_FETCH_REQUEST,
  TEMPLATES_FETCH_SUCCESS,
  TEMPLATES_FETCH_FAILURE,
  TEMPLATES_PAGINATE_REQUEST,
  TEMPLATES_PAGINATE_SUCCESS,
  TEMPLATES_PAGINATE_FAILURE,
  UPLOADS_FETCH_REQUEST,
  UPLOADS_FETCH_SUCCESS,
  UPLOADS_FETCH_FAILURE,
  UPLOADS_PAGINATE_REQUEST,
  UPLOADS_PAGINATE_SUCCESS,
  UPLOADS_PAGINATE_FAILURE,
} = ActionTypes;

const exampleToken = 'abc';

describe('REDUCER: feeds', () => {
  // INITIAL STATE
  it('should return the initial state', () => {
    // Expected Initial state
    const expectedInitialState = new Map({
      error: null,
      loaded: false,
      loading: false,
      search: fromJS(feedFactory()),
      exports: fromJS(feedFactory()),
      loadedExports: false,
      mine: fromJS(feedFactory()),
      loadedMine: false,
      templates: fromJS(feedFactory()),
      loadedTemplates: false,
      favorites: fromJS(feedFactory()),
      loadedFavorites: false,
      uploads: fromJS(feedFactory()),
      loadedUploads: false,
    });

    expect(feeds(undefined, {})).to.deep.equal(expectedInitialState);
  });

  /* Exports
   * =======
  */
  it('should handle EXPORTS_FETCH_REQUEST', () => {
    // Initial state
    const initialState = new Map({
      loading: false,
    });

    // Action
    const type = EXPORTS_FETCH_REQUEST;
    const action = {
      type,
    };

    // Expected Result
    const expectedState = {
      loading: true,
    };

    expect(feeds(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  it('should handle EXPORTS_FETCH_FAILURE', () => {
    // Initial state
    const initialState = new Map({
      error: null,
      loading: true,
      loadedExports: false,
    });

    // Action
    const type = EXPORTS_FETCH_FAILURE;
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
      loadedExports: true,
      error: fromJS(action.error),
    };

    expect(feeds(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  it('should handle EXPORTS_FETCH_SUCCESS', () => {
    // Initial state
    const initialState = new Map({
      loading: true,
      loadedExports: false,
      exports: fromJS(feedFactory()),
    });

    // Action
    const type = EXPORTS_FETCH_SUCCESS;
    const result = {
      data: [],
      pagination_token: 'abc123',
    };
    const action = {
      type,
      result,
    };

    // Expected Result
    const expectedState = {
      loading: false,
      loadedExports: true,
      exports: initialState.get('exports').merge(new Map({
        data: fromJS(action.result.data),
        paginationToken: action.result.pagination_token,
      })),
    };

    expect(feeds(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  it('should handle EXPORTS_PAGINATE_REQUEST', () => {
    // Initial state
    const initialState = new Map({
      loading: false,
    });

    // Action
    const type = EXPORTS_PAGINATE_REQUEST;
    const action = {
      type,
    };

    // Expected Result
    const expectedState = {
      loading: true,
    };

    expect(feeds(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  it('should handle EXPORTS_PAGINATE_FAILURE', () => {
    // Initial state
    const initialState = new Map({
      error: null,
      loading: true,
      loadedExports: false,
    });

    // Action
    const type = EXPORTS_PAGINATE_FAILURE;
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
      loading: false,
      loadedExports: true,
    };

    expect(feeds(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  it('should handle EXPORTS_PAGINATE_SUCCESS', () => {
    // Initial state
    const initialState = new Map({
      loading: true,
      loadedExports: false,
      exports: fromJS(feedFactory()),
    });

    // Action
    const type = EXPORTS_PAGINATE_SUCCESS;
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
      loadedExports: true,
      exports: initialState.get('exports').merge(new Map({
        data: initialState.get('exports').get('data').concat(fromJS(action.result.data)),
        paginationToken: action.result.pagination_token,
      })),
    };

    expect(feeds(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  /* Favorites
   * =========
  */
  it('should handle FAVORITES_FETCH_REQUEST', () => {
    // Initial state
    const initialState = new Map({
      loading: false,
    });

    // Action
    const type = FAVORITES_FETCH_REQUEST;
    const action = {
      type,
    };

    // Expected Result
    const expectedState = {
      loading: true,
    };

    expect(feeds(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  it('should handle FAVORITES_FETCH_FAILURE', () => {
    // Initial state
    const initialState = new Map({});

    // Action
    const type = FAVORITES_FETCH_FAILURE;
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
      loadedFavorites: true,
      error: fromJS(action.error),
    };

    expect(feeds(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  it('should handle FAVORITES_FETCH_SUCCESS', () => {
    // Initial state
    const initialState = new Map({
      loading: true,
      loadedFavorites: false,
      favorites: fromJS(feedFactory()),
    });

    // Action
    const type = FAVORITES_FETCH_SUCCESS;
    const result = {
      data: [],
      pagination_token: 'abc123',
    };
    const action = {
      type,
      result,
    };

    // Expected Result
    const expectedState = {
      loading: false,
      loadedFavorites: true,
      favorites: initialState.get('favorites').merge(new Map({
        data: fromJS(action.result.data),
        paginationToken: action.result.pagination_token,
      })),
    };

    expect(feeds(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  // it('should handle FAVORITES_PAGINATE_REQUEST', () => {
  //   // Initial state
  //   const initialState = new Map({
  //     loading: false,
  //   });

  //   // Action
  //   const type = FAVORITES_PAGINATE_REQUEST;
  //   const action = {
  //     type,
  //   };

  //   // Expected Result
  //   const expectedState = {
  //     loading: true,
  //   };

  //   expect(feeds(initialState, action)).to.deep.equal(fromJS(expectedState));
  // });

  // it('should handle FAVORITES_PAGINATE_FAILURE', () => {
  //   // Initial state
  //   const initialState = new Map({});

  //   // Action
  //   const type = FAVORITES_PAGINATE_FAILURE;
  //   const error = {
  //     message: 'Error!',
  //     statusCode: 500,
  //   };
  //   const action = {
  //     type,
  //     error,
  //   };

  //   // Expected Result
  //   const expectedState = {
  //     loading: false,
  //     loaded: true,
  //     error: fromJS(action.error),
  //   };

  //   expect(feeds(initialState, action)).to.deep.equal(fromJS(expectedState));
  // });

  // it('should handle FAVORITES_PAGINATE_SUCCESS', () => {
  //   // Initial state
  //   const initialState = new Map({});

  //   // Action
  //   const type = FAVORITES_PAGINATE_SUCCESS;
  //   const result = {
  //     typeof: 'registered_user',
  //   };
  //   const action = {
  //     type,
  //     result,
  //   };

  //   // Expected Result
  //   const expectedState = {
  //     loading: false,
  //     loaded: true,
  //     user: fromJS(action.result),
  //     proxyUser: null,
  //   };

  //   expect(feeds(initialState, action)).to.deep.equal(fromJS(expectedState));
  // });

  /* My Projects
   * ===========
  */
  it('should handle MYPROJECTS_FETCH_REQUEST', () => {
    // Initial state
    const initialState = new Map({
      loading: false,
    });

    // Action
    const type = MYPROJECTS_FETCH_REQUEST;
    const action = {
      type,
    };

    // Expected Result
    const expectedState = {
      loading: true,
    };

    expect(feeds(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  it('should handle MYPROJECTS_FETCH_FAILURE', () => {
    // Initial state
    const initialState = new Map({});

    // Action
    const type = MYPROJECTS_FETCH_FAILURE;
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
      loadedMine: true,
      error: fromJS(action.error),
    };

    expect(feeds(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  it('should handle MYPROJECTS_FETCH_SUCCESS', () => {
    // Initial state
    const initialState = new Map({
      loading: true,
      loadedMine: false,
      mine: fromJS(feedFactory()),
    });

    // Action
    const type = MYPROJECTS_FETCH_SUCCESS;
    const result = {
      data: [],
      pagination_token: 'abc123',
    };
    const action = {
      type,
      result,
    };

    // Expected Result
    const expectedState = {
      loading: false,
      loadedMine: true,
      mine: initialState.get('mine').merge(new Map({
        data: fromJS(action.result.data),
        paginationToken: action.result.pagination_token,
      })),
    };

    expect(feeds(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  it('should handle MYPROJECTS_PAGINATE_REQUEST', () => {
    // Initial state
    const initialState = new Map({
      loading: false,
    });

    // Action
    const type = MYPROJECTS_PAGINATE_REQUEST;
    const action = {
      type,
    };

    // Expected Result
    const expectedState = {
      loading: true,
    };

    expect(feeds(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  it('should handle MYPROJECTS_PAGINATE_FAILURE', () => {
    // Initial state
    const initialState = new Map({});

    // Action
    const type = MYPROJECTS_PAGINATE_FAILURE;
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
      loadedMine: true,
      error: fromJS(action.error),
    };

    expect(feeds(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  it('should handle MYPROJECTS_PAGINATE_SUCCESS', () => {
    // Initial state
    const initialState = new Map({
      loading: true,
      mine: fromJS(feedFactory()),
    });

    // Action
    const type = MYPROJECTS_PAGINATE_SUCCESS;
    const result = {
      data: [],
      pagination_token: 'abc123',
    };
    const action = {
      type,
      result,
    };

    // Expected Result
    const expectedState = {
      loading: false,
      loadedMine: true,
      mine: initialState.get('mine').merge(new Map({
        data: initialState.get('mine').get('data').concat(fromJS(action.result.data)),
        paginationToken: action.result.pagination_token,
      })),
    };

    expect(feeds(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  /* Project
   * =======
  */
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
    };

    expect(feeds(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  it('should handle PROJECT_CREATE_FAILURE', () => {
    // Initial state
    const initialState = new Map({
      error: null,
      loading: true,
    });

    // Action
    const type = PROJECT_CREATE_FAILURE;
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
      loading: false,
    };

    expect(feeds(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  it('should handle PROJECT_CREATE_SUCCESS', () => {
    // Initial state
    const initialState = new Map({
      loading: true,
      mine: fromJS(feedFactory()),
    });

    // Action
    const type = PROJECT_CREATE_SUCCESS;
    const result = {
      data: {},
    };
    const action = {
      type,
      result,
    };

    // Expected Result
    const expectedState = {
      loading: false,
      mine: initialState.get('mine').merge(new Map({
        data: initialState.get('mine').get('data').push(fromJS(action.result.data)),
      })),
    };

    expect(feeds(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  it('should handle PROJECT_DELETE_OPTIMISTIC', () => {
    // Initial state
    const initialState = new Map({
      mine: fromJS(feedFactory({
        data: [{}, {}],
      })),
    });

    // Action
    const type = PROJECT_DELETE_OPTIMISTIC;
    const result = {
      index: 0,
    };
    const action = {
      type,
      result,
    };

    // Expected Result
    const expectedState = {
      mine: initialState.get('mine').merge(new Map({
        data: initialState.get('mine').get('data').delete(action.result.index),
      })),
    };

    expect(feeds(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  it('should handle PROJECT_DELETE_REQUEST', () => {
    // Initial state
    const initialState = new Map({
      loading: false,
    });

    // Action
    const type = PROJECT_DELETE_REQUEST;
    const action = {
      type,
    };

    // Expected Result
    const expectedState = {
      loading: true,
    };

    expect(feeds(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  it('should handle PROJECT_DELETE_FAILURE', () => {
    // Initial state
    const initialState = new Map({
      error: null,
      loading: true,
    });

    // Action
    const type = PROJECT_DELETE_FAILURE;
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
      loading: false,
    };

    expect(feeds(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  it('should handle PROJECT_DELETE_SUCCESS', () => {
    // Initial state
    const initialState = new Map({
      loading: true,
    });

    // Action
    const type = PROJECT_DELETE_SUCCESS;
    const result = {
      data: true,
    };
    const action = {
      type,
      result,
    };

    // Expected Result
    const expectedState = {
      loading: false,
    };

    expect(feeds(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  /* Templates
   * =========
  */
  it('should handle TEMPLATES_FETCH_REQUEST', () => {
    // Initial state
    const initialState = new Map({
      loading: false,
    });

    // Action
    const type = TEMPLATES_FETCH_REQUEST;
    const action = {
      type,
    };

    // Expected Result
    const expectedState = {
      loading: true,
    };

    expect(feeds(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  it('should handle TEMPLATES_FETCH_FAILURE', () => {
    // Initial state
    const initialState = new Map({
      error: null,
      loading: true,
      loadedTemplates: false,
    });

    // Action
    const type = TEMPLATES_FETCH_FAILURE;
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
      loadedTemplates: true,
      error: fromJS(action.error),
    };

    expect(feeds(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  it('should handle TEMPLATES_FETCH_SUCCESS', () => {
    // Initial state
    const initialState = new Map({
      loading: true,
      loadedTemplates: false,
      templates: fromJS(feedFactory()),
    });

    // Action
    const type = TEMPLATES_FETCH_SUCCESS;
    const result = {
      data: [],
      pagination_token: 'abc123',
    };
    const action = {
      type,
      result,
    };

    // Expected Result
    const expectedState = {
      loading: false,
      loadedTemplates: true,
      templates: initialState.get('templates').merge(new Map({
        data: fromJS(action.result.data),
        paginationToken: action.result.pagination_token,
      })),
    };

    expect(feeds(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  it('should handle TEMPLATES_PAGINATE_REQUEST', () => {
    // Initial state
    const initialState = new Map({
      loading: false,
    });

    // Action
    const type = TEMPLATES_PAGINATE_REQUEST;
    const action = {
      type,
    };

    // Expected Result
    const expectedState = {
      loading: true,
    };

    expect(feeds(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  it('should handle TEMPLATES_PAGINATE_FAILURE', () => {
    // Initial state
    const initialState = new Map({
      error: null,
      loadedTemplates: false,
      loading: true,
    });

    // Action
    const type = TEMPLATES_PAGINATE_FAILURE;
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
      loadedTemplates: true,
      error: fromJS(action.error),
    };

    expect(feeds(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  it('should handle TEMPLATES_PAGINATE_SUCCESS', () => {
    // Initial state
    const initialState = new Map({
      loading: true,
      loadedTemplates: false,
      templates: fromJS(feedFactory()),
    });

    // Action
    const type = TEMPLATES_PAGINATE_SUCCESS;
    const result = {
      data: [],
      pagination_token: 'abc123',
    };
    const action = {
      type,
      result,
    };

    // Expected Result
    const expectedState = {
      loading: false,
      loadedTemplates: true,
      templates: initialState.get('templates').merge(new Map({
        data: initialState.get('templates').get('data').concat(fromJS(action.result.data)),
        paginationToken: action.result.pagination_token,
      })),
    };

    expect(feeds(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  /* Uploads
   * =======
  */
  it('should handle UPLOADS_FETCH_REQUEST', () => {
    // Initial state
    const initialState = new Map({
      loading: false,
    });

    // Action
    const type = UPLOADS_FETCH_REQUEST;
    const action = {
      type,
    };

    // Expected Result
    const expectedState = {
      loading: true,
    };

    expect(feeds(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  it('should handle UPLOADS_FETCH_FAILURE', () => {
    // Initial state
    const initialState = new Map({
      error: null,
      loadedUploads: false,
      loading: true,
    });

    // Action
    const type = UPLOADS_FETCH_FAILURE;
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
      loadedUploads: true,
      error: fromJS(action.error),
    };

    expect(feeds(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  it('should handle UPLOADS_FETCH_SUCCESS', () => {
    // Initial state
    const initialState = new Map({
      loading: true,
      loadedUploads: false,
      uploads: fromJS(feedFactory()),
    });

    // Action
    const type = UPLOADS_FETCH_SUCCESS;
    const result = {
      data: [],
      pagination_token: 'abc123',
    };
    const action = {
      type,
      result,
    };

    // Expected Result
    const expectedState = {
      loading: false,
      loadedUploads: true,
      uploads: initialState.get('uploads').merge(new Map({
        data: fromJS(action.result.data),
        paginationToken: action.result.pagination_token,
      })),
    };

    expect(feeds(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  it('should handle UPLOADS_PAGINATE_REQUEST', () => {
    // Initial state
    const initialState = new Map({
      loading: false,
    });

    // Action
    const type = UPLOADS_PAGINATE_REQUEST;
    const action = {
      type,
    };

    // Expected Result
    const expectedState = {
      loading: true,
    };

    expect(feeds(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  it('should handle UPLOADS_PAGINATE_FAILURE', () => {
    // Initial state
    const initialState = new Map({
      error: null,
      loadedUploads: false,
      loading: true,
    });

    // Action
    const type = UPLOADS_PAGINATE_FAILURE;
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
      loadedUploads: true,
      error: fromJS(action.error),
    };

    expect(feeds(initialState, action)).to.deep.equal(fromJS(expectedState));
  });

  it('should handle UPLOADS_PAGINATE_SUCCESS', () => {
    // Initial state
    const initialState = new Map({
      loading: true,
      loadedUploads: false,
      uploads: fromJS(feedFactory()),
    });

    // Action
    const type = UPLOADS_PAGINATE_SUCCESS;
    const result = {
      data: [],
      pagination_token: 'abc123',
    };
    const action = {
      type,
      result,
    };

    // Expected Result
    const expectedState = {
      loading: false,
      loadedUploads: true,
      uploads: initialState.get('uploads').merge(new Map({
        data: initialState.get('uploads').get('data').concat(fromJS(action.result.data)),
        paginationToken: action.result.pagination_token,
      })),
    };

    expect(feeds(initialState, action)).to.deep.equal(fromJS(expectedState));
  });
});
