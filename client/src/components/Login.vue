<template>
<div>

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
import loginService from '@/services/login.service';
import router from '@/router';

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
    },
  },

  methods: {
    submitLogin() {
      this.submitted = true;
      const { username, password } = this;
      if (username && password) {
        loginService.login(username, password).then((user) => {
          console.log('login succesfull >> ', user);
          router.push('/rooms');
        });
      }
    },
  },
};
</script>
