const baseUrl = 'http://localhost:8080'; // DEV ONLY
const restUrl = '';
const wsUrl = 'ws://danielsorinungureanu.go.ro:8080';

const ws = new WebSocket(wsUrl); // create ws connection global
// event emmited when connected
ws.onopen = () => {
  console.log('websocket is connected ...');
  // sending a send event to websocket server
  // ws.send('connected');
};

const config = {
  ws,

  rooms: [
    {
      name: 'Dormitor Parter',
      id: '28-000009b7fb69',
      temp: 'X',
      pinOut: 11,
    },
    {
      name: 'Dormitor Roxi',
      id: '28-000009b819fb',
      temp: 'X',
      pinOut: 6,
    },
    {
      name: 'Dormitor Diana',
      id: '28-000009b7936f',
      temp: 'X',
      pinOut: 13,
    },
    {
      name: 'Dormitor C+D',
      id: '28-000009b889ae',
      temp: 'X',
      pinOut: 20,
    },
    {
      name: 'Living',
      id: '28-000009b86a72',
      temp: 'X',
      pinOut: 16,
    },
    {
      name: 'Bucatarie',
      id: '28-000009b872d1',
      temp: 'X',
      pinOut: 12,
    },
    {
      name: 'Baie Etaj',
      id: '28-000009b7ec8e',
      temp: 'X',
      pinOut: 13,
    },
    {
      name: 'Hol',
      id: '28-000009b7a809',
      temp: 'X',
      pinOut: 21,
    },
    {
      name: 'Baie Parter',
      id: '28-000009b7f619',
      temp: 'X',
      pinOut: 5,
    },
    {
      name: 'C.T.',
      id: '28-000009b86066',
      temp: 'X',
      pinOut: 26,
    },
  ],
  userStorage: localStorage,
  baseUrl,
  restUrl,
  wsUrl, // webSocket url
};

export default config;
