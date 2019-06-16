// app/routes/notfound.js
if (typeof require.ensure !== 'function') require.ensure = (d, c) => { c(require); };

export default (nextState, cb) => {
  require.ensure([], (require) => {
    cb(null, require('../components/notfound/NotFoundContainer').default);
  }, 'notFound');

  // import(
  //   /* webpackChunkName: "notFound" */
  //   /* webpackMode: "lazy" */
  //   '../components/notfound/NotFoundContainer'
  // ).then((NotFound) => {
  //   cb(null, NotFound);
  // });
};
