const port = 8081;
const http = require('http');
const express = require('express');
const WebSocket = require('ws');
const bodyParser = require('body-parser');
// read temp data
const ReadTempCls = require('./readTemp.js');
const tempReader = new ReadTempCls();
// database
const DbHandlerCls = require('./dbHandler.js');
const dbHandler = new DbHandlerCls();
// pin controller
const PinsControlCls = require('./pinsControl.js');
const pinsController = new PinsControlCls();

const { rooms } = require('./config.js');

const app = express();
const server = http.createServer(app);
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true,
}));
//initialize a simple http server

// //initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });
//
wss.on('connection', (socket) => {
  console.log('new connection');

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
      // rdpromarr.push(tempReader.getTemp(room));
      rdpromarr.push(tempReader.getCachedTemp({room}).promise);
    });
    Promise.all(rdpromarr).then((temps) => {
      if (socket.readyState === WebSocket.OPEN) {
        // send data
        temps.forEach(async (tempObj) => {
          socket.send(JSON.stringify(
            {
              senzorID: tempObj.room.senzorID,
              temp: tempObj.temp,
              // after PWM this should be the state of the room
              // state: pinsController.getControlPinState(tempObj.room.senzorID),
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
}); // end of on connection
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

// the http server
app.use(express.static(`${__dirname}/`));
app.get('/rooms', (req, res) => {
  res.redirect('/');
});
app.get('/login', (req, res) => {
  res.redirect('/');
});
app.post('/getRooms', (req, res) => {
  // const roomsData = await tempReader.getAllRoomsTemp();
   // tempReader.getAllRoomsTemp()
  // res.send(JSON.stringify({ roomsData }));
  res.send(JSON.stringify({ rooms }));
  // tempReader.getAllRoomsTemp().then((data)=>{
  //   console.log('DATA', data);
  //   res.send(JSON.stringify({ rooms:data }));
  // });
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

//start our server
server.listen(port, () => {
    console.log(`Server started on port ${server.address().port}`);
});
