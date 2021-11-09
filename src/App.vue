<template>
  <component :is="layout" v-if="isShow">
    <router-view />
  </component>
  <AppCircleLoader class="app-loader" v-else color="green" size="medium" />
  <AppNotification :notifications="notifications" />
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout'
import AppNotification from '@elements/AppNotification'
import AppCircleLoader from '@elements/AppCircleLoader'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    DefaultLayout,
    AppNotification,
    AppCircleLoader,
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
      setAuthLoader: 'user/SET_AUTH_LOADER',
      setBodyWidth: 'SET_BODY_WIDTH',
    }),

    async authUser() {
      if (this.userToken) {
        this.setAuthLoader(true)
        await this.auth()
        this.setAuthLoader(false)
      }
    },

    changeBodyWidthListener() {
      this.setBodyWidth(document.body.clientWidth)

      window.addEventListener('resize', () => {
        this.setBodyWidth(document.body.clientWidth)
      })
    },
  },

  mounted() {
    this.authUser()
    this.fetchLocales({ query: { length: false } }).then(() => {
      this.initialLocale({ languages: this.locales })
      this.isShow = true
    })
    this.changeBodyWidthListener()
  },
}
</script>

<style lang="scss">
@import './assets/styles/index';
</style>

<style lang="scss" scoped>
.app-loader {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
