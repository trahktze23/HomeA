
const express = require('express');
// var url = require('url');
const app = express();
const path = require('path');
const WebSocketServer = require('ws').Server;

// not for production
const cors = require('cors');

app.use(cors());

// ########
const fs = require('fs');
const http = require('http');
const https = require('https');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');

const options = {
  key: fs.readFileSync('client-key.pem'),
  cert: fs.readFileSync('client-cert.pem'),
};
// ########


// set morgan to log info about our requests for development use.
app.use(morgan('dev'));

// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: true }));

// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
  key: 'user_sid',
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000,
  },
}));
// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid');
  }
  next();
});
// middleware function to check for logged-in users
const sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect('/loggeduser');
  } else {
    console.log(' ##### need to login', req.session.user);
    next();
  }
};


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


app.get('/', sessionChecker, (req, res) => {
  // if(login){
  // res.sendFile(path.join(`${__dirname}/index.html`));
  // }  else {
  //   res.sendFile(path.join(__dirname+'/loginpage.html'));
  // }
  // console.log('###########33');
  // res.redirect('/login'); // if user is not logged go to login or do somethin else
  res.send('test');
});


// just a test
app.get('/login', (req, res) => {
  res.send('user is NOT logged ok');
  req.session.user = 'testUser';
  res.redirect('/loggeduser');
});


app.get('/loggeduser', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    // the actual page we want to serv
    // res.sendFile(__dirname + '/public/dashboard.html');
    res.send('user is logged ok');
  } else {
    // res.redirect('/login');
    res.redirect('/notAuthPage');
  }
});
// just a test
app.get('/notAuthPage', (req, res) => {
  res.send('user is NOT logged ok');
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

// route for handling 404 requests(unavailable routes)
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

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
