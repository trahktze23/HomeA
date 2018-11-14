
  var express = require('express');
  var server = express();
  var path   = require("path");

  server.use(express.static(__dirname + '/'));

// app.use(express.static(__dirname + '/css'));   ///********


  // tests
  //server.post('/getTemp', function(req, res){
     // do somethig here
  //});

  server.listen(8080);


// https://expressjs.com/en/4x/api.html#res
// https://codeforgeek.com/2015/01/render-html-file-expressjs
// https://hackernoon.com/nodejs-web-socket-example-tutorial-send-message-connect-express-set-up-easy-step-30347a2c5535


// process manager
//http://pm2.keymetrics.io/