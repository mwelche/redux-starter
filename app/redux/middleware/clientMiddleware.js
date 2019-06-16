// app/redux/middleware/clientMiddleware.js

export default function clientMiddleware(client) {
  // Modeled after redux-thunk
  return ({ dispatch, getState }) => next => (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    // Handle batch actions
    if (Array.isArray(action)) {
      return action.filter(Boolean).map(dispatch);
    }

    const { promise, types, ...rest } = action; // eslint-disable-line no-redeclare
    if (!promise) {
      return next(action);
    }

    const [REQUEST, SUCCESS, FAILURE] = types;
    // console.log('types', types);
    next({ ...rest, type: REQUEST });

    // Handle a request/promise
    const actionPromise = promise(client);
    actionPromise.then(
      result => next({ ...rest, result, type: SUCCESS }),
      error => next({ ...rest, error, type: FAILURE }),
    ).catch((error) => {
      console.error('MIDDLEWARE ERROR:', error);
      next({ ...rest, error, type: FAILURE });
    });

    return actionPromise;
  };
}
