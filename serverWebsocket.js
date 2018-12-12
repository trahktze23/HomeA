
const express = require('express');
// var url = require('url');
const app = express();
const path = require('path');
const WebSocketServer = require('ws').Server;

const cors = require('cors');
// not for production
app.use(cors());

// ########
const fs = require('fs');
const http = require('http');
const https = require('https');

const options = {
  key: fs.readFileSync('client-key.pem'),
  cert: fs.readFileSync('client-cert.pem'),
};
// ########

// here import in a variable the class/ file sau cum o sa fie
// const clasa =

// const wss = new WebSocketServer({ port: 3010 });
// wss.on('connection', (ws) => {
//   ws.on('message', (message) => {
//     console.log('received: %s', message);
//   });
//   setInterval(
//     () => ws.send(`${new Date()}`),
//     4000,
//   );
// });


// app.use(express.static(`${__dirname}/`));

// app.use(express.static(__dirname + '/css'));   //


app.get('/', (req, res) => {
  // if(login){
  // res.sendFile(path.join(`${__dirname}/index.html`));
  // }  else {
  //   res.sendFile(path.join(__dirname+'/loginpage.html'));
  // }
  console.log('###########33');
  res.send('test');
});

app.post('/users/authenticate', (req, res) => {
  console.log('ita POST was here');
  // res.setHeader('Content-Type', 'application/json');
  // res.send(JSON.stringify(req));
  res.send({
    user: {
      token: 'testToken',
      name: 'testName',
    },
  });
});
// app.get('/test', (req, res) => {
//   console.log('ita was here');
//   // res.setHeader('Content-Type', 'application/json');
//   // res.send(JSON.stringify(req));
//   res.send({
//     params: req.params,
//     queryStrings: req.query,
//     ops: options,
//   });
// });


// tests
// app.post('/getTemp', function(req, res){
// do somethig here
// });

console.log('your server is running at http://localhost:8080/');
app.listen(8080);
// https.createServer(options, app).listen(8080);
// http.createServer(options, app).listen(8080);


// console.log('and https://localhost:8030/');


// https://expressjs.com/en/4x/api.html#res
// https://codeforgeek.com/2015/01/render-html-file-expressjs
// https://hackernoon.com/nodejs-web-socket-example-tutorial-send-message-connect-express-set-up-easy-step-30347a2c5535


// process manager
// http://pm2.keymetrics.io/
