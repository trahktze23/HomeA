<template>
<div>
  <!-- <div class="alert alert-info">
    Username: test<br /> Password: test
  </div> -->
  <h2>Login</h2>
  <form @submit.prevent="submitLogin">
    <div class="form-group">
      <label for="username">Username</label>
      <input type="text" v-model="username"
      name="username" class="form-control"
      :class="{ 'is-invalid': submitted && !username }" />
      <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
    </div>
    <div class="form-group">
      <label htmlFor="password">Password</label>
      <input type="password" v-model="password"
      name="password" class="form-control"
      :class="{ 'is-invalid': submitted && !password }" />
      <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
    </div>
    <div class="form-group">
      <button class="btn btn-primary" :disabled="loggingIn">Login</button>
    </div>
  </form>
</div>
</template>

<script>
// import services from '@/services'; // get all the services
//
// const { loginService } = services;
import loginService from '@/services/login.service';
// import router from '@/router';
// import Router from 'vue-router';


// console.log('>>>>>>>>>>>>', loginService);

export default {
  data() {
    return {
      username: '',
      password: '',
      submitted: false,
    };
  },
  computed: {
    loggingIn() {
      return false;
      // return this.$store.state.authentication.status.loggingIn;
    },
  },

  // beforeCreate() {
  //   console.log('beforeCreated event', loginService.isLoggedIn());
  //   if (loginService.isLoggedIn()) {
  //     console.log('##### >> ', router);
  //   }
  // },
  //
  // // created() {
  // beforeMount() {
  //   console.log('created event');
  //   // reset login status
  //   // this.$store.dispatch('authentication/logout');
  // },

  methods: {
    submitLogin() {
    // submitLogin(e) {
      // console.log('handel submission', e);
      this.submitted = true;
      const { username, password } = this;
      // const { dispatch } = this.$store;
      if (username && password) {
        loginService.login(username, password).then((user) => {
          console.log('login succesfull >> ', user);
          location.href = '/rooms';
          // location.reload();
        });
        // dispatch('authentication/login', { username, password });
        // console.log('login now');
      }
    },
  },
};
</script>
