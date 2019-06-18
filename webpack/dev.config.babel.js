// webpack/dev.config.babel.js
// This is the webpack config to use during development.
// It enables the hot module replacement, the source maps and inline CSS styles.

import path from 'path';
import webpack from 'webpack';
import WebpackErrorNotificationPlugin from 'webpack-error-notification';

// PostCSS
import autoprefixer from 'autoprefixer';
import cssCalc from 'postcss-calc';
import cssColorFunction from 'postcss-color-function';
import cssVariables from 'postcss-css-variables';
import cssImports from 'postcss-import';
import cssCustomMedia from 'postcss-custom-media';
import cssNesting from 'postcss-nesting';

import { newPlugin } from './iso-tools';

const isoToolsPlugin = newPlugin();

const host = process.env.HOST || '0.0.0.0';
const port = (process.env.PORT + 1) || 3001;
const dist = path.resolve(__dirname, '../static/dist');

const config = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    app: [
      `webpack-dev-server/client?http://${host}:${port}`,
      'webpack/hot/only-dev-server',
      './app/client.js',
    ],
    // Include only packages used by the client
    vendor: [
      'core-js/es6/map',
      'core-js/es6/set',
      'core-js/es6/promise',
      'core-js/es7/object',
      'immutable',
      'lodash/debounce',
      'lodash/find',
      'lodash/findIndex',
      'lodash/isEqual',
      'raf/polyfill',
      'react',
      'react-dom',
      'react-ga',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'scroll-behavior',
      'superagent',
    ],
  },
  output: {
    filename: '[name].js',
    path: dist,
    publicPath: `http://${host}:${port}/dist/`,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '_[name]__[local]',
              },
              importLoaders: 2,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: loader => [ // eslint-disable-line no-unused-vars
                autoprefixer,
                cssImports(),
                cssCustomMedia(),
                cssNesting,
                cssVariables({}),
                cssColorFunction(),
                cssCalc({ warnWhenCannotResolve: true }),
              ],
            },
          },
        ],
      }, {
        test: isoToolsPlugin.regular_expression('images'),
        loader: 'url-loader',
        options: {
          limit: 8000,
        },
      }, {
        test: /\.(woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
    ],
  },
  plugins: [
    isoToolsPlugin.development(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        API_ENV: JSON.stringify(process.env.API_ENV) || 'development',
        BROWSER: JSON.stringify(true),
        CLOUDINARY_SECRET: JSON.stringify(process.env.CLOUDINARY_SECRET),
        NODE_ENV: JSON.stringify('development'),
        DEVTOOLS: true,
      },
    }),

    new WebpackErrorNotificationPlugin(),
  ],
  optimization: {
    splitChunks: { // CommonsChunkPlugin()
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    noEmitOnErrors: true, // NoEmitOnErrorsPlugin
    concatenateModules: true, // ModuleConcatenationPlugin
  },
};

export default config;
