const http = require('http');
const fs = require('fs');
const express = require('express');
const WebSocket = require('ws');
const bodyParser = require('body-parser');

const cors = require('cors');

const { rooms, prodMode } = require('./config.js');
const ReadTempCls = require('./readTemp.js');
// database
const DbHandlerCls = require('./dbHandler.js');
const dbHandler = new DbHandlerCls();
// pin controller
const PinsControlCls = require('./pinsControl.js');
const pinsController = new PinsControlCls();

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@
const app = express();
const server = http.createServer(app);
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true,
}));
// create the websocket server
let wss;
if (prodMode) {
  // wss for production
  wss = new WebSocket.Server({ server });
} else {
  // !!!!!!!!!!!!! not for production
  app.use(cors());

  const WebSocketServer = WebSocket.Server;
  wss = new WebSocketServer({
    port: 8080,
    headers: { // not realy neccesarry ?
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
    },
  });
  // !!!!!!!!!!!!! not for production
}
const tempReader = new ReadTempCls();

wss.on('connection', (socket) => {
  console.log('new connection');
  // const tempReader = new ReadTempCls(socket);
  socket.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      dbHandler.setTemp(data.senzorID, data.temp);
    } catch (err) {
      console.error('webSocket message error', err);
    }
  });

  socket.on('error', (err) => {
    console.error('socket error', err);
  });
  socket.on('close', () => {
    console.log('Closed Connection ');
  });

  const readData = () => { // eslint-disable-line
    const rdpromarr = [];
    rooms.forEach((room) => {
      rdpromarr.push(tempReader.getTemp(room));
    });
    Promise.all(rdpromarr).then((temps) => {
      if (socket.readyState === WebSocket.OPEN) {
        // send data
        temps.forEach(async (tempObj) => {
          socket.send(JSON.stringify(
            {
              senzorID: tempObj.room.senzorID,
              temp: tempObj.temp,
              state: pinsController.getControlPinState(tempObj.room.senzorID),
              tempSetDB: await dbHandler.getTemperatureSet(tempObj.room.senzorID),
            },
          ));
        });
        setTimeout(() => readData(), 3000);
      }
    });
  };

  readData();
});
// listen for "error" event so that the whole app doesn't crash
wss.on('error', (err) => {
  console.log('web socket server error', err);
});

const compaire = () => { // eslint-disable-line
  const rdpromarr = [];
  rooms.forEach((room) => {
    rdpromarr.push(pinsController.compareTemps(room));
  });
  Promise.all(rdpromarr).then(() => {
    setTimeout(() => compaire(), 10000);
  });
};

compaire();

app.use(express.static(`${__dirname}/`));
app.get('/rooms', (req, res) => {
  res.redirect('/');
});
app.get('/login', (req, res) => {
  res.redirect('/');
});

app.post('/users/authenticate', (req, res) => {
  const { login, password } = req.body;
  dbHandler.getUser(login, password).then((user) => {
    if (user) {
      res.send(JSON.stringify({ user: { token: user.login } }));
    } else {
      res.status(400);
      res.send('Wrong credentials');
    }
  });
});
app.post('/getRooms', (req, res) => {
  res.send(JSON.stringify({ rooms }));
});

console.log('your server is running at http://localhost:8081/'); //eslint-disable-line
// app.listen(8080);
app.listen(8081);
