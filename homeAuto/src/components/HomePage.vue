<template>
<div class="hello">
  <room v-for="room in rooms"
    v-bind:key="room.id"
    v-bind:currentTemp="room.temp">
  </room>
</div>
</template>

<script>
import Room from '@/components/Room';

const rooms = [
  {
    name: 'bucatarie',
    id: 'bucatarie',
    temp: 15,
  },
  {
    name: 'living',
    id: 'living',
    temp: 25,
  },
  // {
  //   name: 'dormitor',
  //   id: 'dormitor',
  //   temp: 23,
  // },
];

export default {
  name: 'Test',
  components: {
    Room,
  },
  data() {
    return {
      rooms,
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
