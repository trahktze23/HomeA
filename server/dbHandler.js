// const util = require('util');
const mysql = require('mysql');
const { dbConfig } = require('./config.js');


module.exports = class {
  constructor() {
    this.mysql = mysql;
    this.dbConfig = dbConfig;
    this.connection = mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.database,
      socketPath: '/var/run/mysqld/mysqld.sock',
    });
    this.connection.connect((err) => {
      if (err) {
        throw err;
      }
      // console.log('connected to data base');
    });
  }

  query(sql) {
    return new Promise(((resolve, reject) => { // eslint-disable-line no-undef
      this.connection.query(sql, (err, data) => (err ? reject(err) : resolve(data)));
    }));
  }

  setTemp(senzorID, tempForSet) {
    const sql = `UPDATE Camere SET TemperaturaSetata = '${tempForSet}'  WHERE SenzorID = '${senzorID}' `;
    return this.query(sql).then(() => {
      console.log(' Functia sa executat cu succes, a scris in baza de date');
    }).catch((err) => {
      console.error('set temp errror >> ', err);
    });
  }

  getTemperatureSet(senzorID) {
    const sql = `SELECT TemperaturaSetata FROM Camere WHERE SenzorID = '${senzorID}' `;
    return this.query(sql).then(results => results[0].TemperaturaSetata).catch((err) => {
      console.error('get temp errror >> ', err);
      throw err;
    });
  }

  getUser(login, password) {
    const sql = `SELECT * FROM Users WHERE login='${login}' AND password='${password}'`;
    return this.query(sql).then(results => results[0]).catch((err) => {
      console.error('get user errror >> ', err);
      throw err;
    });
  }
};

// TODO return this as a singleton object
