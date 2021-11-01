<template>
  <div class="ingredients-button" @click="$emit('clickButton')">
    <button class="ingredients-button__item">
      <span class="ingredients-button__line"></span>
      <span class="ingredients-button__line"></span>
      <span class="ingredients-button__line"></span>
      <span class="ingredients-button__counter" v-if="count">{{ count }}</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ProductIngredientsButton',
  emits: ['clickButton'],
  props: {
    count: {
      type: [String, Number],
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.ingredients-button {
  @include flex-center;
  width: 65px;
  height: 65px;
  cursor: pointer;

  &__item {
    position: relative;
    @include flex-center;
    flex-direction: column;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1px solid rgba(80, 166, 132, 0.2);
    background-color: $white-color;
  }

  &__line {
    display: inline-block;
    width: 16px;
    height: 2px;
    border-radius: 20px;
    background-color: $green-color;
    margin-bottom: 3px;

    &:nth-child(2) {
      width: 12px;
    }

    &:nth-child(3) {
      width: 8px;
      margin-bottom: 0;
    }
  }

  &__counter {
    @include absolute-top-right(-2px, -4px);
    @include flex-center;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: $dark-red-color;
    color: $white-color;
    font-size: 10px;
  }
}
</style>
