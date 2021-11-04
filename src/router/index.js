import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { layout: 'DefaultLayout' },
    component: () => import(/* webpackChunkName: "homeView" */ '../views/Home'),
  },
  {
    path: '/constructor',
    name: 'Constructor',
    meta: { layout: 'DefaultLayout' },
    component: () =>
      import(/*webpackChunkName: "constructorView"*/ '../views/Constructor'),
  },
  {
    path: '/halves',
    name: 'Halves',
    meta: { layout: 'DefaultLayout' },
    component: () =>
      import(/*webpackChunkName: "halvesView"*/ '../views/Halves'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
