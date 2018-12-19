
const { Gpio } = require('onoff'); // eslint-disable-line
const { rooms } = require('./config.js');
const DbHandlerCls = require('./dbHandler.js');
const ReadTempCls = require('./readTemp.js');


module.exports = class {
  constructor() {
    this.rooms = rooms;
    // this.Gpio = Gpio;
    this.tempReader = new ReadTempCls();
    this.dbHandler = new DbHandlerCls();
    // initialize the control pins
    // set all pins as output
    this.controlPins = {};
    rooms.forEach((room) => {
      this.controlPins[room.senzorID] = new Gpio(room.pinControl, 'out'); // use GPIO pin as output
    });
  }

  getControlPinState(sensorID) {
    return this.controlPins[sensorID].readSync();
  }

  setControlPinSTate(sensorID, value) {
    return this.controlPins[sensorID].writeSync(value);
  }

  compareTemps(sensorID) {
    return Promise.all([
      this.tempReader.getTemp(sensorID),
      this.dbHandler.getTemperatureSet(sensorID),
    ]).then(([tempSensor, tempDB]) => {
      console.log('##### compaire temps');
      console.log('sensor id >> ', sensorID);
      console.log('tempSensor >>', tempSensor);
      console.log('tempDB >>', tempDB);
      console.log(' ');
      const tempSensorValue = Number(tempSensor);
      const tempDBValue = Number(tempDB);
      // compaire and do something with the pins
    });
  }
};


/*
  GPIO usage example
  const PIN = new Gpio(3, 'out'); // use GPIO pin 3 as output
  PIN.writeSync(0); // Turn PIN off
  PIN.readSync(); // read the output value
*/
