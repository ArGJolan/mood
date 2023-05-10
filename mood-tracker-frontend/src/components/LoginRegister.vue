<template>
  <div class="row">
    <form class="col s12" @submit.prevent="handleSubmit">
      <div class="row">
        <div class="input-field col s12">
          <input id="username" type="text" v-model="username" required />
          <label for="username">Username</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="password" type="password" v-model="password" required />
          <label for="password">Password</label>
        </div>
      </div>
      <div class="row">
        <div class="col s12">
          <button class="btn waves-effect waves-light" type="submit" @click="login">
            Login
          </button>
          <button class="btn waves-effect waves-light" type="submit" @click="register">
            Register
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      isLoading: false,
      username: '',
      password: '',
      action: '',
    };
  },
  methods: {
    async handleSubmit() {
      try {
        this.isLoading = true
        const response = await axios.post(
          `http://localhost:3001/api/auth/${this.action}`,
          {
            username: this.username,
            password: this.password,
          }
        );
        this.isLoading = false
        console.log(response)
        localStorage.setItem('authToken', response.headers['authorization']);
        this.$router.push('/');
      } catch (error) {
        console.error(error);
        alert('Error during login/register');
      }
    },
    login() {
      this.action = 'login';
    },
    register() {
      this.action = 'register';
    },
  },
};
</script>
