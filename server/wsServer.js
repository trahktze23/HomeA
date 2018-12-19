const http = require('http');
const express = require('express');
const WebSocket = require('ws');
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

wss.on('connection', (socket) => {
  console.log('new connection');
  const tempReader = new ReadTempCls(socket);
  socket.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      dbHandler.setTemp(data.sensorID, data.temp);
    } catch (err) {
      console.error('webSocket message error', err);
    }
  });

  socket.on('error', (err) => {
    console.error('socket error', err);
  });

  setInterval(
    () => {
      rooms.forEach((room, ndx) => Promise.all([
        tempReader.getTemp(room.senzorID),
        dbHandler.getTemperatureSet(room.senzorID),
      ]).then(([tempSensor, tempSetDB]) => {
        socket.send(JSON.stringify(
          {
            sensorID: room.senzorID,
            temp: tempSensor,
            state: pinsController.getControlPinState(room.senzorID),
            tempSetDB: Number(tempSetDB),
          },
        ));
        if (ndx === rooms.length - 1) console.log('send data');
      }));
    }, 3500,
  );
});
// listen for "error" event so that the whole app doesn't crash
wss.on('error', (err) => {
  console.log('web socket server error', err);
});


// test compaire remps
setInterval(
  () => {
    rooms.forEach((room) => {
      pinsController.compareTemps(room.senzorID);
    });
  }, 10000,
);

// for dev we can keep the server just for handling requests
// app.use(express.static(`${__dirname}/`));
// app.get('/', (req, res) => {
//   res.send('test');
// });

console.log('your server is running at http://localhost:8081/'); //eslint-disable-line
app.listen(8081);
