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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
