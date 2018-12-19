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
      temp: '',
      state: 1,
    },
    {
      name: 'Dormitor Roxi',
      id: '28-000009b819fb',
      temp: '',
      state: 0,
    },
    {
      name: 'Dormitor Diana',
      id: '28-000009b7936f',
      temp: '',
      state: 1,
    },
    {
      name: 'Dormitor C+D',
      id: '28-000009b889ae',
      temp: '',
      state: 0,
    },
    {
      name: 'Living',
      id: '28-000009b86a72',
      temp: '',
      state: 1,
    },
    {
      name: 'Bucatarie',
      id: '28-000009b872d1',
      temp: '',
      state: 0,
    },
    {
      name: 'Baie Etaj',
      id: '28-000009b7ec8e',
      temp: '',
      state: 1,
    },
    {
      name: 'Hol',
      id: '28-000009b7a809',
      temp: '',
      state: 0,
    },
    {
      name: 'Baie Parter',
      id: '28-000009b7f619',
      temp: '',
      tate: 0,
    },
    {
      name: 'C.T.',
      id: '28-000009b86066',
      temp: '',
      state: 1,
    },
  ],
  userStorage: localStorage,
  baseUrl,
  restUrl,
  wsUrl, // webSocket url
};

export default config;
