<template>
<!-- <link rel="stylesheet" href="./font-awesome-4.7.0/
font-awesome-4.7.0/font-awesome.min.css" >   -->
<div class="topnav" v-bind:class="{ responsive: showMenu }">
  <a href="#home"><i class="fa fa-fw fa-home"></i> Home</a>
  <a href="#fisiere"><i class="fa fa-fw fa-folder"> </i> Fisiere</a>
  <a href="#link"><i class="fa fa-fw fa-cog"></i> Setari</a>
  <a href="#Grafice"><i class="fa fa-fw fa-bar-chart"></i> Grafice</a>
  <a href="harta.html"><i class="fa fa-fw fa-street-view"></i> Locatie</a>
  <a href="#logout" v-on:click="logOut()" ><i class="fa fa-fw fa-user"></i> LogOut</a>
  <a class="icon" v-on:click="showNav('add')" ><i class="fa fa-bars"></i></a>
  <!-- <link rel="stylesheet" type="text/css"
  href="/static/font-awesome-4.7.0/font-awesome-4.7.0/css/font-awesome.min.css"> -->
</div>
</template>

<script>
import loginService from '@/services/login.service';

require('../../node_modules/font-awesome/css/font-awesome.min.css');

export default {
  name: 'HeaderMenu',
  data() {
    return {
      showMenu: false,
    };
  },
  methods: {
    showNav() {
      this.showMenu = !this.showMenu;
    },
    logOut() {
      loginService.logout();
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.topnav {
  overflow: hidden;
  background-color: DodgerBlue;
}
.topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}
.topnav a:hover {
  background-color: #ddd;
  color: black;
}
.active {
  background-color: DodgerBlue;
  color: white;
}
.topnav .icon {
  display: none;
}
@media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
    float: right;
    display: block;
  }
}
@media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}
* {
    box-sizing: border-box;

}
</style>
