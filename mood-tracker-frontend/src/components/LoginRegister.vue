<template>
  <div>
    <!-- <loading v-model:active="isLoading" :can-cancel="false" :is-full-page="true"></loading> -->
    <h1>Login/Register</h1>
    <form @submit.prevent="handleSubmit">
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" required />
      <br />
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required />
      <br />
      <button type="submit" @click="login">Login</button>
      <button type="submit" @click="register">Register</button>
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
