// http://192.168.100.100:8081/getRooms
const express = require('express');
const { rooms, prodMode } = require('./config.js');
const cors = require('cors');


const app = express();
const port = 8081;


app.get('/', (req, res) => res.send('Hello World!'));
app.use(cors());

app.get('/rooms', (req, res) => {
  res.redirect('/');
});
app.post('/getRooms', (req, res) => {
  res.send(JSON.stringify({ rooms }));
});

// app.post('/data/getRooms', (req, res) => {
//   res.send(JSON.stringify({ rooms }));
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
