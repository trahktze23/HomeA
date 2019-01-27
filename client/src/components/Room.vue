<template>
<div class="container">
  <div class="row">
    <div>
      <span class="redDot dot" v-bind:class="{ 'greenDot': state }" ></span>
    </div>
    <div>
      <span>{{name}}</span>
    </div>
    <div>
      <div>
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    </div>
  </div>
  <div class='data-row'>
    <div class="temp">
      <span> {{ currentTemp | round(1) }} </span> &#8451;
    </div>
    <div class="handle-counter">
      <button v-on:click="changeTemp('substract')"
        class="counter-minus btn btn-primary">
        -
      </button>
      <span class="db-temp">  {{tempSetDB}}  </span>
      <button v-on:click="changeTemp('add')"
      class="counter-minus btn btn-primary">
        +
      </button>
    </div>
  </div>

</div>
</template>

<script>

import config from '@/config';
import round from 'vue-round-filter';

const ws = config.ws;

export default {
  name: 'Room',
  props: ['currentTemp', 'name', 'id', 'state', 'tempSetDB'],
  data() {
    return {
    };
  },
  methods: {
    changeTemp(type) {
      this.tempSetDB = (type === 'add') ? this.tempSetDB += 0.5 : this.tempSetDB -= 0.5;
      console.log('change temp >> ', { senzorID: this.id, temp: this.tempSetDB, name: this.name });
      ws.send(JSON.stringify({ senzorID: this.id, temp: this.tempSetDB }));
    },
  },
  filters: {
    round,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.redDot{
  background: red;
}
.greenDot{
  background: #18f318;
}

.container {
  border: 3px solid #f1f1f1;
  border-radius: 4px;
  width: 30%;
  box-sizing: border-box;
  margin-bottom: 12px;
  min-width:240px;
}
.temp {
  font-weight: bold;
  padding: 2px;
  color: DodgerBlue;
  border: 1px solid DodgerBlue;
  border-radius: 4px;
  width: 75px;
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
  display: flex;
  justify-content: space-between;
}

.data-row{display: flex;
  justify-content: space-around;
  min-height: 52px;
  align-items: center;
}

/* Three dots */
.dot {
  height: 15px;
  width: 15px;
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
  border-radius: 4px;
}
.handle-counter{
  display: flex;
}
.db-temp {
  color: #555;
  border: 1px solid #ccc;
  padding: 4px;
  border-radius: 4px;
  width: 50px;
  border-width: 2px;
  margin: 0 1px;
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
    width: 100%;
    padding: 0;
  }
}

@media only screen and (max-width:500px) {
  /* For mobile phones: */
  /* .menu,
  .main,
  .right {
    width: 100%;
  } */
}
</style>
