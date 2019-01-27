const util = require('util');
const fs = require('fs');
const moment = require('moment');

const { rooms } = require('./config.js');

const readFile = util.promisify(fs.readFile);
const readFolder = util.promisify(fs.readdir);
// const devicesPath = '/sys/bus/w1/devices/';
const devicesPath = 'mock/';

module.exports = class {
  constructor(ws) {
    this.ws = ws;
    this.cacheTempsMap = new Map();
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
        // return -1;
        return {
          room,
          temp: -1,
        };
      });
  } // end getTemp

  getCachedTemp({ room, reload = false, expire = 600000 } = {}){
    const name = room.senzorID;
    this.clearExpiredCacheMap();
    const cacheEl = this.cacheTempsMap.get(name);
    if (reload || !cacheEl || cacheEl.ignoreCache) {
      const now = moment().valueOf();
      const expirationDate = (expire !== false || Number(expire) < 0) ? now + expire : false;

      this.cacheTempsMap.set(
        name,
        {
          promise: this.getTemp(room).then((data)=>{
            try{
              if(data.temp === -1){
                Object.assign(this.cacheTempsMap.get(name), { ignoreCache: true });
              } else {
                Object.assign(this.cacheTempsMap.get(name), { ignoreCache: false });
              }
            } catch(err){
              Object.assign(this.cacheTempsMap.get(name), { ignoreCache: true });
            }
            return data;
          })
          .catch(() => {
            Object.assign(this.cacheTempsMap.get(name), { ignoreCache: true });
          }),
          addedDate: now,
          expirationDate,
          ignoreCache: false,
        }
      );
    }
    return this.cacheTempsMap.get(name);
  }
  purgeCacheMap() {
  this.cacheTempsMap.clear();
  }
  deleteCachedPromise(key) {
    this.cacheTempsMap.delete(key);
  }
  // remove all the expired promises from the cahcheMap
  clearExpiredCacheMap() {
    this.cacheTempsMap.forEach((value, key) => {
      const now = moment().valueOf();
      if (value.expirationDate && now > value.expirationDate) {
        this.deleteCachedPromise(key);
      }
    });
  }

  getAllRoomsTemp(){
    const rdpromarr = [];
    rooms.forEach((room) => {
      rdpromarr.push(this.getCachedTemp({room}).promise);
    });
    return Promise.all(rdpromarr).then((temps) => {
      const roomsData = JSON.parse(JSON.stringify(temps)).map((el)=>{
        return Object.assign(el.room, {temp: el.temp});
      });
      return roomsData;
    }).catch(()=>rooms);

  }




};
