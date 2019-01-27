
const baseUrl = '';
// const wsUrl = 'ws://localhost:8080'; // location.host
const wsUrl = 'ws://192.168.100.100:8081';

const restUrl = '';
// const wsUrl = 'ws://danielsorinungureanu.go.ro:8080';

const ws = new WebSocket(wsUrl); // create ws connection global
// event emmited when connected
ws.onopen = () => {
  console.log('websocket is connected ...');
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
