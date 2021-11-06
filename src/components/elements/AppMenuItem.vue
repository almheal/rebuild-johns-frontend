<template>
  <li class="menu-item">
    <router-link
      class="menu-item__link"
      :class="{ 'direction-column': direction === 'column' }"
      :to="link"
    >
      {{ title }}
    </router-link>
  </li>
</template>

<script>
export default {
  name: 'AppMenuItem',
  props: {
    link: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    direction: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.menu-item {
  &__link {
    display: block;
    padding: 14px;
    color: $brown-color;
    user-select: none;

    &:not(.router-link-active, .router-link-exact-active) {
      @include green-color-hover;
    }

    &.router-link-active.router-link-exact-active {
      color: $light-grey-color;
      cursor: default;
    }

    &.direction-column {
      padding: 10px 0;
    }

    @media (max-width: 769px) {
      padding: 10px 20px;
    }
  }
}
</style>
