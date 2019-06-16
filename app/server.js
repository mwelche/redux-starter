// app/server.js

/* eslint no-console: 0 */

// Create and start the express app. Export a function so we can test it

import path from 'path';
import express from 'express';
import compression from 'compression';
// import serveStatic from 'serve-static';
import favicon from 'serve-favicon';
import httpProxy from 'http-proxy';
import PrettyError from 'pretty-error';
import morgan from 'morgan';
import raven from 'raven';
import cookieParser from 'cookie-parser';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import createHistory from 'react-router/lib/createMemoryHistory';
import { Provider } from 'react-redux';

import ENV from '../config/environment';
import createStore from './redux/create';
import ApiClient from './utils/ApiClient';
import getRoutes from './routes';

import Html from './components/Html';

process.env.PWD = process.cwd();

const staticPath = path.resolve(process.env.PWD, './static');
const targetUrl = `http://${ENV.apiHost}:${ENV.apiPort}`;
const proxy = httpProxy.createProxyServer({
  target: targetUrl,
  ws: true,
});

export default function (callback) {
  const appServer = express();
  const pretty = new PrettyError();

  appServer.set('env', process.env.NODE_ENV || 'development');
  appServer.set('host', process.env.HOST || '0.0.0.0');
  appServer.set('port', process.env.PORT || 3000);

  // Usual express stuff
  appServer.use(cookieParser());
  appServer.use(raven.middleware.express.requestHandler(ENV.sentryDSN));
  appServer.use(morgan(appServer.get('env') === 'production' ? 'combined' : 'dev'));
  appServer.use(compression());
  // appServer.use(favicon(`${staticPath}/assets/YOURFAVICON.png`));

  // Use the `static` dir for serving static assets. On production, it contains the js
  // files built with webpack
  // appServer.use(serveStatic(staticPath));
  appServer.use('/static', express.static(staticPath));

  // Proxy to API server
  appServer.use('/api', (req, res) => {
    proxy.web(req, res, { target: targetUrl });
  });

  // added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
  proxy.on('error', (error, req, res) => {
    const json = { error: 'proxy_error', reason: error.message };

    if (error.code !== 'ECONNRESET') {
      console.error('proxy error', error);
    }
    if (!res.headersSent) {
      res.writeHead(500, { 'content-type': 'application/json' });
    }

    res.end(JSON.stringify(json));
  });

  // Render the app server-side and send it as response
  appServer.use((req, res) => {
    const client = new ApiClient(req);
    const history = createHistory(req.originalUrl);
    const store = createStore(history, client);

    // console.log('REQUEST:', req.originalUrl);

    match({ history, routes: getRoutes(store, history, req, res), location: req.originalUrl }, (error, redirectLocation, renderProps) => {
      if (error) {
        const html = ReactDOMServer.renderToStaticMarkup(<Html store={store} />);
        res.locals.html = `<!doctype html>${html}`;
        throw error;
      }

      if (redirectLocation) {
        const redirectUrl = redirectLocation.pathname + redirectLocation.search;

        console.log('redirecting:', redirectUrl);
        res.redirect(302, redirectUrl);
        return;
      }

      const component = (
        <Provider store={store} key="provider">
          <RouterContext {...renderProps} />
        </Provider>
      );

      // There is a strange error in lottie on the server,
      // `'window' is not defined`, so we declare the variable in global object
      // on node to bypass it.
      global.window = global.window || {};
      global.navigator = { userAgent: req.headers['user-agent'] };

      console.log('load on server done. about to render');

      const content = ReactDOMServer.renderToString(component);
      const html = ReactDOMServer.renderToStaticMarkup(<Html
        content={content}
        store={store}
      />);

      console.log('finishing up');
      const status = renderProps.routes[renderProps.routes.length - 1].status || 200;
      res.status(status).send(`<!doctype html>${html}`);
    });
  });

  appServer.use(raven.middleware.express.errorHandler(ENV.sentryDSN));

  appServer.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    console.log('Error on request %s %s', req.method, req.url);
    console.log(pretty.render(err));
    res.status(500).send(res.locals.html || 'Something bad happened');
  });

  // Finally, start the express application
  return appServer.listen(appServer.get('port'), () => callback(appServer));
}
