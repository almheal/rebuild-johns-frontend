<template>
  <div class="constructor__header">
    <h1 class="constructor__title">{{ title }}</h1>
    <div class="constructor__subtitle">{{ subtitle }}</div>
  </div>
</template>

<script>
export default {
  name: 'ConstructorHeader',
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.constructor {
  &__header {
    margin-bottom: 20px;
  }

  &__title {
    font-family: $gotham-font;
    font-weight: 700;
    font-size: 24px;
    margin-bottom: 8px;
    color: $brown-color;
  }

  &__subtitle {
    font-size: 12px;
  }
}
</style>
