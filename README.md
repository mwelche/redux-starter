# Redux Universal App

## Browser support

- ie11+
- edge
- chrome
- firefox
- safari

https://www.w3counter.com/globalstats.php

## Directory structure

```
.
├── index.js            # Starts the express server and the webpack dev server
├── src
│   ├── client.js       # Entry point for the browser
│   ├── server.js       # Starts the express server and render the pages server-side
│   ├── components      # React components
│   │   ├── ...
│   │   └── Html.js     # Component used to create the <html> page server-side
│   ├── constants       # Redux constants
│   ├── reducers        # Redux reducers
│   ├── redux
│   │   ├── middleware  # Client middleware
│   │   └── create.js   # Create the Redux instance
│   ├── utils
│   │   └── ApiClient.js# Handle api requests from client and node server
│   └── routes.js       # Routes used by the router
├── static
│   ├── assets          # Contains static assets, such as images
│   └── dist            # Contains files built by webpack
├── tests               # Unit tests
└── webpack
    ├── dev.config.js   # Webpack config for dev environment
    ├── prod.config.js  # Webpack config for building the prod environment
    ├── server.js       # Runs the webpack dev server on dev environment
    └── utils           # Plugins and utilities for webpack
```

### Router

Routing is done using [react-router](http://rackt.github.io/react-router/).

## Development

### Babeljs

Transpilation using [Babel 7](https://babeljs.io/docs/en/).

### Webpack

[Webpack](http://webpack.github.io) is used to enable hot-reload on development
and to build the static assets for production.

In the development environment, we use webpack-dev-server to compile, serve and reload the source files
as they are modified. The [main script](index.js) runs a [webpack-dev-server](./webpack/server.js)
with the [development config](./webpack/dev.config.js) and it includes the webpac's
client-side code for hot-reload. We load the bundle with a `<script>` tag
from the [Html](./src/components/Html.js) component.

> The devopment config uses the [webpack-error-notification](https://github.com/vsolovyov/webpack-error-notification)
> plugin. To get notified on errors while compiling the code, on Mac you must `brew install terminal-notifier`.

On production, we build the source for the client using the [production config](./webpack/prod.config.js).
You run the build with `npm run build` from the command line. Webpack places
the bundled files in the `static/dist` directory, adding an hash to skip the browsers
cache. Since the name of the bundle changes at each build, the [Html](./src/components/Html.js) component
extracts its name from a `stats.json` file (created with the [webpack-stats-plugin](https://www.npmjs.com/package/stats-webpack-plugin)).


### Testing

#### Unit tests

Unit Tests work with [mocha](https://mochajs.org) and [chai](chaijs.com/). To run the
unit tests, enter this command from the project's root:

```
$ npm run test
```

The `test` script runs mocha with the [babel compiler](https://babeljs.io/docs/setup/#mocha).

#### Test coverage

We use [nyc](https://github.com/istanbuljs/nyc). To run the test coverage
report, enter:

```
$ npm run cover
$ open coverage/lcov-report/index.html  # opens the HTML report
```

### Debugging Node

For VSCode:
Configure VSCode with the launch config below:
```
{
  "name": "Launch via NPM",
  "type": "node",
  "request": "launch",
  "cwd": "${workspaceFolder},
  "runtimeExecutable": "npm",
  "runtimeArgs": [
      "run-script", "debug"
  ],
  "port": 9229
}
```

Then launch debugger.

### Linting

Linting code with [eslint](http://eslint.org) is a fundamental tool when writing JavaScript:

* eslint works in Sublime Text using the [SublimeLinter package](https://github.com/roadhump/SublimeLinter-eslint).
* [.travis.yml](.travis.yml) will stop the build if the code does not lint

To run the linter, enter this command from the project's root:

```
$ npm run lint
```

eslint is configured via [.eslintrc]([.eslintrc]) to extends the [recommended
rules](http://eslint.org/docs/rules).
It uses the [babel-eslint](https://github.com/babel/babel-eslint) parser to
make it working with babeljs, and the [eslint-plugin-react](github.com/yannickcr/eslint-plugin-react)
plugin to enable React-specific rules.

### Continuous integration

[TBD]

### Deployment

#### Docker

To run the production server in docker

```
$ docker build . -t web/app
$ docker run -p 49160:3000 -d web/app:latest
```

...

[project-guidelines](https://github.com/elsewhencode/project-guidelines#readme)
