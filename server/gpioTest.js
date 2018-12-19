
// const { Gpio } = require('onoff'); // eslint-disable-line
const PinsControlCls = require('./pinsControl.js');
const pinsController = new PinsControlCls();


// const LED = new Gpio(3, 'out'); // use GPIO pin 3 as output
// LED.writeSync(0); // Turn LED off
// LED.readSync()

pinsController.setControlPinSTate('28-000009b7fb69', 0);


console.log(' pin state >> ', pinsController.getControlPinState('28-000009b7fb69'));
