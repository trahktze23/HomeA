<template>
<div class="home-page">
  <room v-for="room in rooms"
    v-bind:key="room.id"
    v-bind:id="room.id"
    v-bind:name="room.name"
    v-bind:state="room.state"
    v-bind:tempSetDB="room.tempSetDB"
    v-bind:currentTemp="room.temp">
  </room>
</div>
</template>

<script>
import Room from '@/components/Room';
import config from '@/config';
// import ws from '@/services/websocket.service';
// import webSockerService

// const ws = new WebSocket(config.wsUrl);
const ws = config.ws;

// event emmited when receiving message
ws.onmessage = (ev) => {
  const data = JSON.parse(ev.data);
  // console.log('data > ', data);
  const receivedID = data.sensorID;
  const receivedTemp = data.temp;
  const state = data.state;
  const receivedTempSet = Number(data.tempSetDB);
  const room = config.rooms.find(el => el.id === receivedID);
  if (room) {
    room.temp = receivedTemp;
    room.state = state;
    room.tempSetDB = receivedTempSet;
  }
};
ws.onerror = (event) => {
  console.error('WebSocket error observed:', event);
};
ws.onclose = (event) => {
  console.log('WebSocket is closed now.', event);
};

export default {
  name: 'Test',
  components: {
    Room,
  },
  data() {
    return {
      rooms: config.rooms,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
