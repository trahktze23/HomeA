
const baseUrl = 'http://localhost:8080'; // DEV ONLY
const restUrl = '';
const wsUrl = 'ws://danielsorinungureanu.go.ro:8080';


const config = {

  rooms: [
    {
      name: 'bucatarie',
      id: '28-000009b7936f',
      temp: 'X',
    },
    {
      name: 'living',
      id: 'living',
      temp: 'X',
    },
    // {
    //   name: 'dormitor',
    //   id: 'dormitor',
    //   temp: 23,
    // },
  ],
  userStorage: localStorage,
  baseUrl,
  restUrl,
  wsUrl, // webSocket url
};

export default config;
