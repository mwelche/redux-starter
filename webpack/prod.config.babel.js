// webpack/prod.config.babel.js
// Webpack config for creating the production bundle.

import path from 'path';
import webpack from 'webpack';
import { StatsWriterPlugin } from 'webpack-stats-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

// PostCSS
import autoprefixer from 'autoprefixer';
import cssCalc from 'postcss-calc';
import cssColorFunction from 'postcss-color-function';
import cssVariables from 'postcss-css-variables';
import cssImports from 'postcss-import';
import cssCustomMedia from 'postcss-custom-media';
import cssNesting from 'postcss-nesting';

import { newPlugin } from './iso-tools';

const dist = path.resolve(__dirname, '../static/dist');
const isoToolsPlugin = newPlugin();

export default {
  mode: 'production',
  entry: {
    app: [
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
    path: dist,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/static/dist/',
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                context: path.resolve(__dirname, '../app/css'),
                modules: true,
                importLoaders: 2,
                localIdentName: '[hash:6]',
                minimize: true,
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
                  cssCalc({ warnWhenCannotResolve: false }),
                ],
              },
            },
          ],
        }),
      }, {
        test: isoToolsPlugin.regular_expression('images'),
        loader: 'url-loader',
        options: {
          limit: 5000,
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
    isoToolsPlugin,

    // Cleanup extraneous files from the output directory
    new CleanWebpackPlugin(['static/dist/*.*'], {
      root: path.resolve(__dirname, '..'),
    }),

    // css files from the extract-text-plugin loader
    new ExtractTextPlugin({
      filename: '[name]-[chunkhash].css',
      ignoreOrder: true,
      allChunks: true,
    }),

    new webpack.DefinePlugin({
      'process.env': {
        // Used to require CSS files with webpack as `if (process.env.BROWSER)...`
        API_ENV: JSON.stringify(process.env.API_ENV),
        BROWSER: JSON.stringify(true),
        CLOUDINARY_SECRET: JSON.stringify(process.env.CLOUDINARY_SECRET),
        NODE_ENV: JSON.stringify('production'),
      },
    }),

    // Write out stats.json file to build directory.
    new StatsWriterPlugin(),
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
      minSize: 5000,
    },
    noEmitOnErrors: true, // NoEmitOnErrorsPlugin
    concatenateModules: true, // ModuleConcatenationPlugin
    minimizer: [
      new UglifyJsPlugin({
        cache: false,
        parallel: true,
        uglifyOptions: {
          compress: {
            drop_console: false,
          },
          ecma: 5,
          mangle: true,
        },
      }),
    ],
  },
};
