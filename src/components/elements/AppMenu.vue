<template>
  <nav class="menu">
    <ul
      class="menu__list"
      :class="{ 'direction-column': direction === 'column' }"
    >
      <AppMenuItem
        v-for="menuItem in menu"
        :key="menuItem.title"
        :link="menuItem.link"
        :title="$t(menuItem.title)"
        :direction="direction"
      />
    </ul>
  </nav>
</template>

<script>
import AppMenuItem from '@elements/AppMenuItem'

export default {
  name: 'AppMenu',
  components: {
    AppMenuItem,
  },
  props: {
    menu: {
      type: Array,
      default: () => [],
    },
    direction: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.menu {
  font-family: $gotham-font;

  &__list {
    @include flex;

    @media (max-width: 769px) {
      flex-direction: column;
    }

    &.direction-column {
      flex-direction: column;
    }
  }
}
</style>
