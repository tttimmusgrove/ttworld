//Configuration file for Webpack using Webpack 2.0

var webpack = require('webpack');
var path = require('path');
var nodeExternals = require('webpack-node-externals');
//var FaviconsWebpackPlugin = require('favicons-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //The base directory, an absolute path, for resolving entry points and loaders from configuration
  context: path.resolve(__dirname, 'app'),
  //The point or points to enter the application
  entry: [
    'react-hot-loader/patch', //React Hot Loader Entrance Point
    'webpack-hot-middleware/client', //Webpack Hot Module Replacement Entrance Point
    './app.jsx' //Root of React Application
  ],
  //Set of options instructing webpack on how and where it should output your bundles, assets and anything else you bundle or load with webpack
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  //Set of options is picked up by webpack-dev-server and can be used to change its behavior in various ways
  devServer: {
    contentBase: "./public",
    hot: true, //Allows use of hot module replacement with webpack dev server
    historyApiFallback: true //Uses index.html in place of any 404 responses
  },
  //Tells webpack which environment the application is targeting
  target: 'web',
  //These options determine how the different types of modules within a project will be treated.
  module: {
    //These can apply loaders to the module, or modify the parser.
    rules: [
      {
        test: /\.(jsx|js)$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              'react', 'latest' //Allows babel to transpile react and all new javascript syntax (ES5, ES6, ES7)
            ]
          },
        }],
        include: path.resolve(__dirname, 'app'),
        exclude: /node_modules/
      },
      {
        test: /\.(jpg|png)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 25000
          }
        }]
      },
      {
        test: /\.scss$/,
        use: [
          'sass-loader',
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-react-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  //This allows code originally written for the Node.js environment to run in other environments like the browser.
  node: {
    fs: 'empty'
  },
  //These options change how modules are resolved
  resolve: {
    //Tell webpack what directories should be searched when resolving modules
    modules: ["node_modules"],
    //The JSON files to use for descriptions
  	descriptionFiles: ["package.json", "bower.json"],
    //When importing from an npm package, this option will determine which fields in it's package.json are checked - cooresponds to what is chosen in target property
  	mainFields: ["main", "browser", "module"],
    //The filename to be used while resolving directories
  	mainFiles: ["index"],
  	aliasFields: ["browser"],
    //Automatically resolve certain extensions
  	extensions: [".js", ".json", ".jsx"],
    //Create aliases to import or require certain modules more easily
    alias: {
      'applicationStyles': './styles/app.scss',
      'actions': '../../actions/index.jsx',
      'configureStore': '../../store/configureStore.jsx'
    },
  },
  //This option controls if and how Source Maps are generated
  devtool: 'cheap-module-eval-source-map',
  //This is used to customize the webpack build process in a variety of ways
  plugins: [
    new webpack.HotModuleReplacementPlugin(), //Used to enable hot module replacement
    new webpack.NoEmitOnErrorsPlugin() //When there are errors while compiling this plugin skips the emitting phase (and recording phase), so there are no assets emitted that include errors
    // new HtmlWebpackPlugin(),
    //new FaviconsWebpackPlugin('../content/icons/images/logo.png')
  ]
};
