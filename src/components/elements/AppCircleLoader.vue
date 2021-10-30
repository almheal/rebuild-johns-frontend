<template>
  <div class="circle-loader">
    <div class="circle-loader__item" v-for="item in 4" :key="item" />
  </div>
</template>

<script>
export default {
  name: 'AppCircleLoader',
}
</script>

<style lang="scss" scoped>
.circle-loader {
  display: inline-block;
  position: relative;
  width: 32px;
  height: 32px;

  &__item {
    @include absolute-default;
    display: block;
    width: round(32px * 0.8);
    height: round(32px * 0.8);
    margin: round(32px * 0.1);
    border: round(32px * 0.1) solid #fff;
    border-radius: 50%;
    animation: rotate 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;

    &:nth-child(1) {
      animation-delay: -0.125 * 3 * 1.2s;
    }

    &:nth-child(2) {
      animation-delay: -0.125 * 2 * 1.2s;
    }

    &:nth-child(3) {
      animation-delay: -0.125 * 1 * 1.2s;
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
