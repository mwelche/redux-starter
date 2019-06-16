// tests/universal/actions/feeds.spec.js
import configureMockStore from 'redux-mock-store';
import clientMiddleware from './MockMiddleware';
import MockClient from './MockClient';
import { expect } from 'chai';
import { fromJS, Map } from 'immutable';
//
import { feedFactory } from '../../../app/reducers/helpers/factory';
import ActionTypes from '../../../app/constants/ActionTypes';

const {
  MYPROJECTS_FETCH_REQUEST,
  MYPROJECTS_FETCH_SUCCESS,
  MYPROJECTS_FETCH_FAILURE,
  MYPROJECTS_PAGINATE_REQUEST,
  MYPROJECTS_PAGINATE_SUCCESS,
  MYPROJECTS_PAGINATE_FAILURE,
  UPLOADS_FETCH_REQUEST,
  UPLOADS_FETCH_SUCCESS,
  UPLOADS_FETCH_FAILURE,
  UPLOADS_PAGINATE_REQUEST,
  UPLOADS_PAGINATE_SUCCESS,
  UPLOADS_PAGINATE_FAILURE,
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
  TEMPLATES_FETCH_REQUEST,
  TEMPLATES_FETCH_SUCCESS,
  TEMPLATES_FETCH_FAILURE,
  TEMPLATES_PAGINATE_REQUEST,
  TEMPLATES_PAGINATE_SUCCESS,
  TEMPLATES_PAGINATE_FAILURE,
} = ActionTypes;

import {
  isExportsLoaded,
  isLoaded,
  isTemplatesLoaded,
  isUploadsLoaded,
  fetchExports,
  fetchMine,
  fetchTemplates,
  fetchUploads,
  fetchFavorites,
} from '../../../app/actions/feeds';

const client = new MockClient();
const middlewares = [clientMiddleware(client)];
const mockStore = configureMockStore(middlewares);
const store = mockStore(new Map({
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
}));

describe('ACTIONS: feeds', () => {
  afterEach(() => {
    client.reset();
    store.clearActions();
  });

  it('should expect isLoaded return false', () => {
    const globalState = {
      feeds: store.getState(),
    };

    expect(isLoaded(globalState)).to.equal(false);
  });

  it('should expect isExportsLoaded return false', () => {
    const globalState = {
      feeds: store.getState(),
    };

    expect(isExportsLoaded(globalState)).to.equal(false);
  });

  it('should expect isTemplatesLoaded return false', () => {
    const globalState = {
      feeds: store.getState(),
    };

    expect(isTemplatesLoaded(globalState)).to.equal(false);
  });

  it('should expect isUploadsLoaded return false', () => {
    const globalState = {
      feeds: store.getState(),
    };

    expect(isUploadsLoaded(globalState)).to.equal(false);
  });

  it('should expect MYPROJECTS_FETCH_REQUEST & MYPROJECTS_FETCH_SUCCESS', () => {
    const query = {
      limit: 12,
    };
    const result = {
      data: [],
    };
    client.getOnce('/feeds/mine', { body: result });

    const expectedActions = [
      {
        type: MYPROJECTS_FETCH_REQUEST,
        params: query,
      },
      {
        type: MYPROJECTS_FETCH_SUCCESS,
        result,
      },
    ];

    return store.dispatch(fetchMine(query)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('should expect MYPROJECTS_FETCH_REQUEST & MYPROJECTS_FETCH_FAILURE', () => {
    const query = {
      limit: 12,
    };
    const error = {
      message: 'some error',
    };
    client.getOnce('/feeds/mine', { error });

    const expectedActions = [
      {
        type: MYPROJECTS_FETCH_REQUEST,
        params: query,
      },
      {
        type: MYPROJECTS_FETCH_FAILURE,
        error,
      },
    ];

    return store.dispatch(fetchMine(query)).catch(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('should expect MYPROJECTS_PAGINATE_REQUEST & MYPROJECTS_PAGINATE_SUCCESS', () => {
    const query = {
      limit: 12,
      paginationToken: 'abc123',
    };
    const result = {
      data: [],
    };
    client.getOnce('/feeds/mine', { body: result });

    const expectedActions = [
      {
        type: MYPROJECTS_PAGINATE_REQUEST,
        params: {
          limit: 12,
          pagination_token: 'abc123',
        },
      },
      {
        type: MYPROJECTS_PAGINATE_SUCCESS,
        result,
      },
    ];

    return store.dispatch(fetchMine(query)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('should expect MYPROJECTS_PAGINATE_REQUEST & MYPROJECTS_PAGINATE_FAILURE', () => {
    const query = {
      limit: 12,
      paginationToken: 'abc123',
    };
    const error = {
      message: 'some error',
    };
    client.getOnce('/feeds/mine', { error });

    const expectedActions = [
      {
        type: MYPROJECTS_PAGINATE_REQUEST,
        params: {
          limit: 12,
          pagination_token: 'abc123',
        },
      },
      {
        type: MYPROJECTS_PAGINATE_FAILURE,
        error,
      },
    ];

    return store.dispatch(fetchMine(query)).catch(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('should expect UPLOADS_FETCH_REQUEST & UPLOADS_FETCH_SUCCESS', () => {
    const query = {
      limit: 16,
    };
    const result = {
      data: [],
    };
    client.getOnce('/feeds/medias/mine', { body: result });

    const expectedActions = [
      {
        type: UPLOADS_FETCH_REQUEST,
        params: query,
      },
      {
        type: UPLOADS_FETCH_SUCCESS,
        result,
      },
    ];

    return store.dispatch(fetchUploads(query)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('should expect UPLOADS_FETCH_REQUEST & UPLOADS_FETCH_FAILURE', () => {
    const query = {
      limit: 16,
    };
    const error = {
      message: 'some error',
    };
    client.getOnce('/feeds/medias/mine', { error });

    const expectedActions = [
      {
        type: UPLOADS_FETCH_REQUEST,
        params: query,
      },
      {
        type: UPLOADS_FETCH_FAILURE,
        error,
      },
    ];

    return store.dispatch(fetchUploads(query)).catch(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('should expect UPLOADS_PAGINATE_REQUEST & UPLOADS_PAGINATE_SUCCESS', () => {
    const query = {
      limit: 16,
      paginationToken: 'abc123',
    };
    const result = {
      data: [],
    };
    client.getOnce('/feeds/medias/mine', { body: result });

    const expectedActions = [
      {
        type: UPLOADS_PAGINATE_REQUEST,
        params: {
          limit: 16,
          pagination_token: 'abc123',
        },
      },
      {
        type: UPLOADS_PAGINATE_SUCCESS,
        result,
      },
    ];

    return store.dispatch(fetchUploads(query)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('should expect UPLOADS_PAGINATE_REQUEST & UPLOADS_PAGINATE_FAILURE', () => {
    const query = {
      limit: 16,
      paginationToken: 'abc123',
    };
    const error = {
      message: 'some error',
    };
    client.getOnce('/feeds/medias/mine', { error });

    const expectedActions = [
      {
        type: UPLOADS_PAGINATE_REQUEST,
        params: {
          limit: 16,
          pagination_token: 'abc123',
        },
      },
      {
        type: UPLOADS_PAGINATE_FAILURE,
        error,
      },
    ];

    return store.dispatch(fetchUploads(query)).catch(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('should expect EXPORTS_FETCH_REQUEST & EXPORTS_FETCH_SUCCESS', () => {
    const query = {
      limit: 12,
    };
    const result = {
      data: [],
    };
    client.getOnce('/feeds/exports/mine', { body: result });

    const expectedActions = [
      {
        type: EXPORTS_FETCH_REQUEST,
        params: query,
      },
      {
        type: EXPORTS_FETCH_SUCCESS,
        result,
      },
    ];

    return store.dispatch(fetchExports(query)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('should expect EXPORTS_FETCH_REQUEST & EXPORTS_FETCH_SUCCESS', () => {
    const query = {
      limit: 12,
    };
    const error = {
      message: 'some error',
    };
    client.getOnce('/feeds/exports/mine', { error });

    const expectedActions = [
      {
        type: EXPORTS_FETCH_REQUEST,
        params: query,
      },
      {
        type: EXPORTS_FETCH_FAILURE,
        error,
      },
    ];

    return store.dispatch(fetchExports(query)).catch(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('should expect EXPORTS_PAGINATE_REQUEST & EXPORTS_PAGINATE_SUCCESS', () => {
    const query = {
      limit: 12,
      paginationToken: 'abc123',
    };
    const result = {
      data: [],
    };
    client.getOnce('/feeds/exports/mine', { body: result });

    const expectedActions = [
      {
        type: EXPORTS_PAGINATE_REQUEST,
        params: {
          limit: 12,
          pagination_token: 'abc123',
        },
      },
      {
        type: EXPORTS_PAGINATE_SUCCESS,
        result,
      },
    ];

    return store.dispatch(fetchExports(query)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('should expect EXPORTS_PAGINATE_REQUEST & EXPORTS_PAGINATE_FAILURE', () => {
    const query = {
      limit: 12,
      paginationToken: 'abc123',
    };
    const error = {
      message: 'some error',
    };
    client.getOnce('/feeds/exports/mine', { error });

    const expectedActions = [
      {
        type: EXPORTS_PAGINATE_REQUEST,
        params: {
          limit: 12,
          pagination_token: 'abc123',
        },
      },
      {
        type: EXPORTS_PAGINATE_FAILURE,
        error,
      },
    ];

    return store.dispatch(fetchExports(query)).catch(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('should expect TEMPLATES_FETCH_REQUEST & TEMPLATES_FETCH_SUCCESS', () => {
    const query = {
      limit: 8,
    };
    const result = {
      data: [],
    };
    client.getOnce('/feeds/groups/featured', { body: result });

    const expectedActions = [
      {
        type: TEMPLATES_FETCH_REQUEST,
        params: query,
      },
      {
        type: TEMPLATES_FETCH_SUCCESS,
        result,
      },
    ];

    return store.dispatch(fetchTemplates(query)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('should expect TEMPLATES_FETCH_REQUEST & TEMPLATES_FETCH_FAILURE', () => {
    const query = {
      limit: 8,
    };
    const error = {
      message: 'some error',
    };
    client.getOnce('/feeds/groups/featured', { error });

    const expectedActions = [
      {
        type: TEMPLATES_FETCH_REQUEST,
        params: query,
      },
      {
        type: TEMPLATES_FETCH_FAILURE,
        error,
      },
    ];

    return store.dispatch(fetchTemplates(query)).catch(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('should expect TEMPLATES_PAGINATE_REQUEST & TEMPLATES_PAGINATE_SUCCESS', () => {
    const query = {
      limit: 8,
      paginationToken: 'abc123',
    };
    const result = {
      data: [],
    };

    client.getOnce('/feeds/groups/featured', { body: result });

    const expectedActions = [
      {
        type: TEMPLATES_PAGINATE_REQUEST,
        params: {
          limit: 8,
          pagination_token: 'abc123',
        },
      },
      {
        type: TEMPLATES_PAGINATE_SUCCESS,
        result,
      },
    ];

    return store.dispatch(fetchTemplates(query)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('should expect TEMPLATES_PAGINATE_REQUEST & TEMPLATES_PAGINATE_FAILURE', () => {
    const query = {
      limit: 8,
      paginationToken: 'abc123',
    };
    const error = {
      message: 'some error',
    };

    client.getOnce('/feeds/groups/featured', { error });

    const expectedActions = [
      {
        type: TEMPLATES_PAGINATE_REQUEST,
        params: {
          limit: 8,
          pagination_token: 'abc123',
        },
      },
      {
        type: TEMPLATES_PAGINATE_FAILURE,
        error,
      },
    ];

    return store.dispatch(fetchTemplates(query)).catch(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('should expect FAVORITES_FETCH_REQUEST & FAVORITES_FETCH_SUCCESS', () => {
    const query = {
      limit: 8,
    };
    const result = {
      data: [],
    };
    client.getOnce('/feeds/templates', { body: result });

    const expectedActions = [
      {
        type: FAVORITES_FETCH_REQUEST,
        params: query,
      },
      {
        type: FAVORITES_FETCH_SUCCESS,
        result,
      },
    ];

    return store.dispatch(fetchFavorites(query)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('should expect FAVORITES_FETCH_REQUEST & FAVORITES_FETCH_FAILURE', () => {
    const query = {
      limit: 8,
    };
    const error = {
      message: 'some error',
    };
    client.getOnce('/feeds/templates', { error });

    const expectedActions = [
      {
        type: FAVORITES_FETCH_REQUEST,
        params: query,
      },
      {
        type: FAVORITES_FETCH_FAILURE,
        error,
      },
    ];

    return store.dispatch(fetchFavorites(query)).catch(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('should expect FAVORITES_PAGINATE_REQUEST & FAVORITES_PAGINATE_SUCCESS', () => {
    const query = {
      limit: 8,
      paginationToken: 'abc123',
    };
    const result = {
      data: [],
    };

    client.getOnce('/feeds/templates', { body: result });

    const expectedActions = [
      {
        type: FAVORITES_PAGINATE_REQUEST,
        params: {
          limit: 8,
          pagination_token: 'abc123',
        },
      },
      {
        type: FAVORITES_PAGINATE_SUCCESS,
        result,
      },
    ];

    return store.dispatch(fetchFavorites(query)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('should expect FAVORITES_PAGINATE_REQUEST & FAVORITES_PAGINATE_FAILURE', () => {
    const query = {
      limit: 8,
      paginationToken: 'abc123',
    };
    const error = {
      message: 'some error',
    };

    client.getOnce('/feeds/templates', { error });

    const expectedActions = [
      {
        type: FAVORITES_PAGINATE_REQUEST,
        params: {
          limit: 8,
          pagination_token: 'abc123',
        },
      },
      {
        type: FAVORITES_PAGINATE_FAILURE,
        error,
      },
    ];

    return store.dispatch(fetchFavorites(query)).catch(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });
});
