// app/routes/onEnter/fetchUser.js

// Actions
import {
  isLoaded as isAuthLoaded,
  load as loadAuth,
  login as auth,
} from '../../actions/auth';
// Utils
import { getTimeStamp } from '../../utils/utility';
import Storage from '../../utils/Storage';
// Config
import { CLIENT_TOKEN } from '../../../config/environment';

export default function (store, res, token, expires) {
  const { dispatch, getState } = store;

  const dispatchFetchToken = (ignoreToken) => {
    return dispatch(auth({ isLogin: ignoreToken })).then((proxyTokenResult) => {
      const {
        expires: newExpires,
        token: newToken,
      } = proxyTokenResult;

      if (process.env.BROWSER) {
        Storage.set('token_magic', newToken, {
          path: '/',
        });
      } else if (res) {
        res.cookie('token_magic', newToken, {
          path: '/',
        });
      }

      return Promise.resolve(proxyTokenResult);
    }, (e) => {
      // console.log('token e', e);

      return Promise.reject(e);
    });
  };

  return () => {
    const expired = typeof expires === 'number' && expires < getTimeStamp();

    if (!token || token === CLIENT_TOKEN || expired) {
      // console.log('fetch token');
      return dispatchFetchToken(true);
    }
    // console.log('fetch auth', token);

    if (!isAuthLoaded(getState())) {
      return dispatch(loadAuth()).then((user = {}) => {
        return Promise.resolve(user);
      }, () => {
        return dispatchFetchToken(true);
      });
    }

    return Promise.resolve();
  };
}
