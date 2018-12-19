
// const { Gpio } = require('onoff').Gpio; // eslint-disable-line
const { rooms } = require('./config.js');
const DbHandlerCls = require('./dbHandler.js');
const ReadTempCls = require('./readTemp.js');


module.exports = class {
  constructor() {
    this.tempReader = new ReadTempCls();
    this.dbHandler = new DbHandlerCls();
    // initialize the control pins
    // set all pins as output
    this.controlPins = {};
    // rooms.forEach((room) => {
    //   this.controlPins[room.senzorID] = new Gpio(room.pinControl, 'out'); // use GPIO pin as output
    // });
  }

  // getControlPinState(sensorID) {
  //
  // }

  compareTemps(sensorID) {
    return Promise.all([
      this.tempReader.getTemp(sensorID),
      this.dbHandler.getTemperatureSet(sensorID),
    ]).then(([tempSensor, tempDB]) => {
      console.log('tempSensor >>', tempSensor);
      console.log('tempDB >>', tempDB);
      // compaire and do something with the pins
    });
  }
};
