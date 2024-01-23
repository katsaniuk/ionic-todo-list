import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import TodoListComponent from '../components/TodoListComponent.vue';
import CalendarComponent from '../components/CalendarComponent.vue';
import MapComponent from '../components/MapComponent.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/todo',
    name: 'TodoList',
    component: TodoListComponent
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: CalendarComponent
  },
  {
    path: '/map',
    name: 'Map',
    component: MapComponent
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
