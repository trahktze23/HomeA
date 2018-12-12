<template>
<div class="container">
  <div class="row">
    <div class="column left"><span class="dot" style="background:red;"></span></div>
    <div class="column middle">
      <span>{{name}}</span>
    </div>
    <div class="column right">
      <div style="float:right;">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    </div>
  </div>

  <div class="temp">
    <span> {{ currentTemp | number:0 }} </span> &#8451;
  </div>

  <div class="handle-counter" id="handleCounter">
    <button v-on:click="changeTemp('substract')"
      class="counter-minus btn btn-primary">
      -
    </button>
    <input
      v-model= "tempSet"
      type="number"
      min="10"
      max="30"
      step="0.5">
    <button v-on:click="changeTemp('add')"
    class="counter-minus btn btn-primary">
      +
    </button>
  </div>
</div>
</template>

<script>
const round = require('vue-round-filter');

export default {
  name: 'Room',
  props: ['currentTemp', 'name'],
  data() {
    return {
      tempSet: 22, // initial temp setted
    };
  },
  methods: {
    changeTemp(type) {
      console.log('data is changed >>', this.tempSet);
      this.tempSet = (type === 'add') ? this.tempSet += 0.5 : this.tempSet -= 0.5;
    },
  },
  filters: {
    round,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* Hide HTML5 Up and Down arrows. */
input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
input[type="number"] {
    -moz-appearance: textfield;
}
.container {
  margin-top: 10px;
  margin-left: 10px;
  border: 3px solid #f1f1f1;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  float: left;
  width: 30%;
  overflow: visible;
}
.temp {
  margin-top: 17px;
  margin-left: 5px;
  margin-bottom: 10px;
  text-align: center;
  font-weight: bold;
  font-size-adjust: 0.78;
  padding: 2px;
  color: DodgerBlue;
  border: 1px solid DodgerBlue;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  float: left;
  width: 90px;
  overflow: visible;
}
/* Container for columns and the top "toolbar" */
.row {
  padding: 10px;
  background: #f1f1f1;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  color: white;
  text-shadow: 1px 1px 2px black, 0 0 25px DodgerBlue, 0 0 5px darkblue;
  font-size: 20px;
  font-weight: bold;
}
/* Create three unequal columns that floats next to each other */
.column {
  float: left;
}
.left {
  width: 15%;
}
.right {
  width: 10%;
}
.middle {
  width: 75%;
}
/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* Three dots */
.dot {
  margin-top: 4px;
  height: 12px;
  width: 12px;
  background-color: blue;
  border-radius: 50%;
  display: inline-block;
}

/* Three bars (hamburger menu) */
.bar {
  width: 17px;
  height: 3px;
  background-color: #aaa;
  margin: 3px 0;
  display: block;
}
button {
  cursor: pointer;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
input {
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  text-align: center;
}
.handle-counter {
  margin-top: 15px;
  margin-bottom: 10px;
  display: block;
  text-align: center;
  overflow: hidden;
}
.handle-counter .counter-minus,
.handle-counter .counter-plus {
  text-align: center;
}
.handle-counter input {
  width: 50px;
  border-width: 2px;
}
.btn {
  padding: 6px 12px;
  border: 1px solid transparent;
  color: #fff;
}
.btn:disabled,
.btn:disabled:hover {
  background-color: darkgrey;
  cursor: not-allowed;
}
.btn-primary {
  background-color: #009dda;
}
.btn-primary:hover,
.btn-primary:focus {
  background-color: #0486b9;
}

@media only screen and (max-width:800px) {
  /* For tablets: */
  .container {
    width: 80%;
    padding: 0;
  }
}

@media only screen and (max-width:500px) {
  /* For mobile phones: */
  .menu,
  .main,
  .right {
    width: 100%;
  }
}
</style>
