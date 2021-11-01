import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from '@/plugins/i18n'
import lazyPlugin from 'vue3-lazy'

createApp(App)
  .use(store)
  .use(router)
  .use(i18n)
  .use(lazyPlugin, {})
  .mount('#app')
