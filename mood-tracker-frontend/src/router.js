import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import LoginRegister from './components/LoginRegister.vue';
import MoodEntry from './components/MoodEntry.vue';
import MoodChart from './components/MoodChart.vue';

const routes = [
  {
    path: '/',
    name: 'App',
    component: App,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'LoginRegister',
    component: LoginRegister,
  },
  {
    path: '/mood-entry',
    name: 'MoodEntry',
    component: MoodEntry,
  },
  {
    path: '/mood-chart',
    name: 'MoodChart',
    component: MoodChart,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const token = localStorage.getItem('authToken');
    if (!token) {
      next({ name: 'LoginRegister' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
