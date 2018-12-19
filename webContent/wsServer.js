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
    // headers: {
    //   'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Headers': '*',
    //   'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
    // },
  });
  // !!!!!!!!!!!!! not for production
}

wss.on('connection', (socket) => {
  console.log(' ############ new connection');
  const tempReader = new ReadTempCls(socket);
  socket.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      // tempReader.getTemp(data.sensorID).then((data) => {
      console.log(' Am primit un mesaj');
      console.log('senzor id>> ', data.sensorID);
      console.log('temp setata in FE >> ', data.temp);
      ScrieTempSet(data.sensorID, data.temp);
      // console.log('Temperatura senzor: ', tempReader.getTemp(data.sensorID.senzorID));
      // console.log('temp senzor >> ', data.formatTemp);
      // console.log('temp senzor >> ', tempSenzor);
      console.log('     ');// doar pt un spatiu gol
      // });
    } catch (err) {
      console.log('webSocket message error', err);
    }

    function ScrieTempSet(ID, temp) {
      const x = ID;
      const y = temp;
      const mysql = require('mysql');

      const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'mydb',
      });

      con.connect((err) => {
        if (err) throw err;
        const sql = `${'UPDATE Camere SET TemperaturaSetata = ' + "'"}${y}'` + ' WHERE SenzorID = ' + `'${x}'`;
        con.query(sql, (err, result) => {
          if (err) throw err;
          console.log(' Functia sa executat cu succes, a scris in baza de date');
        });
      });
    }


    // Error: connect ETIMEDOUT is from the Node.js networking code.
    // It means that a TCP connection could not be established to your MySQL server.
    // Usually this is a networking or firewall issue.


    // console.log(JSON.parse(message));
  });

  socket.on('error', (e) => {
    console.log('socket e', e);
  });


  setInterval(
    () => {
      rooms.forEach((room) => {
        // tempReader.sendTemp(room.senzorID); // send an object { sensorID, temp}
      // sau
      // send an integer
        tempReader.getTemp(room.senzorID).then((temp) => {
          socket.send(JSON.stringify({ sensorID: room.senzorID, temp }));
        });
      });
    }, 1000,
  );
});
// listen for "error" event so that the whole app doesn't crash
wss.on('error', (error) => {
  console.log(error);
});


// for dev we can keep the server just for handling requests
// app.use(express.static(`${__dirname}/`));
// app.get('/', (req, res) => {
//   res.send('test');
// });

console.log('your server is running at http://localhost:8081/'); //eslint-disable-line
app.listen(8081);
