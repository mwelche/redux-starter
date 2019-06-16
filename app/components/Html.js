/* eslint react/no-danger:0 */

import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

const css = [];
const scripts = [];

if (process.env.NODE_ENV === 'production') {
  // on production, include scripts and css from the webpack stats
  const config = require('../../webpack/prod.config.babel').default;
  const stats = require('../../static/dist/stats.json');
  // TODO this assumes all we need is on main chunk index 0 and 1.
  const mainJS = stats.assetsByChunkName.app[0];
  const mainCSS = stats.assetsByChunkName.app[1];
  const vendor = stats.assetsByChunkName.vendor;
  const vendors = stats.assetsByChunkName.vendors;
  scripts.push(`${config.output.publicPath}${mainJS}`);
  scripts.push(`${config.output.publicPath}${vendor}`);
  if (typeof vendors === 'string') {
    scripts.push(`${config.output.publicPath}${vendors}`);
  } else {
    scripts.push(`${config.output.publicPath}${vendors[0]}`);
    css.push(`${config.output.publicPath}${vendors[1]}`);
  }
  css.push(`${config.output.publicPath}${mainCSS}`);
} else {
  // on development, use the webpack dev server config
  // css are not needed since they are injected inline with webpack
  const config = require('../../webpack/dev.config.babel').default;
  scripts.push(`${config.output.publicPath}app.js`);
  scripts.push(`${config.output.publicPath}vendor.js`);
  scripts.push(`${config.output.publicPath}vendors.js`);
}

class Html extends React.Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    store: PropTypes.object.isRequired,
  }

  render() {
    const { content, store } = this.props;
    // TODO: grab title and description with react-helmet
    const head = Helmet.renderStatic();
    return (
      <html lang="en-us">
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}

          <link rel="shortcut icon" href="/favicon.ico" />

          { css.map((href, i) => <link href={href} key={i} rel="stylesheet" />) }
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{ __html: content }} />

          <script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_DATA__=${serialize(store.getState())};` }} />

          { scripts.map((src, i) => <script src={src} key={i} />) }
        </body>
      </html>
    );
  }
}

export default Html;
