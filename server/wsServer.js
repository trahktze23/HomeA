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
      dbHandler.setTemp(data.sensorID, data.temp);
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

  // const readData = () => { // eslint-disable-line
  //   let inc = 0;
  //   const date = new Date();
  //   rooms.forEach((room) => {
  //     fs.readFile(`/sys/bus/w1/devices/${room.senzorID}/w1_slave`, 'utf8', async (err, data) => {
  //       try {
  //         inc++;
  //         const temp = data.replace(/\r?\n|\r/g, '').split('t=')[1];
  //         if (temp > 0) {
  //           if (socket.readyState === WebSocket.OPEN) {
  //             socket.send(JSON.stringify(
  //               {
  //                 sensorID: room.senzorID,
  //                 temp: temp / 1000,
  //                 state: pinsController.getControlPinState(room.senzorID),
  //                 tempSetDB: await dbHandler.getTemperatureSet(room.senzorID),
  //               },
  //             ));
  //           }
  //         }
  //       } catch (e) {
  //         console.log(`sensor error${room.senzorID} >> ${e}`);
  //       }
  //       if (inc === rooms.length) {
  //         const date2 = new Date();
  //         console.log('Trimite date', date2.getTime() - date.getTime());
  //         if (socket.readyState === WebSocket.OPEN) {
  //           setTimeout(() => {
  //             // console.log('\033c'); // clear the console
  //             console.log('DATE start > ', date);
  //             readData();
  //           }, 3000);
  //         }
  //       }
  //     });
  //   });
  // }; // end of read data

  const readData = () => { // eslint-disable-line
    const rdpromarr = [];
    // const date1 = new Date();
    // console.log('START citire la', date1);
    rooms.forEach((room) => {
      rdpromarr.push(tempReader.getTemp(room));
    });
    Promise.all(rdpromarr).then((temps) => {
      // const date2 = new Date();
      // console.log('END s-a terminat citirea la', date2);
      // console.log('durata', date2.getTime() - date1.getTime());
      // console.log('VALUES', temps);
      // console.log('');
      if (socket.readyState === WebSocket.OPEN) {
        // send data
        temps.forEach(async (tempObj) => {
          // console.log('#### >', tempObj);
          socket.send(JSON.stringify(
            {
              sensorID: tempObj.room.senzorID,
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


// // test compaire remps
// setInterval(
//   () => {
//     rooms.forEach((room) => {
//       pinsController.compareTemps(room.senzorID);
//     });
//   }, 10000,
// );
const compaire = () => { // eslint-disable-line
  const rdpromarr = [];
  // const date1 = new Date();
  // console.log('@@@@@@@@@@@@@@@@@@@@@@');
  // console.log('######################');
  // console.log('START COMPAIRE la', date1);
  rooms.forEach((room) => {
    rdpromarr.push(pinsController.compareTemps(room));
  });
  Promise.all(rdpromarr).then(() => {
    // const date2 = new Date();
    // console.log('END s-a terminat COMPAIRE la', date2);
    // console.log('durata', date2.getTime() - date1.getTime());
    // console.log('@@@@@@@@@@@@@@@@@@@@@@');
    // console.log('######################');
    // console.log('');
    // console.log('');
    setTimeout(() => compaire(), 10000);
  });
};

compaire();

// for dev we can keep the server just for handling requests
app.use(express.static(`${__dirname}/`));
app.get('/rooms', (req, res) => {
  res.redirect('/');
});

app.post('/users/authenticate', (req, res) => {
  const { login, password } = req.body;
  dbHandler.getUser(login, password).then((user) => {
    if (user) {
      res.send(JSON.stringify({ user: { token: 'test' } }));
    }
  });
});

console.log('your server is running at http://localhost:8081/'); //eslint-disable-line
// app.listen(8080);
app.listen(8081);
