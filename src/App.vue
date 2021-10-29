<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout'

export default {
  name: 'App',
  components: {
    DefaultLayout,
  },
  computed: {
    layout() {
      return this.$route.meta.layout
    },
  },
}
</script>

<style lang="scss">
@import './assets/styles/index';
</style>
