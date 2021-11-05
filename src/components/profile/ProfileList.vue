<template>
  <div class="profile-list">
    <ProfileItem
      class="profile-list__item"
      v-for="(item, index) in items"
      :key="index"
    >
      {{ item.title }}
      <CrossIcon
        class="profile-list__cross"
        @clickCross="$emit('clickCross', item)"
      />
    </ProfileItem>
  </div>
</template>

<script>
import ProfileItem from '@components/profile/ProfileItem'
import CrossIcon from '@icons/CrossIcon'

export default {
  name: 'ProfileList',
  components: {
    ProfileItem,
    CrossIcon,
  },
  emits: ['clickCross'],
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.profile-list {
  &__item {
    padding-right: 35px;
  }
  &__cross {
    @include absolute-top-center-right(10px);

    &:hover {
      &::before,
      &::after {
        background-color: $dark-red-color;
      }
    }
  }
}
</style>
