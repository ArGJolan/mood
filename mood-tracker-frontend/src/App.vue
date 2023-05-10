<template>
  <div id="app">
    <nav class="purple darken-4">
      <div class="nav-wrapper">
        <a href="#" class="brand-logo">Mood Tracker</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><router-link to="/mood-entry">Mood Entry</router-link></li>
          <li><router-link to="/mood-chart">Mood Chart</router-link></li>
        </ul>
      </div>
    </nav>
    <main>
      <router-view class="container"></router-view>
    </main>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode';

export default {
  data() {
    return {
      username: '',
    };
  },
  created() {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.username = jwtDecode(token).username;
    }
  },
};
</script>

<style>
body {
  background-color: #1e1e1e;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #ffffff;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

h1 {
  font-size: 2.5rem;
  font-weight: 500;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

label,
input {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

input {
  padding: 5px 10px;
  background-color: #2d2d2d;
  border: 2px solid #3e3e3e;
  color: #ffffff;
}

button {
  font-size: 1.2rem;
  padding: 5px 10px;
  background-color: #3e3e3e;
  border: 2px solid #4f4f4f;
  color: #ffffff;
  cursor: pointer;
  margin-bottom: 10px;
}

button:hover {
  background-color: #4f4f4f;
}
.container {
  max-width: 80%;
  margin: 0 auto;
}

/* Navigation bar styles */
.navbar {
  background-color: #f1f1f1;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem;
  font-size: 1.25rem;
}

.navbar a {
  color: #333;
  text-decoration: none;
  transition: color 0.3s;
}

.navbar a:hover {
  color: #555;
}

/* Page content styles */
.page-content {
  margin-top: 1rem;
  opacity: 1;
  transition: opacity 0.5s;
}
</style>
