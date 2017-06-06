// Prod Server for webpack
// needs webpack optimize and uglify

var path = require('path');
var webpack = require('webpack');
var express = require('express');
var https = require('https');
var fs = require('fs');
var config = require('./webpack.config.babel');

var app = express();
var compiler = webpack(config);

var options = {
  key: fs.readFileSync('/nimwit/zeeram.key'),
  cert: fs.readFileSync('/nimwit/zeeram.cert')
};

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

var secureServer = https.createServer(options, app).listen("http://localhost:8000");
