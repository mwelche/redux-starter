/* eslint no-console: 0 */

// Register babel to have ES6 support on the server
require('@babel/register');

var IS_DEV = process.env.NODE_ENV === 'development';
var isoTools = require('./webpack/iso-tools').newTools();

// Enable css modules to be loaded on the server side
require('css-modules-require-hook')({
  generateScopedName: IS_DEV ? '_[name]__[local]' : '[hash:6]',
  extensions: ['.css'],
  rootDir: `${__dirname}/app/css`,
});

// Prevent issues with libraries using this var (see http://tinyurl.com/pcockwk)
delete process.env.BROWSER;

function serve() {
  global.webpack_isomorphic_tools = isoTools
    .development(IS_DEV)
    .server(__dirname)
    .then(() =>
      require('./app/server').default(app => {
        console.log(
          'Express %s server listening on %s:%s',
          app.get('env'),
          app.get('host'), app.get('port')
        );
      })
    ).catch((err) => console.log('ERROR ', err));
}

if (IS_DEV) {
  require('./webpack/server').default(serve);
} else {
  serve();
}
