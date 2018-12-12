const http = require('http');
const express = require('express');
const WebSocket = require('ws');
const cors = require('cors');

const { rooms, prodMode } = require('./config.js');
const ReadTempCls = require('./readTemp.js');

const app = express();
const server = http.createServer(app);
let wss;
// create the websocket server
if (prodMode) {
  // wss for production
  wss = new WebSocket.Server({ server });
} else {
  // !!!!!!!!!!!!! not for production
  app.use(cors());

  const WebSocketServer = WebSocket.Server;
  wss = new WebSocketServer({
    port: 8080,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
    },
  });
  // !!!!!!!!!!!!! not for production
}


wss.on('connection', (ws) => {
  const tempReader = new ReadTempCls(ws);
  // ws.on('message', (message) => {
  // });
  // console.log('connection OK');
  setInterval(
    () => {
      rooms.forEach((room) => {
        tempReader.sendTemp(room.senzorID); // send an object { sensorID, temp}
      // sau
      // send an integer
      // tempReader.getTemp(room.senzorID).then((temp)=>{
      //   ws.send(temp);
      // });
      });
    }, 3000,
  );
});

// for dev we can keep the server just for handling requests
// app.use(express.static(`${__dirname}/`));
// app.get('/', (req, res) => {
//   res.send('test');
// });

console.log('your server is running at http://localhost:8081/'); //eslint-disable-line
app.listen(8081);
