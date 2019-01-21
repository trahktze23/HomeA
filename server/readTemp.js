const util = require('util');
const fs = require('fs');

const readFile = util.promisify(fs.readFile);
const readFolder = util.promisify(fs.readdir);
// const devicesPath = '/sys/bus/w1/devices/';
const devicesPath = 'mock/';

module.exports = class {
  constructor(ws) {
    this.ws = ws;
    // this.tempReaderMap = new Map();
  }

  readFile(path) { // eslint-disable-line class-methods-use-this
    return readFile(path);
  }

  readFolder(path) { // eslint-disable-line class-methods-use-this
    return readFolder(path);
  }

  // returns a promise that resolve with the temp or -1 when error
  getTemp(room) { // eslint-disable-line class-methods-use-this
    return readFile(`${devicesPath + room.senzorID}/w1_slave`, 'utf8')
      .then((data) => {
        // console.log('read temp data OK >>', data);
        const temp = data.replace(/\r?\n|\r/g, '').split('t=')[1];
        const formatTemp = temp / 1000;
        // return formatTemp;
        return {
          room,
          temp: formatTemp,
        };
      }).catch((error) => {
        console.log('read temp data Error >>', error);
        return -1;
      });
  }
};
