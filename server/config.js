// const config = {};
// exports.config = {};
module.exports = {
  prodMode: false,
  // database config
  dbConfig: {
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'mydb',
  },


  rooms: [
    {
      name: 'Dormitor Parter',
      senzorID: '28-000009b7fb69',
      pinControl: 11,
    },
    {
      name: 'Dormitor Roxi',
      senzorID: '28-000009b819fb',
      pinControl: 6,
    },
    {
      name: 'Dormitor Diana',
      senzorID: '28-000009b7936f',
      pinControl: 13,
    },
    {
      name: 'Dormitor C+D',
      senzorID: '28-000009b889ae',
      pinControl: 20,
    },
    {
      name: 'Living',
      senzorID: '28-000009b86a72',
      pinControl: 16,
    },
    {
      name: 'Bucatarie',
      senzorID: '28-000009b872d1',
      pinControl: 12,
    },
    {
      name: 'Baie Etaj',
      senzorID: '28-000009b7ec8e',
      pinControl: 13,
    },
    {
      name: 'Hol',
      senzorID: '28-000009b7a809',
      pinControl: 21,
    },
    {
      name: 'Baie Parter',
      senzorID: '28-000009b7f619',
      pinControl: 5,
    },
    {
      name: 'C.T.',
      senzorID: '28-000009b86066',
      pinControl: 26,
    },
  ],


};
