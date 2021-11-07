<template>
  <component :is="layout">
    <router-view />
  </component>
  <AppNotification :notifications="notifications" />
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout'
import AppNotification from '@elements/AppNotification'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    DefaultLayout,
    AppNotification,
  },
  data: () => ({
    isShow: false,
  }),

  computed: {
    ...mapState({
      locales: (state) => state.locale.locales,
      notifications: (state) => state.notification.notifications,
    }),
    ...mapGetters({
      userToken: 'user/getToken',
    }),
    layout() {
      return this.$route.meta.layout
    },
  },

  methods: {
    ...mapActions({
      fetchLocales: 'locale/fetchLocales',
      initialLocale: 'locale/initialLocale',
      auth: 'user/auth',
    }),
    ...mapMutations({
      setCategoriesLoader: 'category/SET_CATEGORIES_LOADER',
    }),
  },

  mounted() {
    if (this.userToken) {
      this.auth()
    }
    this.fetchLocales({ query: { length: false } }).then(() => {
      this.initialLocale({ languages: this.locales })
      this.isShow = true
    })
  },
}
</script>

<style lang="scss">
@import './assets/styles/index';
</style>
