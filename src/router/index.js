import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';

import HomePage from '../views/HomePage.vue';
import NewsSection from '../views/NewsSection.vue';
import CareersPage from '../views/CareersPage.vue';
import LoginPage from '../views/Login.vue';
import DashboardPage from '../views/Dashboard.vue';
import ManageProfessors from '../views/ManageProfessors.vue';
import ManageSubjects from '../views/ManageSubjects.vue';
import ManageEvents from '../views/ManageEvents.vue';
import AcademicPlanningPage from '../views/AcademicPlanning.vue';
import ManageSections from '../views/ManageSections.vue';
import ManageTrimesters from '../views/ManageTrimesters.vue';
import ManageUsers from '../views/ManageUsers.vue'; 


const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/dashboard', name: 'Dashboard', component: DashboardPage, meta: { requiresAuth: true } },
  { path: '/professors', name: 'ManageProfessors', component: ManageProfessors, meta: { requiresAuth: true } },
  { path: '/subjects', name: 'ManageSubjects', component: ManageSubjects, meta: { requiresAuth: true } },
  { path: '/events', name: 'ManageEvents', component: ManageEvents, meta: { requiresAuth: true } },
  { path: '/planning', name: 'AcademicPlanning', component: AcademicPlanningPage, meta: { requiresAuth: true } },
  { path: '/sections', name: 'ManageSections', component: ManageSections, meta: { requiresAuth: true } },
  { path: '/trimesters', name: 'ManageTrimesters', component: ManageTrimesters, meta: { requiresAuth: true } },
  { path: '/news', name: 'NewsSection', component: NewsSection },
  { path: '/careers', name: 'careers', component: CareersPage },
  { path: '/users', name: 'ManageUsers', component: ManageUsers, meta: { requiresAuth: true } }, 

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.state.auth?.isLoggedIn;
  const role = store.state.auth?.role;
  
  if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
    next({ name: 'Login' });
  } else if (to.matched.some(record => record.meta.requiresAuth && role !== 'director' && role !== 'profesor')) {
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router;
