// app/utils/ApiClient.js

import superagent from 'superagent';
import ENV from '../../config/environment';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? `/${path}` : path;
  // Prepend `/api` to relative URL, to proxy to API server.
  return `${ENV.API_HOST}/api${adjustedPath}`;
}

/*
 * This silly underscore is here to avoid a mysterious "ReferenceError: ApiClient is not defined" error.
 * See Issue #14. https://github.com/erikras/react-redux-universal-hot-example/issues/14
 *
 * Remove it at your own risk.
 */
class _ApiClient {
  constructor(req, options = {}) {
    methods.forEach((method) => {
      this[method] = (path, { params, data = {} } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));
        const { ...reqBody } = data;

        // set cookies for server side requests
        if (!process.env.BROWSER && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }

        // GET REQUESTS
        // use params obj in action to set 'get' query
        if (params) {
          request.query(params);
        }

        // POST REQUESTS
        // use data obj in action to get request body for 'post' or 'put'
        if (reqBody && Object.keys(reqBody).length > 0) {
          // request.set('Content-Type', 'application/json');
          request.send(reqBody);
        }


        request.end((err, resp) => {
          // console.log('resp', resp, err);
          // console.log('resp', resp.text);
          const body = resp && resp.text && resp.status !== 204
            ? JSON.parse(resp.text)
            : {};

          return err
            ? reject(body || err)
            : resolve(body);
        });
      });

      return this[method];
    });
  }
}

const ApiClient = _ApiClient;

export default ApiClient;
