<template>
  <div id="app">
    <header-menu/>
    <router-view/>
  </div>
</template>

<script>
import HeaderMenu from '@/components/Menu';


export default {// exporta un obiect vue
  name: 'App',
  components: {
    HeaderMenu,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
