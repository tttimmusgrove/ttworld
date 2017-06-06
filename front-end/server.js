// Dev Server for webpack used for local development and hot module replacement (react hot loader)

var path = require('path');
var webpack = require('webpack');
var express = require('express');
var config = require('./webpack.config.babel');
var http = require('http');

var app = express();
var compiler = webpack(config);

//Allows use of webpack dev server
app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}));

//Allows use of webpack hot module replacement
app.use(require('webpack-hot-middleware')(compiler));

//Uses index.html as root of application
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

//Creates local server on port 3000 which will be running the application
var server = http.createServer(app).listen(3000, function(err) {
  if (err) {
    return console.error(err);
  }
});
