<template>
<div class="home-page">
  <room v-for="room in rooms"
    v-bind:key="room.id"
    v-bind:name="room.name"
    v-bind:currentTemp="room.temp">
  </room>
</div>
</template>

<script>
import Room from '@/components/Room';
import config from '@/config';
// import ws from '@/services/websocket.service';
// import webSockerService

// setInterval(function(){
//   config.rooms[0].temp += 1;
// }, 5000);
// event emmited when connected
const ws = new WebSocket(config.wsUrl);
ws.onopen = () => {
  console.log('websocket is connected ...');
  // sending a send event to websocket server
  ws.send('connected');
};
// event emmited when receiving message
ws.onmessage = (ev) => {
  console.log('message', ev);
  config.rooms[0].temp = ev.data;
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
