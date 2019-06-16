// app/routes/landing.js
if (typeof require.ensure !== 'function') require.ensure = (d, c) => { c(require); };

export default (nextState, cb) => {
  require.ensure([], (require) => {
    cb(null, require('../components/landing/LandingContainer').default);
  }, 'landing');

  // import(
  //   /* webpackChunkName: "landing" */
  //   /* webpackMode: "lazy" */
  //   '../components/landing/LandingContainer'
  // ).then((LandingContainer) => {
  //   cb(null, LandingContainer);
  // });
};
