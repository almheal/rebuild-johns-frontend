<template>
  <section class="order-section">
    <h3 class="order-section__title" v-if="title">{{ title }}</h3>
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'OrderSection',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.order-section {
  padding: 40px;
  border-radius: 10px;
  background-color: $white-color;

  @media (max-width: 424px) {
    padding: 30px;
  }

  &__title {
    font-family: $gotham-font;
    font-weight: 700;
    font-size: 18px;
    color: $brown-color;
    margin-bottom: 30px;
  }
}
</style>
