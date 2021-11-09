<template>
  <div class="user-avatar" :class="{ large: size === 'large' }">
    <img
      class="user-avatar__img"
      :src="img ? img : require('../../assets/img/default-avatar.svg')"
      alt="user-avatar"
    />
  </div>
</template>

<script>
export default {
  name: 'AppUserAvatar',
  props: {
    img: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.user-avatar {
  position: relative;
  z-index: 1;
  width: 52px;
  height: 52px;
  padding: 2px;
  border-radius: 50%;
  cursor: pointer;

  &.large {
    width: 141px;
    height: 141px;
  }

  &::before {
    content: '';
    @include absolute-center;
    z-index: -1;
    width: 100%;
    height: 100%;
    background-image: url('../../assets/img/background-avatar.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  &__img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
</style>
