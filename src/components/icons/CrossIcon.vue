<template>
  <button
    class="cross"
    type="button"
    :style="{ width: width + 'px', height: height + 'px' }"
    @click="$emit('clickCross')"
  />
</template>

<script>
export default {
  name: 'CrossIcon',
  emits: ['clickCross'],
  props: {
    width: {
      type: String,
      default: '18',
    },
    height: {
      type: String,
      default: '18',
    },
  },
}
</script>

<style lang="scss" scoped>
.cross {
  position: relative;

  &:hover {
    &::before,
    &::after {
      background-color: rgba($light-grey-color, 1);
    }
  }

  &::before,
  &::after {
    @include absolute-center;
    content: '';
    width: 100%;
    height: 2px;
    background-color: rgba($light-grey-color, 0.6);
    transition: background-color 0.3s;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
}
</style>
