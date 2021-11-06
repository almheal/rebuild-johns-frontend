<template>
  <ProfileSection
    class="history-orders"
    :title="$t('app.profile.historyOrders.title')"
    :subtitle="$t('app.profile.historyOrders.subtitle')"
  >
    <div class="history-orders__empty" v-if="!orders.length">
      {{ $t('app.profile.historyOrders.historyIsEmpty') }}
    </div>
  </ProfileSection>
</template>

<script>
import ProfileSection from '@components/profile/ProfileSection'

export default {
  name: 'ProfileHistoryOrders',
  components: {
    ProfileSection,
  },
  props: {
    orders: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.history-orders {
  &__empty {
    font-family: $gotham-font;
    color: $brown-color;
    text-align: center;
  }
}
</style>
