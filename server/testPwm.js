

const pwmControl = require('./pwmControl.js');
const PinsControlCls = require('./pinsControl.js');
const pinsController = new PinsControlCls();

const r = pwmControl.instance;

const getPinState= (roomID)=>{
  return Number(pinsController.getControlPinState(roomID));
}


 // r['open28-000009b7fb69']();

// console.log('>>> ', r.timeoutMap.values())


process.stdin.on('readable', () => {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    // process.stdout.write(`data:-${chunk.toString().trim()}-`);
    if(chunk.toString().trim() === 'o'){
      console.log('RRRRRRRRRRRR')
      r['open28-000009b7fb69']();
    }
    if(chunk.toString().trim() === 'c'){
      r['close28-000009b7fb69']();
    }
    if(chunk.toString().trim() === 'x'){
      console.log('pin state >>', getPinState('28-000009b7fb69') );
    }


  }
});
