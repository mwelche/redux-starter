
export default function mockMiddleware(client) {
  // Modeled after redux-thunk
  return ({ dispatch, getState }) => next => (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    const { promise, types, ...rest } = action; // eslint-disable-line no-redeclare
    if (!promise) {
      return next(action);
    }

    const [REQUEST, SUCCESS, FAILURE] = types;


    const actionPromise = promise(client);

    // console.log('types', types);
    const obj = { ...rest, type: REQUEST };
    const params = client.getParams();
    const data = client.getData();
    if (params) {
      obj.params = params;
    }
    if (data && Object.keys(data).length > 0) {
      obj.data = data;
    }
    next(obj);

    actionPromise.then(
      result => next({ ...rest, result, type: SUCCESS }),
      error => next({ ...rest, error, type: FAILURE }),
    ).catch((error) => {
      next({ ...rest, error, type: FAILURE });
    });

    return actionPromise;
  };
}
