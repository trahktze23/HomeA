
const PinsControlCls = require('./pinsControl.js');
const pinsController = new PinsControlCls();
const { rooms, pwmConfig } = require('./config.js');



// Constructor function for Person objects
//####################################
function PwmControl() {

  this.timeoutMap = new Map();
  this.intervalMap = new Map();
  this.clearTimeout = (room)=>{
    const timeout = this.timeoutMap.get(room);
    // this.timeoutMap.delete(room);
    if(timeout){
      clearTimeout(timeout);
    }
  }
  this.clearInterval = (room)=>{
    const interval = this.intervalMap.get(room);
    // this.intervalMap.delete(room);
    if(interval){
      clearInterval(interval);
    }
  }
  this.clearTime = (room)=>{
    this.clearTimeout(room);
    this.clearInterval(room);
  }
  this.getPinState= (room)=>{
    return Number(pinsController.getControlPinState(room.senzorID));
  }
  this.setPinState= (room, value)=>{
    pinsController.setControlPinSTate(room.senzorID, Number(value));
  }
  // togglethe pin value
  this.tooglePinValue = (room)=>{
    console.log('toogle the pin')
    const pinState = this.getPinState(room);
    if(room.state){ // toggle only if it is working >> if the state of room is one
      this.setPinState(room, !pinState);
    }
  };

  rooms.forEach(room=>{
    // console.log(  room,' >>>cc', this.getPinState(room) );
    rId = room.senzorID;

    // creates methods for each rooms
    this[`open${rId}`] = ()=>{
      this.clearTime(room);
      this.setPinState(room, 1);
      room.state = 1; // set the room state as 1  => this is the state of the room(working, closed) not the pin value
      const timeout = setTimeout(()=>{
        console.log(' ready start >> ');
        this.tooglePinValue(room);
        const interval = setInterval(()=>{
          // toggle the pin value
          this.tooglePinValue(room);
        },pwmConfig.upTime);
        this.intervalMap.set(room, interval);

      },pwmConfig.startTime);
      this.timeoutMap.set(room, timeout);
    }

    // close the pin
    this[`close${rId}`] = ()=>{
      this.clearTime(room);
      this.setPinState(room, 0);
      room.state = 0;
    }

    // togglethe pin value
    this[`toogle${rId}`] = ()=>{
      this.clearTime(room);
      this.setPinState(room, 0);
    }


  });// end foreach room
}


const pwmObj = new PwmControl();
// console.log('PWMOBJ', pwmObj);
console.log('@@@@@@@@@@@@@@@@@@@@@@@')
console.log('@@@@@@@@@@@@@@@@@@@@@@@')
//####################################


const pwmObj2 = {
  foo: "bar",
  change(vars){
    console.log('>>>>>>',this.foo);
    this.foo = vars;
  }
};
// define the actual singleton instance
// ------------------------------------
const FOO_KEY = Symbol("foo");
global[FOO_KEY] = pwmObj;
// define the singleton API
// ------------------------
const singleton = {};
Object.defineProperty(singleton, "instance", {
  get: function(){
    return global[FOO_KEY];
  }
});
// ensure the API is never changed
Object.freeze(singleton);
// export the singleton API only
module.exports = singleton;
