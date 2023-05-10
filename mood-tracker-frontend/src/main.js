import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueChartkick from 'vue-chartkick';
import 'chartkick/chart.js';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import Loading from 'vue3-loading-overlay';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import '@/main.css';

document.addEventListener('DOMContentLoaded', function () {
  M.AutoInit();
});

const app = createApp(App);
app.use(VueChartkick);
app.use(router);
app.component('AppLoading', Loading);
app.mount('#app');
