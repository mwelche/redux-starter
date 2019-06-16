// app/utils/geolocate.js

import superagent from 'superagent';

export function getLocation(callback) {
  const url = 'http://ip-api.com/json';
  const request = superagent.get(url);

  request.on('progress', (e) => {

  }).then((result, e) => {
    // console.log('ip lookup result', result, e);

    if (callback) {
      return callback(result);
    }
  }, (e) => {
    // console.log('ip lookup e', e)
    if (callback) {
      return callback(null, e);
    }
  });
}
