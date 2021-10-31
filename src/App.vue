<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    DefaultLayout,
  },
  data: () => ({
    isShow: false,
  }),
  computed: {
    ...mapState({
      locales: (state) => state.locale.locales,
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
      fetchCategories: 'category/fetchCategories',
      initialLocale: 'locale/initialLocale',
      auth: 'user/auth',
    }),
    ...mapMutations({
      setCategoriesLoader: 'category/SET_CATEGORIES_LOADER',
    }),
    async requestCategories() {
      this.setCategoriesLoader(true)
      await this.fetchCategories()
      this.setCategoriesLoader(false)
    },
  },
  mounted() {
    this.isShow = true
    this.requestCategories()
    if (this.userToken) {
      this.auth()
    }
    this.fetchLocales({ query: { length: false } }).then(() => {
      this.initialLocale({ languages: this.locales })
    })
  },
}
</script>

<style lang="scss">
@import './assets/styles/index';
</style>
