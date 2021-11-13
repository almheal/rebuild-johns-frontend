import { createRouter, createWebHistory } from 'vue-router'
import { TOKEN_NAME } from '@const'
import { getLocalStorage } from '@utils'
import store from '@/store'

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
  {
    path: '/profile',
    name: 'Profile',
    meta: { layout: 'DefaultLayout', auth: true },
    component: () =>
      import(/*webpackChunkName: "profileView"*/ '../views/Profile'),
  },
  {
    path: '/order',
    name: 'Order',
    meta: { layout: 'DefaultLayout' },
    component: () => import(/*webpackChunkName: "orderView"*/ '../views/Order'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  const token = getLocalStorage(TOKEN_NAME)
  if (to.meta.auth && !token) {
    next({ path: from.name ? from.path : '/' })
  } else {
    next()
  }
})

router.afterEach((guard) => {
  if (guard.query.testUser && !getLocalStorage(TOKEN_NAME)) {
    store.dispatch('user/loginByTestUser')

    const query = JSON.parse(JSON.stringify(guard.query))
    delete query.testUser
    router.replace({ query })
  }
})

export default router
