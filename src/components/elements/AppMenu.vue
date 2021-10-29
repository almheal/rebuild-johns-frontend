<template>
  <nav class="menu">
    <ul class="menu__list">
      <li class="menu__item" v-for="menuItem in menu" :key="menuItem.title">
        <router-link class="menu__link" :to="menuItem.link" data-test="link">
          {{ $t(menuItem.title) }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'AppMenu',
  props: {
    menu: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.menu {
  font-family: $gotham-font;

  &__list {
    @include flex;
  }

  &__link {
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
  }
}
</style>
