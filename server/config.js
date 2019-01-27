// const config = {};
// exports.config = {};
module.exports = {
  // prodMode: true,
  prodMode: false,
  // database config
  dbConfig: {
    host: 'localhost',
    user: 'root',
    password: 'password',
    // user: 'user',
    // password: '1234',
    database: 'mydb',
  },

  pwmConfig:{
    startTime: 10*1000,
    downTime: 5*1000,
    upTime: 5*1000,
  },
  // pwmConfig:{
  //   startTime: 5*60*1000,
  //   downTime: 1*60*1000,
  //   upTime: 1*60*1000,
  // },

  rooms: [
    {
      name: 'Dormitor Parter',
      senzorID: '28-000009b7fb69',
      pinControl: 11,
      temp: '',
      state: 0,
    },
    {
      name: 'Dormitor Roxi',
      senzorID: '28-000009b819fb',
      pinControl: 6,
      temp: '',
      state: 0,
    },
    {
      name: 'Dormitor Diana',
      senzorID: '28-000009b7ec8e',
      pinControl: 13,
      temp: '',
      state: 0,
    },
    {
      name: 'Dormitor C+D',
      senzorID: '28-000009b889ae',
      pinControl: 20,
      temp: '',
      state: 0,
    },
    {
      name: 'Living',
      senzorID: '28-000009b86a72',
      pinControl: 16,
      temp: '',
      state: 0,
    },
    {
      name: 'Bucatarie',
      senzorID: '28-000009b872d1',
      pinControl: 12,
      temp: '',
      state: 0,
    },
    {
      name: 'Baie Etaj',
      senzorID: '28-000009b7a809',
      pinControl: 19,
      temp: '',
      state: 0,
    },
    {
      name: 'Hol',
      senzorID: '28-000009b7936f',
      pinControl: 21,
      temp: '',
      state: 0,
    },
    {
      name: 'Baie Parter',
      senzorID: '28-000009b7f619',
      pinControl: 5,
      temp: '',
      state: 0,
    },
    {
      name: 'C.T.',
      senzorID: '28-000009b86066',
      pinControl: 26,
      temp: '',
      state: 0,
    },
  ],


};
