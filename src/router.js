import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';

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
      path: '/listUsers',
      name: 'listUsers',
      // lazy-loaded
      component: () => import('./views/Users.vue')

    },
    {
      path: '/listRoles',

      name: 'listRoles',
      // lazy-loaded
      component: () => import('./views/Roles.vue')

    },
    {
      path: '/listItems',
      name: 'listItems',
      component: () => import('./views/Item.vue')

    },
    {
      path: '/listProjects',
      name: 'listProjects',
      component: () => import('./views/Project.vue')

    },
    {
      path: '/listItemsLb',
      name: 'listItemsLb',
      component: () => import('./views/Baseline.vue')

    },
    {
      path: '/listBaselines',
      name: 'listBaselines',
      component: () => import('./views/ListBaselines.vue')

    }
  ]
});


