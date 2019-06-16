/* eslint max-len: 0 */

// app/utils/Storage.js

import Cookies from 'react-cookie';

// const window = window;
// const localStorage = window && window.localStorage;
const Storage = {
  get(key) {
    if (key) {
      const local = process.env.BROWSER ? localStorage.getItem(key) : null;
      const cookie = Cookies.load(key);

      return local || cookie;
    }

    return false;
  },

  set(key, value, options = {}) {
    if (key && value) {
      if (process.env.BROWSER) {
        localStorage.setItem(key, value);
      }

      return Cookies.save(key, value, options);
    }

    return false;
  },

  remove(key, options = {}) {
    if (key) {
      if (process.env.BROWSER) {
        localStorage.removeItem(key);
      }

      return Cookies.remove(key, options);
    }

    return false;
  },
};

export default Storage;
