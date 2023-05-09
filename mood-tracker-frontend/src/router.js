import { createRouter, createWebHistory } from 'vue-router';
import LoginRegister from './components/LoginRegister.vue';
import MoodEntry from './components/MoodEntry.vue';
import MoodChart from './components/MoodChart.vue';

const routes = [
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
  history: createWebHistory(process.env.BASE_URL),
  routes
});

const fadeOut = (next) => {
  const content = document.querySelector('.page-content');
  if (content) {
    content.style.opacity = 0;
  }
  setTimeout(() => {
    next();
  }, 500);
}

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const token = localStorage.getItem('authToken');
    if (!token) {
      next({ name: 'LoginRegister' });
    } else {
      fadeOut(next);
    }
  } else {
    fadeOut(next);
  }
});

router.afterEach(() => {
  const content = document.querySelector('.page-content');
  if (content) {
    setTimeout(() => {
      content.style.opacity = 1;
    }, 100);
  }
});


export default router;
