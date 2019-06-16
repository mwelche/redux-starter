// app/utils/MockClient.js

const methods = ['get', 'post', 'put', 'patch', 'del'];


/*
 * This silly underscore is here to avoid a mysterious "ReferenceError: ApiClient is not defined" error.
 * See Issue #14. https://github.com/erikras/react-redux-universal-hot-example/issues/14
 *
 * Remove it at your own risk.
 */
class _MockClient {
  constructor() {
    this.reset();

    methods.forEach((method) => {
      this[method] = (path, { params, data = {} } = {}) => new Promise((resolve, reject) => {
        if (this.store[method][path]) {
          const res = this.store[method][path];
          this.params = params;
          this.data = data;
          if (res.error) {
            return reject(res.error);
          }
          return resolve(res.body);
        }
        return resolve({});
      });
      return this[method];
    });
  }

  reset() {
    this.store = {
      get: {},
      post: {},
      put: {},
      patch: {},
      del: {},
    };
    this.params = null;
    this.data = null;
  }

  getOnce(path, res = {}) {
    this.store.get[path] = res;
  }

  postOnce(path, res = {}) {
    this.store.post[path] = res;
  }

  putOnce(path, res = {}) {
    this.store.put[path] = res;
  }

  patchOnce(path, res = {}) {
    this.store.patch[path] = res;
  }

  delOnce(path, res = {}) {
    this.store.del[path] = res;
  }

  getParams() {
    return this.params;
  }

  getData() {
    return this.data;
  }
}

const MockClient = _MockClient;

export default MockClient;
