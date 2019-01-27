// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import config from './config';

Vue.config.productionTip = false;

const requestOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({}),
};
fetch(`${config.baseUrl}/getRooms`, requestOptions).then((response) => {
  response.text().then((rooms) => {
    console.log('ROOMS', rooms);
    config.rooms = (JSON.parse(rooms)).rooms;
    // ###############
    new Vue({ // eslint-disable-line
      el: '#app',
      router,
      components: { App },
      template: '<App/>',
    });
    // ###############
  });
});

/* eslint-disable no-new */
