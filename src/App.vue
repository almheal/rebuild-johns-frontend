<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    DefaultLayout,
  },
  computed: {
    ...mapState({
      locales: (state) => state.locale.locales,
    }),
    layout() {
      return this.$route.meta.layout
    },
  },
  methods: {
    ...mapActions({
      fetchLocales: 'locale/fetchLocales',
      initialLocale: 'locale/initialLocale',
    }),
  },
  mounted() {
    this.fetchLocales({ query: { length: false } }).then(() => {
      this.initialLocale({ languages: this.locales })
    })
  },
}
</script>

<style lang="scss">
@import './assets/styles/index';
</style>
