import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import FoodConfirm from '../views/FoodConfirm.vue';
import HealthGraph from '../views/HealthGraph.vue';
import HealthCarendar from '../views/HealthCarendar.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'FoodConfirm',
    component: FoodConfirm,
  },
  {
    path: '/graph',
    name: 'HealthGraph',
    component: HealthGraph,
  },
  {
    path: '/calendar',
    name: 'HealthCarendar',
    component: HealthCarendar,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
