// const baseUrl = 'http://localhost:8080'; // DEV ONLY
const baseUrl = 'http://192.168.100.100:8081'; // DEV ONLY
const wsUrl = 'ws://192.168.100.100:8080';

const restUrl = '';
// const baseUrl = 'http://danielsorinungureanu.go.ro:8081';
// const wsUrl = 'ws://danielsorinungureanu.go.ro:8080';

const ws = new WebSocket(wsUrl); // create ws connection global
// event emmited when connected
ws.onopen = () => {
  console.log('websocket is connected ...');
  // sending a send event to websocket server
  // ws.send('connected');
};

const config = {
  ws,
  rooms: [],
  userStorage: localStorage,
  baseUrl,
  restUrl,
  wsUrl, // webSocket url
};

export default config;
