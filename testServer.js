
const express = require('express');

const server = express();
const path = require('path');
const WebSocketServer = require('ws').Server;

const wss = new WebSocketServer({ port: 3010 });
wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('received: %s', message);
  });
  setInterval(
    () => ws.send(`${new Date()}`),
    4000,
  );
});


server.use(express.static(`${__dirname}/`));

// app.use(express.static(__dirname + '/css'));   //


server.get('/', (req, res) => {
  // if(login){
  res.sendFile(path.join(`${__dirname}/index.html`));
  // }  else {
  //   res.sendFile(path.join(__dirname+'/loginpage.html'));
  // }
});

// tests
// server.post('/getTemp', function(req, res){
// do somethig here
// });

server.listen(8080);


// https://expressjs.com/en/4x/api.html#res
// https://codeforgeek.com/2015/01/render-html-file-expressjs
// https://hackernoon.com/nodejs-web-socket-example-tutorial-send-message-connect-express-set-up-easy-step-30347a2c5535


// process manager
// http://pm2.keymetrics.io/
