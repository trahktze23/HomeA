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
    });
    this.connection.connect((err) => {
      if (err) {
        throw err;
      }
      // console.log('connected to data base');
    });
    // TODO take a look on util promisfy
    // this.query = util.promisify(this.connection.query);
  }

  query(sql) {
    // return this.query(sql);
    return new Promise(((resolve, reject) => { // eslint-disable-line no-undef
      this.connection.query(sql, (err, data) => (err ? reject(err) : resolve(data)));
    }));
  }

  setTemp(sensorID, tempForSet) {
    const sql = `UPDATE Camere SET TemperaturaSetata = '${tempForSet}'  WHERE SenzorID = '${sensorID}' `;
    return this.query(sql).then(() => {
      console.log(' Functia sa executat cu succes, a scris in baza de date');
    }).catch((err) => {
      console.error('set temp errror >> ', err);
    });
  }

  getTemperatureSet(sensorID) {
    const sql = `SELECT TemperaturaSetata FROM Camere WHERE SenzorID = '${sensorID}' `;
    return this.query(sql).then(results => results[0].TemperaturaSetata).catch((err) => {
      console.error('get temp errror >> ', err);
      throw err;
    });
  }
};

// TODO return this as a singleton object
