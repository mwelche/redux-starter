import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import createMiddleware from './middleware/clientMiddleware';
import { routerMiddleware } from 'react-router-redux';
import reducer from '../reducers/index';

export default function createStore(history, client, data) {
  const middleware = [
    createMiddleware(client),
    routerMiddleware(history),
  ];
  const finalCreateStore = applyMiddleware(...middleware)(_createStore);
  const store = finalCreateStore(reducer, data);

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('../reducers/index', () => {
      store.replaceReducer(require('../reducers/index'));
    });
  }

  return store;
}
