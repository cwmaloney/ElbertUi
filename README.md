# DRCF UI

The is the DRCF 2018 UI.

## Setup

We use Firebase to host farmsteadlights.com.

### Install Firebase CLI

To install or update the Firebase CLI:

``` bash
npm install -g firebase-tools
firebase login
```

### Deploy to Firebase

``` bash
firebase deploy
```

## Build Setup

To install all dependencies from npm

``` bash
npm install
```

To run wepback development server with hot reload at localhost:8080

``` bash
npm run start
```

To create a build for production using webpack (the build is stored the dist folder):

``` bash
npm run build
```

To remove previously created production files (removes dist folder):

``` bash
npm run clean

```

Deploy the build in the dist folder to Firebase:

``` bash
npm run deployToFirebase
```

See scripts in package.json for a full list of build and maintenance scripts.

## Runtime Dependencies

See "dependencies" in package.json for a complete list

1. Bootstrap
1. JQuery - required by Bootstrap
1. Popper - required by Bootstrap
1. Vue
1. VueRouter
1. Vuex

## Build Dependencies and Tools

### AutoPrefixer

Modifies CSS files and adds vender prefixes
(Used by webpack)

### Babel

Babel "transpiles" new JavaScript (ES2015/ES6 and newer) syntax to old JavaScript (ES5) and provides polyfill for new JavaScript

Notes

1. babel-core is the "core"
1. plug-ins define transforms Babel can do to the code.
1. presets are "predefined" collections of plug-ins.
1. We use preset-env (defines 2015, 2016, 2017 ES) plus plug-ins object-rest-spread and runtime to define what we want Babel to do.
1. babel-eslint creates output that ESLint can use as input because ESLint does not understand all JavaScript extentions.
1. babel-loader uses Babel to load files for webpack

### webpack

### webpack Loaders

Loaders "pre-process" files into formats that webpack and process.
These loaders are used by this project:

1. vue-loader - loads VueJs files
1. vue-template-compiler - used by vue-loader
1. babel-loader - loads JavaScript files
1. file-loader - loads any file into output folder - returns URL
1. url-loader - like file-loader but returns data URL for small files
1. eslint-loader - lints JS and script parts of vue files
1. style-loader - injects CSS into the DOM
1. css-loader - works with style-loader
1. sass-loader - converts SCSS and SASS to CSS

### webpack Plug-ins

These plug-ins are used by this project:

1. CleanWebpackPlugin - deletes previous builds
1. CopyWebpackPlugin - copies static assets to distribution
1. FriendlyErrorsPlugin - displays build errors
1. HtmlWebpackPlugin - generate index.html with content hash for caching
1. HotModuleReplacement
1. MiniCssExtractPlugin - extract CSS into files
1. OptimizeCssAssetsPlugin - compress/dedup CSS
1. UglifyJs - minifiy JavaScript
1. VueLoaderPlugin - for Vue files

## npm packages used by build/dev

1. webpack
1. babel
1. eslint
1. webpack-merge - mergers objects and arrays - used by build/dev scripts
1. chalk - terminal string styling/color
1. path - cross-platform path manipulation
1. shell - "cross-platform shell" for build

### webpack Development Server

1. webpack-dev-server the .js and .vue files "on the fly"

## Visual Studio Code Setup

Install this extensions:

1. Debugger for Chrome
1. eslint
1. npm
1. Vetur

Useful optional extensions:

1. Beautify
1. Git History
1. markdownlint
1. vscode-icons

The project contains a tasks.json file that references the NPM tasks from the webpack config file.  See the Tasks menu.
The project contains a launch.json file that defines the debugging configuraiton.

## Debugging

## #Debugging in Chrome

Add source folders so that Chrome can use source maps to map bundle to original source files.

### Debugging with Visual Studio Code

1. Verify the webpack config produces source maps
1. Tasks / Run Task... / npm start
1. Debug / Start Debugging

## FireBase notes

1. Install firebase-tools (see `firebase.google.com/docs/cli/`):

    ``` bash
    npm i -g firebase-tools
    ```

1. Login to FireBase:

   ``` bash
   firebase login
   ```

1. Test connection:

   ``` bash
   firebase list
   ```

1. Initialize the connect to the Firebase project:

   ``` bash
   firebase init
   ```

1. Deploy app to firebase:

   ``` bash
   firebase deploy
   ```

## npm Notes

1. List globally install packages

  ``` bash
  npm list -g --depth 0
  ````

1. List localy installed packages

  ``` bash
  npm list --depth 0
  ````

1. Update packages to latest version available

Install npm-check-updates

  ``` bash
  npm install -g npm-check-updates
  ````

Check local pagages

  ``` bash
  ncu
  ````

Check global packages

  ``` bash
  ncu -g
  ````

1. Node version manager

  ``` bash
  npm i n
  ````

  ``` bash
  n
  ````
