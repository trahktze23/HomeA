const http = require('http');
const express = require('express');
const WebSocket = require('ws');
const cors = require('cors');

const { rooms, prodMode } = require('./config.js');
const ReadTempCls = require('./readTemp.js');
// database
const DbHandlerCls = require('./dbHandler.js');
const dbHandler = new DbHandlerCls();
// pin control
const PinsControlCls = require('./pinsControl.js');
const pinsControl = new PinsControlCls();

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
      rooms.forEach((room) => {
        tempReader.getTemp(room.senzorID).then((temp) => {
          socket.send(JSON.stringify({ sensorID: room.senzorID, temp }));
        });
      });
    }, 2000,
  );
});
// listen for "error" event so that the whole app doesn't crash
wss.on('error', (err) => {
  console.log('web socket server error', err);
});

// for dev we can keep the server just for handling requests
// app.use(express.static(`${__dirname}/`));
// app.get('/', (req, res) => {
//   res.send('test');
// });

console.log('your server is running at http://localhost:8081/'); //eslint-disable-line
app.listen(8081);
