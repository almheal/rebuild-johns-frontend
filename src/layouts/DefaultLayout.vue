<template>
  <div class="layout">
    <TheHeader />
    <router-view class="layout__body" />
  </div>
</template>

<script>
import TheHeader from '@components/header/TheHeader'

export default {
  name: 'DefaultLayout',
  components: {
    TheHeader,
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
  }
}
</style>
