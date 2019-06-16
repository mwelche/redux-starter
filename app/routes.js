// app/routes.js

import React from 'react';
import { IndexRoute, Route } from 'react-router';

// Actions
import {
  isLoaded as isAuthLoaded,
  load as loadAuth,
  login as auth,
} from './actions/auth';

// Components
import App from './components/App';

// ready component
import _fetchUser from './routes/onEnter/fetchUser';
// Component getters
import getLanding from './routes/landing';
import getNotFound from './routes/notfound';

// Utils
import Storage from './utils/Storage';

/* End Imports */

// Routes
export default (store, history, req, res) => {
  let token;
  if (process.env.BROWSER) {
    token = Storage.get('token_magic');
  } else {
    // console.log('COOKIES', req && req.cookies);
    token = req.cookies.token_magic;
  }

  const { dispatch, getState } = store;
  const fetchUser = _fetchUser(store, res, token);

  const requireLogin = (nextState, replace, done) => {
    function checkAuth() {
      const user = getState().auth.get('user');

      if (!user) {
        // oops, not logged in, so can't be here!
        replace(LOGIN_ROUTE);
      }

      done();
    }

    if (!isAuthLoaded(getState())) {
      Promise.all([
        dispatch(loadAuth()),
      ]).then(() => {
        checkAuth();
      }, (e) => {
        // console.log('error', e);
        checkAuth();
      });
    } else {
      checkAuth();
    }
  };

  const requireNotLoggedIn = (nextState, replace, done) => {
    function checkAuth() {
      const user = getState().auth.get('user');

      if (user) {
        // oops, not logged in, so can't be here!
        replace(LANDING_ROUTE);
      }
      done();
    }

    if (!isAuthLoaded(getState())) {
      dispatch(loadAuth()).then(checkAuth, () => {
        dispatch(auth()).then((proxyTokenResult) => {
          Storage.set('token_magic', proxyTokenResult.token);
          checkAuth();
        }, checkAuth);
      });
    } else {
      checkAuth();
    }
  };

  const silentLogin = (nextState, replace, done) => {
    if (process.env.BROWSER && !isAuthLoaded(getState())) {
      fetchUser().then(() => done(), () => done());
    } else {
      done();
    }
  };


  /**
   * Please keep routes in alphabetical order
  * */
  return (
    <Route path="/" component={App}>
      { /* Landing route */}
      <IndexRoute getComponent={getLanding} onEnter={silentLogin} />

      { /* 404 */ }
      <Route path="404" getComponent={getNotFound} status={404} />
      { /* Catch all route */ }
      <Route path="*" getComponent={getNotFound} />
    </Route>
  );
};
