
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
      try {
        const pin = new Gpio(room.pinControl, 'out'); // use GPIO pin as output
        pin.writeSync(0); // set default as 0
        this.controlPins[room.senzorID] = pin;
      } catch (err) {  // eslint-disable-line
      }
    });
  }

  getControlPinState(senzorID) {
    return this.controlPins[senzorID].readSync();
  }

  setControlPinSTate(senzorID, value) { // eslint-disable-line consistent-return
    try {
      return this.controlPins[senzorID].writeSync(value);
    } catch (err) {
      console.log('ERR set control pins >> ', err);
    }
  }

  compareTemps(room) {
    const { senzorID } = room;
    // const pinNumber = room.pinControl;
    return Promise.all([
      // this.tempReader.getTemp(room),
      this.tempReader.getCachedTemp({room}).promise,
      this.dbHandler.getTemperatureSet(senzorID),
    ]).then(([tempObj, tempDB]) => {
      const tempSensor = tempObj.temp;
      const tempCamera = Number(tempSensor);
      const tempDBSetata = Number(tempDB);
      const pinState = this.getControlPinState(senzorID);

      if (tempCamera >= tempDBSetata) {
        if (Number(pinState) && tempCamera > tempDBSetata + 0.2) {
          console.log('Pin pus in 0', room.name);
          this.setControlPinSTate(senzorID, 0);
        }
      }
      if (tempCamera < tempDBSetata) {
        if (Number(!pinState) && tempCamera < tempDBSetata - 0.2) {
          console.log('Pin pus in 1 > ', room.name);
          this.setControlPinSTate(senzorID, 1);
        }
      }
    });
  }
};
/*
  GPIO usage example
  const PIN = new Gpio(3, 'out'); // use GPIO pin 3 as output
  PIN.writeSync(0); // Turn PIN off
  PIN.readSync(); // read the output value
*/
