# Dynamic Routes

## Why

Code splitting separates out module chunks from the main app bundle, allowing us to choose what pieces are included and what we want to lazy load when needed.

## How it works

Dynamic import has a few different syntaxes, 3 at the moment:
- **require.ensure** (legacy)
  * more on dynamic imports with require.ensure: [https://webpack.js.org/api/module-methods/#require-ensure]

- **System.import()** (webpack 1)

- **import()** (es6 spec, webpack 2)
  * more on dynamic import() syntax: [https://developers.google.com/web/updates/2017/11/dynamic-import]
  * more on dynamic import() syntax in webpack: [https://webpack.js.org/api/module-methods/#import-]

## Our implementation

Our dynamic routes use the `require.ensure` syntax, as the es6 `import()` syntax and compilation using babel's babel-plugin-syntax-dynamic-import to enable the dynamic import syntax is not yet fully supported. Transpiled result returns error in router context when using `import()`. In future versions, we will migrate to using dynamic `import()` and the `webpackChunkName: "example"` helper to set the [name] for the file, and `webpackMode: "lazy"` to tell webpack to not include the module in the bundle.

So the takeaway is:

### Use for now:

- require.ensure

### Revisit:

- import()

### Legacy (deprecated in future webpack release):

- Symbol.import()
- require.ensure

### Note: 2019-06-10

import() syntax now works so it can also be used. Open to PR's to fix this