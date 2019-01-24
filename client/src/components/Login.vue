<template>

<div class="login-component">
  <div class="login-container">

    <h1>Log-in</h1><br>
    <form @submit.prevent="submitLogin">
      <div class="form-group">
        <input type="text" v-model="username"
        placeholder="Username"
        name="username" class="form-control"
        :class="{ 'is-invalid': submitted && !username }" />
        <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
      </div>
      <div class="form-group">
        <input type="password" v-model="password"
        placeholder="Password"
        name="password" class="form-control"
        :class="{ 'is-invalid': submitted && !password }" />
        <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
      </div>
      <div class="form-group">
        <input type="submit" :disabled="loggingIn" class="login login-submit" value="login">
      </div>
    </form>
  </div>
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

<style scoped>
.login-component{
  display: flex;
  justify-content: center;
}

.login-container{
  background: #F7F7F7;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  padding: 40px;
  width: 260px;
  margin: 20px;
}

.login-container h1{
  font-weight: 100;
  font-size: 2.3em;
}

.login-container input{
  height: 44px;
  font-size: 16px;
  width: 100%;
  margin-bottom: 10px;
  background: #fff;
  border: 1px solid #d9d9d9;
  padding: 0 8px;
  box-sizing: border-box;
}
.login-container input:hover{
  border: 1px solid #b9b9b9;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
}

.login-container input.login-submit{
  border: 0px;
  color: #fff;
  background-color: #4d90fe;
  font-size: 14px;
  font-family: 'Arial', sans-serif;
  font-weight: 700;
  height: 36px;
}
.login-container input.login-submit:hover{
  border: 0px;
  text-shadow: 0 1px rgba(0,0,0,0.3);
  background-color: #357ae8;
}

</style>
