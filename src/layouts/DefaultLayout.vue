<template>
  <div class="layout">
    <TheHeader />
    <router-view class="layout__body" />
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from '@components/header/TheHeader'
import TheFooter from '@components/footer/TheFooter'

export default {
  name: 'DefaultLayout',
  components: {
    TheHeader,
    TheFooter,
  },
}
</script>

<style lang="scss" scoped>
.layout {
  @include flex-justify-space;
  flex-direction: column;
  min-height: 100vh;

  &__body {
    flex: 1 1 0;
    background-color: $smoky-white;
  }
}
</style>
