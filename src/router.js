import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Navbar.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/profile',
      name: 'profile',
      // lazy-loaded
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      // lazy-loaded
      component: () => import('./views/BoardAdmin.vue')
    },
    {
      path: '/mod',
      name: 'moderator',
      // lazy-loaded
      component: () => import('./views/BoardModerator.vue')
    },
    {
      path: '/user',
      name: 'user',
      // lazy-loaded
      component: () => import('./views/BoardUser.vue')
    },
    {
      path: '/createUser',
      name: 'createUser',
      // lazy-loaded
      component: () => import('./views/CreateUser.vue')

    },
    {
      path: '/listUsers',
      name: 'listUsers',
      // lazy-loaded
      component: () => import('./views/ListUsers.vue')

    },
    {
      path: '/createRole',
      name: 'createRole',
      // lazy-loaded
      component: () => import('./views/CreateRole.vue')

    },
    {
      path: '/listRoles',
      name: 'listRoles',
      // lazy-loaded
      component: () => import('./views/ListRoles.vue')

    }
  ]
});


