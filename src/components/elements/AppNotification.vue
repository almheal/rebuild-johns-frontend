<template>
  <div class="notifications">
    <div
      class="notifications__item"
      v-for="(notification, index) in notifications"
      :key="index"
    >
      {{
        $t(
          `${notification.isError ? 'errors.' : 'success.'}` +
            notification.title
        )
      }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppNotification',
  props: {
    notifications: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.notifications {
  position: fixed;
  left: 15px;
  bottom: 15px;
  z-index: 1050;

  &__item {
    max-width: 320px;
    padding: 15px;
    border-radius: 10px;
    background-color: $light-orange-color;
    margin-bottom: 10px;
    font-size: 16px;
    color: $brown-color;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
