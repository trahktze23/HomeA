
const baseUrl = 'http://localhost:8080'; // DEV ONLY
const restUrl = '';


const config = {

  rooms: [
    {
      name: 'bucatarie',
      id: 'bucatarie',
      temp: 15,
    },
    {
      name: 'living',
      id: 'living',
      temp: 25,
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
};

export default config;
